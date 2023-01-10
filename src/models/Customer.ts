import mongoose from "mongoose";
import { CustomerDocument } from "../@types/ICustomer";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    phone: {
      type: String,
      required: true,
      min: 5,
    },
    address: {
      type: String,
      required: true,
      min: 5,
    },
    cpf: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model<CustomerDocument>(
  "Customer",
  CustomerSchema
);
export default Customer;
