// Create / Add Product

import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    // Import Data from User Inputs
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    console.log({
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    });

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    console.log({
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    });
    console.log(imagesUrl);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);

    await product.save();

    res.json({ success: true, message: "Product added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

// List / Find Products

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// Remove Product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product deleted!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

//  Single Product Info

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body.id;
    const product = await productModel.findById(productId);

    if (product)
      res.json({
        success: true,
        product,
      });
  } catch (error) {
    res.json({
      success: true,
      message: error.message,
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
