// Create / Add Product

import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      bestseller,
      sizes,
    } = req.body;
    const images = [];

    // Handle image uploads (assuming you're using multer for req.files)
    const imageFiles = [
      req.files?.image1 && req.files?.image1[0],
      req.files?.image2 && req.files?.image2[0],
      req.files?.image3 && req.files?.image3[0],
      req.files?.image4 && req.files?.image4[0],
    ].filter((item) => item !== undefined);

    for (const file of imageFiles) {
      const uploadResult = await cloudinary.uploader?.upload(file.path, {
        folder: "products",
      });
      images.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }

    console.log("stored images -->" + images.values);
    const product = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      images,
      date: Date.now(),
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
    const product = await productModel.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Remove images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product and images deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Single Product Info

const singleProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    console.log("product id --> " + productId);
    const product = await productModel.findById(productId);

    if (product)
      res.json({
        success: true,
        product,
      });
    else {
      res.json({
        success: false,
        message: "Product not found!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const {
      name,
      description,
      price,
      category,
      subcategory,
      bestseller,
      sizes,
    } = req.body;

    // Prepare an array to hold the new image data
    const newImagesData = [];
    const existingImages = product.images || [];

    // Handle image uploads and replacements
    for (let i = 0; i < 4; i++) {
      const file = req.files?.[`image${i + 1}`]?.[0];
      if (file) {
        // If there's a new image, upload it and replace the old one
        // First, delete the old image from Cloudinary if it exists
        if (existingImages[i] && existingImages[i].public_id) {
          await cloudinary.uploader.destroy(existingImages[i].public_id);
        }

        // Upload the new image
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        newImagesData[i] = {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        };
      } else if (existingImages[i]) {
        // If no new image, keep the existing one
        newImagesData[i] = existingImages[i];
      }
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.bestseller =
      bestseller !== undefined
        ? bestseller === "true" || bestseller === true
        : product.bestseller;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.images = newImagesData.filter(Boolean); // Clean out any empty slots

    await product.save();

    res.json({ success: true, message: "Product updated", product });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
