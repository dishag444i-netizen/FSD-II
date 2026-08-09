import axios from "axios";
import { isTokenExpired, refreshToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Request Interceptor
api.interceptors.request.use((config) => {

  let token = localStorage.getItem("token");

  if (token) {

    if (isTokenExpired(token)) {

      console.log("Token Expired");

      const user = JSON.parse(localStorage.getItem("user"));

      const newToken = refreshToken(user);

      localStorage.setItem("token", newToken);

      token = newToken;

      console.log("New Token Generated");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;