import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";

const Add = ({ token }) => {
  const getInitialState = () => ({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subcategory: "Topwear",
    bestseller: false,
    sizes: [],
    images: [],
  });

  const [product, setProduct] = useState(getInitialState());

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", Number(product.price));
    formData.append("category", product.category);
    formData.append("subcategory", product.subcategory);
    formData.append("bestseller", product.bestseller);
    formData.append("sizes", JSON.stringify(product.sizes));

    for (let i = 1; i <= 4; i++) {
      if (product[`image${i}`]) {
        formData.append(`image${i}`, product[`image${i}`]);
      }
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        setProduct(getInitialState()); // Reset form
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while adding the product"
      );
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <ProductForm
        onSubmit={handleAdd}
        product={product}
        setProduct={setProduct}
        isEdit={false}
      />
    </div>
  );
};

export default Add;

