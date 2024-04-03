import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conservationId: { type: mongoose.Types.ObjectId, ref: "Conservation" },
  senderId: {
    type: { type: mongoose.Types.ObjectId, ref: "Conservation" },
  },
  message: { type: String },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
