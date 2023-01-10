import express from "express";
import { createCustomer, deleteCustomer, editCustomer, getAllCustomers } from "../controllers/customer";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => createCustomer(req, res));
router.get("/", (req: Request, res: Response) => getAllCustomers(req, res));
router.delete("/:id", (req: Request, res: Response) => deleteCustomer(req, res));
router.patch("/:id", (req: Request, res: Response) => editCustomer(req, res));
export default router;
