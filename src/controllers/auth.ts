import { Request, Response } from "express";
import User from "../models/User";
import { UserDocument } from "../@types/IUser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: UserDocument | null = await User.findOne({
      username: username,
    });

    if (!user)
      return res.status(401).json({ message: "Usuário não existente." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Credenciais inválidas." });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });
    delete user.password;
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const usernameExists: UserDocument | null = await User.findOne({
      username: username,
    });

    const emailExists: UserDocument | null = await User.findOne({
      email: email,
    });

    if (usernameExists)
      return res.status(401).json({ message: "Nome de usuário já em uso." });

    if (emailExists)
      return res.status(401).json({ message: "Email já em uso." });

    const user: UserDocument = new User({
      username,
      email,
      password: passwordHash,
    });
    await user.save();

    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send({ Error: err.message });
  }
};