export const onlineUsers = {};

const initialization = (io) => {
    io.on("connection", (socket) => {
        
        socket.on("join", ({ userId, userName }) => {
            
            onlineUsers[userId] = { socketId: socket.id, name:userName, userId };
            io.emit("updateUsers", Object.values(onlineUsers));
           // console.log("Online users:", onlineUsers); 
        });  

        socket.on("sendChatRequest", ({sender, receiver, name}) => {
            const receiverSocketId = onlineUsers[receiver].socketId;
            if(receiverSocketId){
                io.to(receiverSocketId).emit("receiveChatNotification", {sender,  name} )
            } 
        })

        socket.on("requestAccepted", ({userId}) => {
            const receiverSocketId = onlineUsers[userId].socketId
            io.to(receiverSocketId).emit("requestAcceptedNotify" )
        })

        socket.on("requestRejected", ({userId}) => {
             const receiverSocketId = onlineUsers[userId].socketId;
             io.to(receiverSocketId).emit("requestRejectNotify")
        })

        socket.on("leaveChat", ({userId, userName, rejectedUserId}) => {
              const receiverSocketId = onlineUsers[rejectedUserId].socketId;
              io.to(receiverSocketId).emit("leavedChat", {userName, userId})
        })
 
         
        socket.on("disconnect", () => {
            let disconnectedUserId = null;
 
            for (let userId in onlineUsers) {
                if (onlineUsers[userId].socketId === socket.id) {
                    disconnectedUserId = userId;
                    delete onlineUsers[userId]; 
                    break;
                }
            }

            io.emit("updateUsers", Object.values(onlineUsers));
        });
    });
};

export default initialization;
