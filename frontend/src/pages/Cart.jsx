import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Cart = () => {
  const { products, currency, cartItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Efficiently flatten cartItems into an array only when cartItems changes
    const tempData = [];
    if (cartItems && typeof cartItems === "object") {
      Object.entries(cartItems).forEach(([productId, sizes]) => {
        if (sizes && typeof sizes === "object") {
          Object.entries(sizes).forEach(([size, quantity]) => {
            if (quantity > 0) {
              tempData.push({
                _id: productId,
                size,
                quantity,
              });
            }
          });
        }
      });
    }
    //    console.log("carItems --> ", tempData);
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span>
                      {currency}
                      {productData.price}
                    </span>
                    <span className="w-10 h-7 inline-flex items-center justify-center px-2 sm:py-1 border bg-slate-50 rounded text-center">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="number"
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
