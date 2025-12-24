import { logoutRequest } from "../api/authApi";

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    await logoutRequest();  
  } catch {
    // optional ignore
  } finally {
    localStorage.removeItem("user"); 
  }
}
