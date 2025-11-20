import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { placeOrder } from "../services/api";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    token,
    navigate,
    getCartTotalAmount,
    currency,
    delivery_fee,
    cartItems,
    clearCart,
  } = useContext(ShopContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onPlaceOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    Object.keys(cartItems).forEach((productId) => {
      Object.keys(cartItems[productId]).forEach((size) => {
        orderItems.push({
          productId,
          quantity: cartItems[productId][size],
        });
      });
    });

    const orderData = {
      items: orderItems,
      address: data,
    };

    try {
      const response = await placeOrder(orderData);

      if (response.data.success) {
        toast.success("Order Placed Successfully!");
        clearCart();
        navigate("/orders");
      } else {
        toast.error("Error placing order");
      }
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (getCartTotalAmount() === 0) {
      navigate("/collection");
    }
  }, [token, navigate, getCartTotalAmount]);

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <form
      onSubmit={onPlaceOrder}
      className="flex flex-col md:flex-row items-start justify-between gap-12 pt-5 sm:p-14 min-h-[80vh] border-t"
    >
      <div className="w-full md:w-[60%]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
            className="w-full p-2 border rounded"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
            className="w-full p-2 border rounded"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          className="w-full p-2 mt-4 border rounded"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="w-full p-2 mt-4 border rounded"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
            className="w-full p-2 border rounded"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            className="w-full p-2 border rounded"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          className="w-full p-2 mt-4 border rounded"
        />
      </div>
      <div className="w-full md:w-[35%]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Cart"} text2={"Total"} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency}
              {getCartTotalAmount()}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>
              {currency}
              {getCartTotalAmount() === 0 ? 0 : delivery_fee}
            </p>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>
              {currency}
              {getCartTotalAmount() === 0
                ? 0
                : getCartTotalAmount() + delivery_fee}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 mt-8 rounded"
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
