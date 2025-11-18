import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { backendUrl } from "../utils";
import { assets } from "../assets/assets";

const Orders = () => {
  const { token, navigate } = useContext(ShopContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/user-orders`, {
        headers: { token },
      });
      console.log("data --> " + JSON.stringify(response.data));
      if (response.data.success) setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <div className="border-t pt-16 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="w-full max-w-4xl flex flex-col gap-5">
        {data?.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            You have not done any order yet.
          </div>
        ) : (
          data?.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-[auto_1fr_auto] items-start gap-4 p-4 border border-gray-300 rounded-md"
            >
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-10 h-10"
              />
              <div className="w-full">
                <p className="font-semibold text-gray-800">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index === order.items.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm font-semibold text-red-600">
                  ${order.amount}
                </p>
                <p className="text-sm text-gray-500">
                  Items: {order.items.length}
                </p>
                <p className="text-sm mt-2">
                  <span className="text-red-500">&#x25cf;</span>{" "}
                  <b
                    className={
                      order.status === "Delivered"
                        ? "text-green-500"
                        : order.status === "Out for delivery"
                        ? "text-yellow-500"
                        : "text-gray-700"
                    }
                  >
                    {order.status}
                  </b>
                </p>
              </div>
              <button
                onClick={() => navigate(`/track/${order._id}`)} // Assuming a track order page
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Track Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
