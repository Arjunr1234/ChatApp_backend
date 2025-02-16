import { getUsersRepo } from "../repositories/authRepository.js";
import {
  getAllMessagesRepo,
  sendMessageRepo,
} from "../repositories/chatRepository.js";

export const sendMessageService = async (senderId, receiverId, message) => {
  try {
    const response = await sendMessageRepo(senderId, receiverId, message);
    return response;
  } catch (error) {
    console.log("Error in sendMessageService: ", error);
    throw error;
  }
};

export const getAllMessagesService = async (myId, userToChatId) => {
  try {
    const response = await getAllMessagesRepo(myId, userToChatId);
    return response;
  } catch (error) {
    console.log("Error in getAllMessagesServcie: ", error);
    throw error;
  }
};

export const getUsersService = async () => {
  try {
    const response = await getUsersRepo();
    return response;
  } catch (error) {
    console.log("Error in getUsersService: ", error);
    throw error;
  }
};
