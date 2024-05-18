import mongoose from "mongoose";
import "dotenv/config.js"

const MONGO_URL = process.env.MONGO_URL;

export const Dbconnect = async () => {
  try {
    const database = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${database.connection.host}`);
  } catch (error) {
     console.error("Database connection error:", error);
  }
};
