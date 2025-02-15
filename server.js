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

dotenv.config(); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        credentials: true
    }
});

const corsOptions = {
    origin: 'http://localhost:5173',
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
app.use('/api/chat', chatRoute)


initializeSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
