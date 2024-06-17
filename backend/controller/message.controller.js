import Conversation from "../models/conservation.model.js";
import Message from "../models/messages.model.js";
import User from "../models/user.model.js";

export const createMessage = async (req, res) => {
  try {
    const mesg = req.body;
    console.log(mesg);
    if (
      !mesg?.senderId &&
      !mesg?.message &&
      !mesg?.conversationId &&
      !mesg?.reciverId
    ) {
      return res.status(400).json({
        status: false,
        message: "Something went wrong",
      });
    }
    if (!mesg?.conversationId && mesg?.reciverId) {
      const newConservation = await Conversation({
        members: [mesg?.senderId, mesg.reciverId],
      });
      await newConservation.save();
      return res.status(200).json({
        status: true,
      });
    } else {
      if (
        mesg?.senderId &&
        mesg?.message &&
        mesg?.conversationId &&
        mesg?.reciverId
      ) {
        const newMessage = new Message({
          senderId: mesg.senderId,
          message: mesg.message,
          conversationId: mesg.conversationId,
        });

        await newMessage.save();

        return res.status(200).json({
          status: true,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//get messages by conservation id
export const getMessagesByConvId = async (req, res) => {
  try {
    const convId = req.params.conveId;
    if (convId === "new_mesg") return res.status(200).json([]);
    console.log("convo>>", convId);
    const mesg = await Message.find({ conversationId: convId });
    const userMessages = await Promise.all(
      mesg.map(async (messg) => {
        const user = await User.findById(messg?.senderId).sort({
          createdAt: -1,
        });
        return {
          userId: user?._id,
          firstname: user?.firstname,
          lastname: user?.lastname,
          mesg: messg?.message,
          conservationId: convId,
          image: user?.photo,
        };
      })
    );
    if (!userMessages) {
      return res.status(400).json({
        status: false,
        message: "No Conversation Found",
      });
    }
    return res.status(200).json({
      status: true,
      data: userMessages,
      count: userMessages.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
