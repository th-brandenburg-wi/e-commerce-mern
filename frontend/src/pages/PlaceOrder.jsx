import React, { useContext, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
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
    <div className="flex flex-col items-center justify-center gap-4 pt-5 sm:p-14 min-h-[80vh] border-t">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"Place"} text2={"Order"} />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Coming Soon!</h3>
        <p className="text-gray-600">
          The ability to place orders is currently under development.
        </p>
        <p className="text-gray-600">
          Please check back later!
        </p>
      </div>
    </div>
  );
};

export default PlaceOrder;
