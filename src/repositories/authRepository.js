import bcrypt from 'bcryptjs'
import userModel from "../models/userSchema.js";




export const signUpRepo = async (userData) => {
    try {
        console.log("This is the userData: ", userData);

        
        const existingUser = await userModel.findOne({ email: userData.email });

        if (existingUser) {
            return { success: false, message: "Email already exists" };
        }

        
        const createUser = await userModel.create(userData);
        
        if (!createUser) {
            return { success: false, message: "Failed to create User" };
        }

        
        const { password, ...mainData } = createUser.toObject();

        return { success: true, createUser: mainData };
    } catch (error) {
        console.log("Error in signUpRepo: ", error);
        return { success: false, message: "An error occurred during user creation" };
    }
};

export const signInRepo = async (userData) => {
    try {
      const { email, password } = userData;
  
      const findUser = await userModel.findOne({ email });
  
      if (!findUser) {
        return { success: false, message: "User is not found!!" };
      }
  
      const passwordValid = await bcrypt.compare(password, findUser.password);
  
      if (!passwordValid) {
        return { success: false, message: "Incorrect password!!" };
      }
  
      return {
        success: true,
        message: "Login Successfull",
        userId: findUser._id + "",
        userName:findUser.name
      };
    } catch (error) {
      console.log("Error in SignInRepo: ", error);
    }
  };
