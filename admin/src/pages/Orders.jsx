import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../utils";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/update-status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Status Updated");
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await axios.delete(
        `${backendUrl}/api/order/${orderId}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success("Order deleted successfully");
        await fetchAllOrders();
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-[auto_1fr_auto] items-start gap-4 p-4 border border-gray-300 rounded-md"
          >
            <img
              src={assets.parcel_icon}
              alt="Parcel Icon"
              className="w-10 h-10"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index === order.items.length - 1 ? "" : ", "}
                  </span>
                ))}
              </p>
              <p className="font-bold mt-1 text-lg">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="flex flex-col">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.zipcode}
                </p>
                <p>{order.address.country}</p>
              </div>
              <p className="mt-1">{order.address.phone}</p>
              <p className="text-sm text-gray-500">
                Items: {order.items.length}
              </p>
              <p className="text-sm font-semibold text-red-600">
                ${order.amount}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="bg-gray-200 border border-gray-300 text-gray-700 py-1 px-2 rounded"
              >
                <option value="Order Processing">Order Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                onClick={() => handleDelete(order._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
