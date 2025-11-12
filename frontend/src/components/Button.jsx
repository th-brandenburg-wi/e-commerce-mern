import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Button = ({ text1, clickMethod }) => {
  return (
    // w-full text-end
    <div className="w-full text-end">
      <button
        className="bg-black text-white text-sm my-8 px-8 py-3 active:bg-gray-700"
        onClick={clickMethod}
      >
        {text1}
      </button>
    </div>
  );
};

export default Button;
