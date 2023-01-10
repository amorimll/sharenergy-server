import mongoose from "mongoose";

export interface CustomerDocument extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
}