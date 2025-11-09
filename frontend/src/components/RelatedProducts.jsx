import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  //console.log("fetched Products --> " + products);

  useEffect(() => {
    if (products.length > 0 && category) {
      // Filter by category, but not strictly by subCategory
      let productsCopy = products.filter((item) => item.category === category);
      // Optionally, exclude the current product if you pass its id as a prop
      // productsCopy = productsCopy.filter((item) => item._id !== currentProductId);
      // If you want to prioritize subCategory, you can sort or filter further
      if (subCategory) {
        const subCatProducts = productsCopy.filter(
          (item) => item.subCategory === subCategory
        );
        // If there are enough in subCategory, use them, else fill with others
        let result = subCatProducts.slice(0, 5);
        if (result.length < 5) {
          const others = productsCopy.filter(
            (item) => item.subCategory !== subCategory
          );
          result = result.concat(others.slice(0, 5 - result.length));
        }
        setRelated(result);
      } else {
        setRelated(productsCopy.slice(0, 5));
      }
    } else {
      setRelated([]);
    }
  }, [products, category, subCategory]);

  return related.length > 0 ? (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"PRODUCTS"} />
      </div>
      {console.log("related array is not empty")}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default RelatedProducts;
