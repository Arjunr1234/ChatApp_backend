import express from 'express';
import { logout, signIn, signUp } from '../controllers/authController.js'; 

const authRoute = express.Router();

authRoute.post('/signup', signUp);
authRoute.post('/signin', signIn);
authRoute.put('/logout', logout);

export default authRoute; 
