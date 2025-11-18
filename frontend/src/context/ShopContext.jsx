import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const currency = "€";
  const delivery_fee = 5;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // NOTE: The cart is currently managed on the frontend only.
  // There are no backend APIs for cart management yet.
  const addToCart = (itemId, size) => {
    if (!itemId || !size) {
      if (!size) toast.error("Select a size");
      return;
    }
    setCartItems((prev) => {
      const cartData = { ...prev };
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
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
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId][size] = qty;
      setCartItems(cartData);
    }
  };

  const getCartTotalAmount = () => {
    let total = 0;
    if (!cartItems || typeof cartItems !== "object" || !products.length)
      return 0;

    const productMap = products.reduce((map, product) => {
      map[product._id] = product;
      return map;
    }, {});

    for (const [productId, sizes] of Object.entries(cartItems)) {
      const product = productMap[productId];
      if (!product) continue;
      for (const qty of Object.values(sizes)) {
        const quantity = Number(qty) || 0;
        if (quantity > 0) total += product.price * quantity;
      }
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const value = {
    products,
    token,
    setToken,
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
    getCartTotalAmount,
    navigate,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
