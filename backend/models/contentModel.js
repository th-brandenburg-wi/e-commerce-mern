import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: Object,
    required: true,
  },
});

const contentModel =
  mongoose.models.content || mongoose.model("content", contentSchema);

export default contentModel;
