import { Router } from "express";
import authRouter from "./auth.routes.js";
import channelRouter from "./channel.routes.js";
import messageRouter from "./message.routes.js";
import workspaceRouter from "./workspace.route.js";

const router = Router();

// auth routes
router.use("/auth", authRouter);

// channel route
router.use("/channels", channelRouter)

// message route
router.use("/messages", messageRouter)

// Workspace router
router.use("/workspaces", workspaceRouter)

export default router;
