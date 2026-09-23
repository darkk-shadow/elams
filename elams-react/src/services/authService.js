import axios from "axios";

export const login = async(user) => {
    return await axios.post("http://localhost:9090/auth/login", user);
}