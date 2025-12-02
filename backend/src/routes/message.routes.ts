import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js"
import {
    sendMessage,
    getChannelMessages,
    editMessage,
    deleteMessage,  
} from "../controller/message.controller.js";



const router = Router();

// 1. Send a message (Text)
// Body: { content: "Hello", channelId: "..." }
router.post("/", authenticate, sendMessage);

// 2. Get all messages for a specific channel (Chat History)
// Usage: GET /messages/channel/12345?page=1
router.get("/channel/:channelId", authenticate, getChannelMessages);

// 3. Edit a message
// Usage: PATCH /messages/12345
router.patch("/:messageId", authenticate, editMessage);

// 4. Delete a message
router.delete("/:messageId", authenticate, deleteMessage);

export default router;