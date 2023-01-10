import { Request, Response } from "express";
import Customer from "../models/Customer";
import { CustomerDocument } from "../@types/ICustomer";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, cpf } = req.body;

    const customer: CustomerDocument = new Customer({
      name,
      email,
      phone,
      address,
      cpf,
    });
    const customerSave = await customer.save();

    return res.status(201).send(customerSave);
  } catch (err) {
    return res.status(400).send({ Error: err.message });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.find({});

    return res.status(201).send(customer);
  } catch (err) {
    return res.status(400).send({ Error: err.message });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customerDeleted = await Customer.findOneAndDelete({ _id: id });

    return res.status(200).send(customerDeleted);
  } catch (err) {
    return res.status(400).send({ Error: err.message });
  }
};

export const editCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, cpf } = req.body;

    const customerUpdated = await Customer.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          address: address,
          cpf: cpf,
        },
      },
      {
        new: true,
      }
    );

    const customerUpdatedSave = await customerUpdated.save();

    return res.status(200).send(customerUpdatedSave);
  } catch (err) {
    return res.status(400).send({ Error: err.message });
  }
};
