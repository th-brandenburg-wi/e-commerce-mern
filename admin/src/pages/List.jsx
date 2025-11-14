import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

// Reuse Add form for editing
const ProductForm = ({ onSubmit, product, setProduct, isEdit, onCancel }) => {
  // product: { name, description, price, category, subcategory, bestseller, sizes, ... }
  // setProduct: function to update product state

  // Handlers for image upload
  const handleImageChange = (idx, file) => {
    setProduct((prev) => ({
      ...prev,
      [`image${idx + 1}`]: file,
    }));
  };

  // Handler for sizes
  const handleSizeToggle = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full items-start gap-3 bg-white p-4 rounded shadow mb-8"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`}>
              <img
                className="w-20"
                src={
                  !product[`image${idx + 1}`]
                    ? assets.upload_area
                    : typeof product[`image${idx + 1}`] === "string"
                    ? product[`image${idx + 1}`]
                    : URL.createObjectURL(product[`image${idx + 1}`])
                }
                alt=""
              />
              <input
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
                type="file"
                id={`image${idx + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          value={product.name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, description: e.target.value }))
          }
          value={product.description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write Description"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, category: e.target.value }))
            }
            value={product.category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Sub-Category</p>
          <select
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, subcategory: e.target.value }))
            }
            value={product.subcategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, price: e.target.value }))
            }
            value={product.price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => handleSizeToggle(size)}>
              <p
                className={`${
                  product.sizes.includes(size)
                    ? "border-2 border-green-600 bg-slate-200"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() =>
            setProduct((prev) => ({
              ...prev,
              bestseller: !prev.bestseller,
            }))
          }
          checked={product.bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          ADD TO BESTSELLER
        </label>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
          {isEdit ? "UPDATE PRODUCT" : "ADD PRODUCT"}
        </button>
        {isEdit && (
          <button
            type="button"
            className="w-28 py-3 mt-4 bg-gray-300 text-black"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/product/list", {
          headers: { token },
        });
        setProducts(res.data.products || []);
      } catch (err) {
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [token]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: { token },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Delete failed");
      console.log("error message" + err.message);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditProduct({
      ...product,
      image1: product.image?.[0] || "",
      image2: product.image?.[1] || "",
      image3: product.image?.[2] || "",
      image4: product.image?.[3] || "",
      sizes: product.sizes || [],
    });
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("category", editProduct.category);
      formData.append("subcategory", editProduct.subcategory);
      formData.append("bestseller", editProduct.bestseller);
      formData.append("sizes", JSON.stringify(editProduct.sizes));
      [1, 2, 3, 4].forEach((idx) => {
        if (
          editProduct[`image${idx}`] &&
          typeof editProduct[`image${idx}`] !== "string"
        ) {
          formData.append(`image${idx}`, editProduct[`image${idx}`]);
        }
      });

      await axios.put(
        `${backendUrl}/api/product/update/${editProduct._id}`,
        editProduct,
        { headers: { token } }
      );
      toast.success("Product updated");
      setEditProduct(null);
      // Refresh product list
      const res = await axios.get(backendUrl + "/api/product/list", {
        headers: { token },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.log("error-->" + err.message);
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      {editProduct && (
        <ProductForm
          onSubmit={handleUpdate}
          product={editProduct}
          setProduct={setEditProduct}
          isEdit={true}
          onCancel={() => setEditProduct(null)}
        />
      )}
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Bestseller</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td className="p-2">
                  <img
                    src={prod.image?.[0] || assets.upload_area}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{prod.name}</td>
                <td className="p-2">
                  {prod.category} / {prod.subcategory}
                </td>
                <td className="p-2">{prod.price}</td>
                <td className="p-2">{prod.bestseller ? "Yes" : "No"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No products found.
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
