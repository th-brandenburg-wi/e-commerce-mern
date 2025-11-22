import express from "express";
import { getContent, updateContent } from "../controllers/contentController.js";
import adminAuth from "../middleware/adminAuth.js";

const contentRouter = express.Router();

contentRouter.get("/:page", getContent);
contentRouter.put("/:page", adminAuth, updateContent);

export default contentRouter;
