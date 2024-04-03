import Conversation from "../models/conservation.model.js";

export const createConservation = async (req, res) => {
  try {
    const { senderId, reciverId } = req.body;

    if (!senderId && !reciverId) {
      return res
        .status(400)
        .json({ status: false, message: "Something went wrong" });
    }
    const newConversation = await Conversation({
      members: [senderId, reciverId],
    });
    await newConversation.save();
    if (!newConversation) {
      return res.status(400).json({
        status: false,
        message: "Failed to add conversation.",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "New conservation added",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllConservation = async (req, res) => {
  try {
    const messages = await Conversation.find()
      .populate("members")
      .sort({ createdAt: -1 });

    if (!messages) {
      return res.status(400).json({
        status: false,
      });
    } else {
      return res.status(200).json({
        status: true,
        data: messages,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleUserMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Conversation.find({ members: { $in: [id] } }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      status: true,
      data: messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
