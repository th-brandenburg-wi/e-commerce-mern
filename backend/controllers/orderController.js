import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// Place User Order
const placeOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.body.userId;
    console.log("userId -> " + userId);

    let total_amount = 0;
    const order_items = [];

    for (const item of items) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res.json({
          success: false,
          message: `Product with id ${item.productId} not found.`,
        });
      }
      total_amount += product.price * item.quantity;
      order_items.push({
        ...product.toObject(),
        quantity: item.quantity,
      });
    }

    const newOrder = new orderModel({
      userId,
      items: order_items,
      amount: total_amount,
      address,
    });

    const savedOrder = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Also add order to user's orders
    await userModel.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id },
    });

    res.json({ success: true, message: "Order Placed", order: savedOrder });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "(placeOrder) Error placing order" + error.message,
    });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      // Check if the order belongs to the user or if the user is an admin
      // For now, I will just return the order
      res.json({ success: true, data: order });
    } else {
      res.json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "(getOrderById) Error fetching order, " + error.message,
    });
  }
};

// User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "(userOrders) Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "(List) Error, " + error.message });
  }
};

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "(updateStatus) Error" + error.message,
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    // Optional: Remove order from user's orders array
    await userModel.findByIdAndUpdate(order.userId, {
      $pull: { orders: order._id },
    });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "(deleteOrder) Error deleting order" + error.message,
    });
  }
};

export {
  placeOrder,
  getOrderById,
  userOrders,
  listOrders,
  updateStatus,
  deleteOrder,
};
