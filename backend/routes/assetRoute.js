import express from "express";
import { uploadAsset, getAssets, deleteAsset } from "../controllers/assetController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const assetRouter = express.Router();

assetRouter.post("/", adminAuth, upload.single("asset"), uploadAsset);
assetRouter.get("/", adminAuth, getAssets);
assetRouter.delete("/:id", adminAuth, deleteAsset);

export default assetRouter;
