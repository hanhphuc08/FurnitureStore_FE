import React, { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/authApi";

function formatVnd(v) {
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(v ?? 0);
  } catch {
    return String(v ?? "");
  }
}

const DEFAULT_MESSAGES = [
  { from: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?", products: [] },
];

function loadMessages(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {
    // ignore
  }
  return DEFAULT_MESSAGES;
}

function BotMessage({ msg }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl px-4 py-2 max-w-[80%] text-sm shadow-sm bg-white text-gray-800 border whitespace-pre-line">
      <div>{msg.text}</div>

      {Array.isArray(msg.products) && msg.products.length > 0 && (
        <div className="mt-3 space-y-2">
          {msg.products.map((p) => (
            <div key={p.slug} className="rounded-lg border bg-[#f8f9fa] p-3">
              <div className="font-semibold">{p.name}</div>

              {p.price != null && (
                <div className="text-xs text-gray-600">{formatVnd(p.price)}</div>
              )}

              <button
                type="button"
                onClick={() => navigate(`/products/${p.slug}`)}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary/90"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatbotModal({ onClose, authVersion }) {
  // 1. Phân biệt rõ 3 trạng thái me
  // undefined = đang loading, null = guest, {userId} = logged in
  const [me, setMe] = useState(undefined);

  useEffect(() => {
    getMe()
      .then((data) => {
        if (data?.authenticated && data.userId) {
          setMe({ userId: data.userId });
        } else {
          setMe(null);
        }
      })
      .catch(() => setMe(null));
  }, [authVersion]);

  // 2. storageKey chuẩn
  const storageKey = useMemo(() => {
    if (me?.userId) return `chatbot_u_${me.userId}`;
    if (me === null) return "chatbot_guest";
    return ""; // loading
  }, [me]);

  // 3. KHÔNG load guest cứng lúc init nữa
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  // 4. Chỉ load messages KHI đã biết user
  useEffect(() => {
    if (me === undefined || !storageKey) return; // đang loading
    setMessages(loadMessages(storageKey));
  }, [storageKey, me]);

  // 5. Lưu chat đúng key
  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, storageKey]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((msgs) => [...msgs, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8686/api/chatbot/ask", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Chatbot lỗi");

      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: data.reply || "OK", products: data.products || [] },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: err?.message || "Chatbot lỗi", products: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative m-6 w-full max-w-sm rounded-2xl bg-white shadow-2xl flex flex-col h-[500px]">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">smart_toy</span>
            <span className="font-bold">Chatbot hỗ trợ</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-primary" type="button">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 bg-[#f8f9fa]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "bot" ? (
                <BotMessage msg={msg} />
              ) : (
                <div className="rounded-xl px-4 py-2 max-w-[80%] text-sm shadow-sm bg-primary text-white whitespace-pre-line">
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-2">
              <div className="rounded-xl px-4 py-2 bg-white border text-gray-400 text-sm shadow-sm">
                Đang trả lời...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t bg-white">
          <input
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:border-primary focus:ring-primary/40"
            placeholder="Nhập câu hỏi..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-60"
            disabled={loading || !input.trim()}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatbotModal;
