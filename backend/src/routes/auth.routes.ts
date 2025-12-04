import { Router } from "express";
import { signup, signin, signout, getMe } from "../controller/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/me", authenticate, getMe);

export default router;

