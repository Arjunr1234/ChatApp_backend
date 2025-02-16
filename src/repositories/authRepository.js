import bcrypt from "bcryptjs";
import userModel from "../models/userSchema.js";

export const signUpRepo = async (userData) => {
  try {
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
    throw error;
  }
};

export const signInRepo = async (userData) => {
  try {
    const { email, password } = userData;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return { success: false, message: "Invalid Credentials!!" };
    }

    const passwordValid = await bcrypt.compare(password, findUser.password);

    if (!passwordValid) {
      return { success: false, message: "Invalid Credentials!!" };
    }

    return {
      success: true,
      message: "Login Successfull",
      userId: findUser._id + "",
      userName: findUser.name,
    };
  } catch (error) {
    console.log("Error in SignInRepo: ", error);
    throw error;
  }
};

export const getUsersRepo = async (req, res) => {
  try {
    const fetchAllUsers = await userModel.find({});

    if (!fetchAllUsers || fetchAllUsers.length === 0) {
      return { success: false, message: "No users found" };
    }
    return { success: true, users: fetchAllUsers };
  } catch (error) {
    console.log("Error in getUsersRepo: ", error);
    throw error;
  }
};
