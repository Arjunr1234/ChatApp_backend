import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { signInRepo, signUpRepo } from '../repositories/authRepository.js';
dotenv.config()


 export const signUpService = async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const data = {
        ...userData,
        password: hashedPassword,
      };
     
     const response = await signUpRepo(data)
     console.log("This is the respose servcie: ", response)
      return response;
    } catch (error) {
      console.log("Error in signUPService: ", error);
    }
  };

  export const signInService = async (userData) => {
    try {
        const response = await signInRepo(userData);
  
        if (!response.success) {
            return { success: false, message: response.message };
        }

        
        const payload = { id: response.userId };

    
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "15m",
        });
 
        
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: "7d",
        });

        return {
            success: true,
            message: response.message,
            accessToken,
            refreshToken,
            userId: response.userId,
            userName:response.userName
        };
    } catch (error) {
        console.log("Error in SignInService: ", error);
        throw error;
    }
};

  