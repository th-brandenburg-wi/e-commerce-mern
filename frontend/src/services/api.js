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

// Reviews
export const getProductReviews = (productId) =>
  API.get(`/api/review/${productId}`);
export const createReview = (reviewData) => API.post("/api/review", reviewData);
export const deleteReview = (reviewId) => API.delete(`/api/review/${reviewId}`);

// Orders
export const placeOrder = (orderData) =>
  API.post("/api/order/addOrder", orderData);
export const getUserOrders = () => API.get("/api/order/user-orders");
export const getOrderById = (orderId) => API.get(`/api/order/${orderId}`);
