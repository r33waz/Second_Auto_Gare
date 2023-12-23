import mongoose from "mongoose";

export const Dbconnect = async () => {
  try {
    const SERVER_URI = process.env.MONGO_URI;
    await mongoose.connect(SERVER_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Databse is connected on ", mongoose.connection.host);
  } catch (error) {
    console.log("Mongo data is facing", error);
  }
};
