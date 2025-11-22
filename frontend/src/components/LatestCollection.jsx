import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { backendUrl } from "../utils";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [content, setContent] = useState({ title: "Latest COLLECTION", body: "" });
  const [titleParts, setTitleParts] = useState(["Latest", "COLLECTION"]);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/content/latestcollection`);
        if (response.data.success) {
          setContent(response.data.data.content);
          const parts = response.data.data.content.title.split(' ');
          setTitleParts(parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : [parts[0], '']);
        }
      } catch (error) {
        console.error('Error fetching latest collection content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={titleParts[0]} text2={titleParts[1]} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">
          {content.body}
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.images[0].url}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
