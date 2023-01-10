import express from "express";
import { login, register } from "../controllers/auth";
import { Request, Response } from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => login(req, res));
router.post("/register", (req: Request, res: Response) => register(req, res))
export default router;