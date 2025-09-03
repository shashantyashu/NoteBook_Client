import axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "./utils/auth";

const API_BASE = import.meta.env.VITE_API_BASE || "https://notebook-server-r23s.onrender.com";

const api = axios.create({ baseURL: `${API_BASE}/api` });

api.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers["Authorization"] = `Bearer ${token}`;
  }
  return cfg;
});

export default api;

