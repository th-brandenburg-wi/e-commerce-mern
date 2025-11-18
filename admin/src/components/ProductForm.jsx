import React from "react";
import { assets } from "../assets/assets";

const CATEGORIES = ["Men", "Women", "Kids"];
const SUB_CATEGORIES = ["Topwear", "Bottomwear", "Winterwear"];
const SIZES = ["S", "M", "L", "XL", "XXL"];

const ProductForm = ({
  onSubmit,
  product,
  setProduct,
  isEdit = false,
  onCancel,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (idx, file) => {
    if (file) {
      setProduct((prev) => ({
        ...prev,
        [`image${idx + 1}`]: file,
        [`image${idx + 1}_preview`]: URL.createObjectURL(file),
      }));
    }
  };

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
        <p className="mb-2">Upload Images (up to 4)</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`}>
              <img
                className="w-20 h-20 object-cover rounded"
                src={
                  product[`image${idx + 1}_preview`] ||
                  (product.images && product.images[idx]?.url) ||
                  assets.upload_area
                }
                alt={`upload-${idx}`}
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
          name="name"
          onChange={handleChange}
          value={product.name}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          name="description"
          onChange={handleChange}
          value={product.description}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write Description"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            name="category"
            onChange={handleChange}
            value={product.category}
            className="w-full px-3 py-2 border rounded"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Product Sub-Category</p>
          <select
            name="subcategory"
            onChange={handleChange}
            value={product.subcategory}
            className="w-full px-3 py-2 border rounded"
          >
            {SUB_CATEGORIES.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            name="price"
            onChange={handleChange}
            value={product.price}
            className="w-full px-3 py-2 sm:w-[120px] border rounded"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {SIZES.map((size) => (
            <div
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 cursor-pointer rounded border-2 ${
                product.sizes.includes(size)
                  ? "border-green-600 bg-green-100"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          name="bestseller"
          onChange={handleChange}
          checked={product.bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          ADD TO BESTSELLER
        </label>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded">
          {isEdit ? "UPDATE" : "ADD"}
        </button>
        {isEdit && (
          <button
            type="button"
            className="w-28 py-3 mt-4 bg-gray-400 text-black rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
