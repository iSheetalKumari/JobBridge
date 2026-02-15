import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) throw new Error("MONGO_URI is missing in .env.local");

export default async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return mongoose; // already connected
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected:", mongoose.connection.host); // ✅ log success
  return mongoose;
}
