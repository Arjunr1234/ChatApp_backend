import express from 'express';
import { logout, signIn, signUp } from '../controllers/authController.js'; 
import { authenticateUser } from '../middleware/protectRoute.js';

const authRoute = express.Router();

authRoute.post('/signup', signUp);
authRoute.post('/signin', signIn);
authRoute.put('/logout', authenticateUser, logout);

export default authRoute; 
