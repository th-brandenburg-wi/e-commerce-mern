import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { token, navigate } = useContext(ShopContext);

  useEffect(() => {
    if (!token) {
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
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Coming Soon!</h3>
        <p className="text-gray-600">
          The ability to view your order history is currently under
          development.
        </p>
        <p className="text-gray-600">Please check back later!</p>
      </div>
    </div>
  );
};

export default Orders;
