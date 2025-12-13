const BASE_URL = "http://localhost:8686";

export async function loginRequest(emailOrUsername, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrUsername, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Đăng nhập thất bại");
  }
  return data;
}

export async function registerRequest(fullName, email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    credentials: "include", // ✅ thêm cho đồng bộ
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Đăng ký thất bại, thử lại sau");
  }

  return data;
}

export async function getHomeData() {
  const res = await fetch(`${BASE_URL}/api/home`, {
    credentials: "include",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Failed to load home data");
  }
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    // server đang trả 200 {authenticated:false} là chính, nhưng cứ phòng hờ
    return { authenticated: false };
  }
  return res.json();
}

export async function logoutRequest() {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Logout thất bại");
  }
  return res.json();
}
