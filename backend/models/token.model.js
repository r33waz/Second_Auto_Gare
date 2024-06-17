import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;