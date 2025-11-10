import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "€";
  const delivery_fee = 5;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemId, size) => {
    if (!itemId || !size) {
      if (!size) toast.error("Select a size");
      return;
    }
    setCartItems((prev) => {
      const cartData = structuredClone(prev || {});
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      console.log("CartData --> ", cartData);
      return cartData;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    if (!cartItems || typeof cartItems !== "object") return 0;
    for (const productId in cartItems) {
      const sizes = cartItems[productId];
      if (!sizes || typeof sizes !== "object") continue;
      for (const size in sizes) {
        const qty = Number(sizes[size]) || 0;
        if (qty > 0) totalCount += qty;
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, qty) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = qty;

    setCartItems(cartData);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
