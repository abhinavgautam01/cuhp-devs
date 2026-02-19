import mongoose from "mongoose";
const MONGO_URI = process.env.DATABASE_URL as string;


if (!MONGO_URI) {
  throw new Error("DATABASE_URL is not defined");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};