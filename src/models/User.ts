import mongoose from "mongoose";
import { UserDocument } from "../@types/IUser";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;

