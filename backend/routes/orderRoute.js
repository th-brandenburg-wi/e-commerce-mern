import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/addOrder", authMiddleware, placeOrder);
orderRouter.get("/user-orders", authMiddleware, userOrders);
orderRouter.get("/user/:id", authMiddleware, getOrderById);
orderRouter.delete("/:id", deleteOrder);
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/update-status", updateStatus);

export default orderRouter;
