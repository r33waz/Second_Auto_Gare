import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      //in this type array we store sender id and  receiver id
      // but if the user is not logged in then it will be null
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
