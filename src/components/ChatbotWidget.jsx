import React, { useState } from "react";
import ChatbotModal from "./ChatbotModal";

function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
        onClick={() => setOpen(true)}
        aria-label="Mở chatbot hỗ trợ"
      >
        <span className="material-symbols-outlined text-white text-3xl">smart_toy</span>
      </button>
      {open && <ChatbotModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default ChatbotWidget;
