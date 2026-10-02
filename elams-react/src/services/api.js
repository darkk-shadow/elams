import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";

// Authenticated axios instance — reads token fresh from localStorage on every request
const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // localStorage stores it as JSON string "\"abc...\"", strip quotes
    const raw = token.replace(/^"|"$/g, "");
    if (raw && raw !== "null") {
      config.headers["Authorization"] = `Bearer ${raw}`;
    }
  }
  return config;
});

export { API_BASE_URL };
export default apiClient;
