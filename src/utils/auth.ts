
// src/utils/auth.ts
export const getToken = (): string | null => {
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
};

export const setToken = (token: string, persist: boolean = true) => {
  if (persist) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
};
