import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";
import { MongoClient } from "mongodb";

const connectDB = async () =>
  await mongoose
    .connect(process.env.MONGODB_URI + "/project-db")
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("error --> " + error);
    });

export default connectDB;
