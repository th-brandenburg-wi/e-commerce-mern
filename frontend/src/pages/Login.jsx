import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import * as api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken, navigate } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (currentState === "login") {
        response = await api.loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await api.registerUser(formData);
      }

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(
          `Successfully ${
            currentState === "login" ? "logged in" : "registered"
          }!`
        );
        navigate("/");
      } else {
        toast.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center border-t">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <img src={assets.logo} alt="Logo" className="w-20 mb-6" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {currentState === "login" ? "Login" : "Sign Up"}
        </h2>
        <p className="mb-6 text-gray-500 text-center">
          {currentState === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </p>
        <form onSubmit={onSubmitHandler} className="w-full flex flex-col gap-4">
          {currentState === "signup" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={formData.name}
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={formData.password}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition-colors mt-2"
          >
            {currentState === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 w-full flex flex-col items-center">
          {currentState === "login" ? (
            <p className="text-sm text-gray-600">
              New Account?{" "}
              <button
                type="button"
                className="text-orange-500 hover:underline"
                onClick={() => setCurrentState("signup")}
              >
                Sign Up Here
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an Account?{" "}
              <button
                type="button"
                className="text-orange-500 hover:underline"
                onClick={() => setCurrentState("login")}
              >
                Login Here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
