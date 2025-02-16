import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoute from './src/routes/authRoute.js';
import initializeSocket from './src/config/socket.js'; 
import chatRoute from './src/routes/chatRoutes.js';
import { errorHandler } from './src/middleware/errorMiddlewares.js';

dotenv.config(); 

const app = express();
const server = http.createServer(app);
//const localOrgin = 'http://localhost:5173' 
//const orgin = 'https://chat-app-frontend-swart-seven.vercel.app'

const io = new Server(server, {

    cors: {
        origin: "https://chat-app-frontend-swart-seven.vercel.app", 
        methods: ["GET", "POST"],
        credentials: true
    }
});



const corsOptions = {
    origin: 'https://chat-app-frontend-swart-seven.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};


connectDB();


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  

app.use((req, res, next) => {
    req.io = io;  
    next();   
});
 
app.use('/api/auth', authRoute);
app.use('/api/chat', chatRoute);

app.use(errorHandler)


initializeSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
