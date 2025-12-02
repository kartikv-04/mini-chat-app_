import { Router } from "express";
import { signup, signin, signout } from "../controller/auth.controller.js";

const router = Router();

// auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("signout", signout);
router.post("/me")

export default router;

