import { signInService, signUpService } from "../services/authService.js";
import { HttpStatusCode } from "../utils/statusCodes.js";

export const signUp = async (req, res, next) => {
  try {
    
    const { name, email, phone, password } = req.body;
    console.log(req.body);

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide necessary data",
      });
    }

    const userData = { name, email, phone, password };
    const response = await signUpService(userData);
    console.log('response in controller: ', response)
    if (!response?.success) {
      return res.status(401).json({
        success: false,
        message: response.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userData: response.createUser,
    });
  } catch (error) {
    console.log("Error in signUp:", error);
    next(error); 
  }
};

export const signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
  
      if (!email || !password) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Please provide necessary data",
        });
      }
  
      const data = { email, password };
      const response = await signInService(data);
      
  
      if (!response.success) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: response.message,
        });
      }
      
      res.cookie("accessToken", response.accessToken, {
        httpOnly: true,
        sameSite: "none", 
        secure: process.env.NODE_ENV === "production",  
        maxAge: 15 * 60 * 1000, 
      });
      console.log();
      
      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",  
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: response.message,
        userId: response.userId,
        userName:response.userName
      });

    } catch (error) {
      console.error("Error in SignIn: ", error);
      next(error);
    }
  };
 
  export const logout = (req, res) => {
      
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      });
    
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      });
    
      res.status(200).json({ message: "Logged out successfully" });
    
  }
