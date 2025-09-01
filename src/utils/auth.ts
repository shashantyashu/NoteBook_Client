export const TOKEN_KEY = "notes_app_token";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}
