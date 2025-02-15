import express from 'express';
import {  getMessages, getUsers, sendMessage } from '../controllers/chatController.js';
import { authenticateUser } from '../middleware/protectRoute.js';
 

const chatRoute = express.Router();

chatRoute.get('/users', authenticateUser,  getUsers);
chatRoute.get('/messages/:id',authenticateUser, getMessages);

chatRoute.post('/send/:id', authenticateUser,  sendMessage);


export default chatRoute