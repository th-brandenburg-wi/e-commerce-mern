import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { getProductById } from "../services/api";
import { toast } from "react-toastify";

const ProductItem = ({ id }) => {
  // PERFORMANCE NOTE:
  // This component fetches its own data. For a list of products, this results
  // in N+1 database queries (1 for the list of IDs, N for each item).
  // This is inefficient and not recommended for production environments.
  // The preferred approach is for the parent component to fetch the entire list
  // and pass the data down as props.

  const { currency } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          toast.error("Failed to load product.");
        }
      } catch (error) {
        toast.error("Error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4">
        <div className="aspect-square bg-gray-200 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mt-4 w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded mt-2 w-1/2 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded mt-4 animate-pulse"></div>
      </div>
    );
  }

  if (!product) {
    return null; // Or some error state
  }

  const { _id, images, name, price } = product;
  const imageUrl = images && images[0]?.url;

  return (
    <div className="group text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/product/${_id}`}>
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            {imageUrl ? (
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={imageUrl}
                alt={name}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/product/${_id}`}>
          <h3 className="text-sm font-semibold truncate hover:text-orange-500">
            {name}
          </h3>
        </Link>
        <p className="text-base font-bold mt-2">
          {currency}
          {price}
        </p>
        <Link
          to={`/product/${_id}`}
          className="block text-center bg-black text-white text-sm py-2 px-4 mt-4 rounded hover:bg-gray-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
