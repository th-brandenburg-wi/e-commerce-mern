import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";
import { assets } from "../assets/assets";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`, {
          headers: { token },
        });
        if (res.data.success) {
          setProducts(res.data.products || []);
        } else {
          toast.error("Failed to fetch products");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "An error occurred while fetching products"
        );
      }
    };
    fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await axios.delete(
        `${backendUrl}/api/product/remove/${id}`,
        {
          headers: { token },
        }
      );
      if (res.data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during deletion"
      );
    }
  };

  const handleEdit = (product) => {
    const productToEdit = {
      ...product,
      sizes: product.sizes || [],
      bestseller: product.bestseller || false,
    };

    // Populate image previews
    if (product.images) {
      product.images.forEach((img, idx) => {
        productToEdit[`image${idx + 1}_preview`] = img.url;
      });
    }

    setEditProduct(productToEdit);
    window.scrollTo(0, 0);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", Number(editProduct.price));
    formData.append("category", editProduct.category);
    formData.append("subcategory", editProduct.subcategory);
    formData.append("bestseller", editProduct.bestseller);
    formData.append("sizes", JSON.stringify(editProduct.sizes));

    // Append new images if they have been added
    for (let i = 1; i <= 4; i++) {
      if (editProduct[`image${i}`] && typeof editProduct[`image${i}`] !== 'string') {
        formData.append(`image${i}`, editProduct[`image${i}`]);
      }
    }

    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update/${editProduct._id}`,
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success("Product updated successfully!");
        setProducts((prev) =>
          prev.map((p) => (p._id === editProduct._id ? res.data.product : p))
        );
        setEditProduct(null);
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during update"
      );
    }
  };

  return (
    <div className="p-4 w-full">
      {editProduct && (
        <ProductForm
          onSubmit={handleUpdate}
          product={editProduct}
          setProduct={setEditProduct}
          isEdit={true}
          onCancel={() => setEditProduct(null)}
        />
      )}
      <h2 className="text-2xl font-bold mb-4">All Products List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Bestseller</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={(prod.images && prod.images[0]?.url) || assets.upload_area}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{prod.name}</td>
                <td className="p-3">
                  {prod.category} / {prod.subcategory}
                </td>
                <td className="p-3">${prod.price}</td>
                <td className="p-3">{prod.bestseller ? "Yes" : "No"}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;

