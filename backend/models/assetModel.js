import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const assetModel = mongoose.models.asset || mongoose.model("asset", assetSchema);

export default assetModel;
