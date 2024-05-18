import mongoose from "mongoose";



export const Dbconnect = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${database.connection.host}`);
  } catch (error) {
     console.error("Database connection error:", error);
  }
};
