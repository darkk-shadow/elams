import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export const login = async(user) => {
    await axios.post("http://localhost:9090/auth/login", user)
}