import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User", unique: true },
  token: {
    type: String,
    required: true,
  },
  createdAT: { type: Date, default: Date.now(), expires: 26000 },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
