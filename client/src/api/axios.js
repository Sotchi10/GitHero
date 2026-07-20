import axios from "axios";

const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, ""),
  timeout: 1500000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
