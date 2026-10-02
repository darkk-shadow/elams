import axios from "axios";
import { API_BASE_URL } from "./api";

// Uses plain axios (no auth token) — login endpoint is public
export const login = async (user) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, user);
};