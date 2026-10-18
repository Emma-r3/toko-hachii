import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProducts = () => api.get("/products").then((res) => res.data);
export const getProduct = (id) => api.get(`/products/${id}`).then((res) => res.data);
export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);
export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).then((res) => res.data);