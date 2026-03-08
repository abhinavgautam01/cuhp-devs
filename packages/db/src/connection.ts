import mongoose from "mongoose";

const globalWithMongoose = global as typeof global & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  const MONGO_URI = process.env.DATABASE_URL;
  console.log("Connecting to MongoDB...", process.env.DATABASE_URL);
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (cached!.conn) return cached!.conn;

  if (!cached?.promise) {
    cached!.promise = mongoose.connect(MONGO_URI);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log("MongoDB Connected successfully");
    return cached!.conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    cached!.promise = null; // Reset promise so it can be retried
    throw error;
  }
}