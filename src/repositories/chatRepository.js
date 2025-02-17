import messageModel from "../models/messageSchema.js";


export const sendMessageRepo = async (senderId, receiverId, message) => {
  try {
    
    const newMessage = new messageModel({
      senderId,
      receiverId,
      text: message,
    });

    const savedMessage = await newMessage.save();
    
    return {
      _id:savedMessage._id + "",
      senderId: savedMessage.senderId + "",
      receiverId: savedMessage.receiverId + "",
      message: savedMessage.text,
      time: savedMessage.createdAt,  
    };
  } catch (error) {
    console.log("Error in sendMessageRepo: ", error);
    throw error;  
  }
};

export const getAllMessagesRepo = async (myId, userToChatId) => {
    try {
      const fetchMessages = await messageModel.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId }
        ]
      })
  
      
      const messages = fetchMessages.map(message => ({
        _id: String(message._id),
        senderId: String(message.senderId),
        receiverId: String(message.receiverId),
        message: message.text,
        time: message.createdAt
      })); 
    //   console.log("This is the message: ", messages)
      return { messages };
    } catch (error) {
      console.error("Error in getAllMessagesRepo: ", error);
      
    }
  };


