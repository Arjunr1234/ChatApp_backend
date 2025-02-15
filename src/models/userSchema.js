import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true,  },
  email: { type: String, required: true,  },
  phone:{type:String, required:true},
  password: { type: String, required: true },
  status: { type: String, enum: ["online", "offline"], default: "offline" }
});
 
const userModel = mongoose.model("User", UserSchema);

export default userModel
 