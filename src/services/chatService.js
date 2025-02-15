import { getAllMessagesRepo, sendMessageRepo } from "../repositories/chatRepository.js";


export const sendMessageService = async(senderId, receiverId, message) => {
   try {
    const response = await sendMessageRepo(senderId, receiverId, message);
    return response
    
   } catch (error) {
      console.log("Error in sendMessageService: ", error);
      return error
   }
}

export const getAllMessagesService = async(myId, userToChatId) => {
    try {
        const response = await getAllMessagesRepo(myId, userToChatId);
        return response
        
    } catch (error) {
        console.log("Error in getAllMessagesServcie: ", error);
        throw error
    }
} 