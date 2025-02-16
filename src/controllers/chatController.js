import {
  getAllMessagesService,
  getUsersService,
  sendMessageService,
} from "../services/chatService.js";
import { onlineUsers } from "../config/socket.js";
import { HttpStatusCode } from "../utils/statusCodes.js";


export const getUsers = async (req, res, next) => {
  try {
    const response = await getUsersService();

    if (!response.success) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ success: false, message: response.message });
      return;
    }
    res
      .status(HttpStatusCode.OK)
      .json({ success: response.success, users: response.users });
  } catch (error) {
    console.log("Error in getAllUsers: ", error);
    next(error);
  }
};



export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user.id;

    const response = await getAllMessagesService(myId, userToChatId);

    return res.status(HttpStatusCode.OK).json({
      success: true,
      messages: response.messages,
    });
  } catch (error) {
    console.error("Error in getMessages controller: ", error);
    next(error)
  }
};


export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const { id: senderId } = req.user;

    if (!message || !receiverId || !senderId) {
      res.json({ success: false, message: "Please provide all details!!" });
      return;
    }
    const io = req.io;

    const response = await sendMessageService(senderId, receiverId, message);

    const senderSocketId = onlineUsers[senderId]?.socketId;
    const receiverSocketId = onlineUsers[receiverId]?.socketId;

    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", response);
    }

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", response);
    }
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    next(error);
  }
};
