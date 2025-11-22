import { v2 as cloudinary } from "cloudinary";
import assetModel from "../models/assetModel.js";

// Upload a new asset
const uploadAsset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "assets",
    });

    const newAsset = new assetModel({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      name: req.body.name || req.file.originalname,
    });

    await newAsset.save();

    res.status(201).json({ success: true, asset: newAsset });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all assets
const getAssets = async (req, res) => {
  try {
    const assets = await assetModel.find({});
    res.json({ success: true, assets });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// Delete an asset
const deleteAsset = async (req, res) => {
  try {
    const asset = await assetModel.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ success: false, message: "Asset not found" });
    }

    if (asset.public_id) {
      await cloudinary.uploader.destroy(asset.public_id);
    }

    await assetModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { uploadAsset, getAssets, deleteAsset };
