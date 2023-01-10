import User from "../models/User";
import { UserDocument } from "../@types/IUser";
import bcrypt from "bcrypt";

export const populateDB = async () => {
  const username = "desafiosharenergy";
  const email = "desafiosharenergy@sharenergy.com";
  const password = "sh@r3n3rgy";
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const usernameExists: UserDocument | null = await User.findOne({
    username: username,
  });

  const emailExists: UserDocument | null = await User.findOne({
    email: email,
  });

  if (!usernameExists && !emailExists) {
    const user: UserDocument = new User({
      username: username,
      email: email,
      password: passwordHash,
    });
    await user.save();
  }
};
