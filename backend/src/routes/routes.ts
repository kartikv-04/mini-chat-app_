import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

// auth routes
router.use("/auth", authRouter);

// channel route
router.use("/channel")

// message route
router.use("/message")
