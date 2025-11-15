import axios from "axios";
import { backendUrl } from "../utils";

const API = axios.create({ baseURL: backendUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

// Auth
export const loginUser = (formData) => API.post("/api/user/login", formData);
export const registerUser = (formData) =>
  API.post("/api/user/register", formData);
// Products
export const getProducts = () => API.get("/api/product/list");
export const getProductById = (id) => API.post("/api/product/single", { id });

