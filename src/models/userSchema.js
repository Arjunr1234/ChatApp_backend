import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true,  },
  email: { type: String, required: true,  },
  phone:{type:String, required:true},
  password: { type: String, required: true },
});
 
const userModel = mongoose.model("User", UserSchema);

export default userModel
 