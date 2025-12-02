import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
    createChannel,
    getChannels,
    deleteChannel,
    getChannelInfo,
    updateChannel
} from "../controller/channel.controller.js";


const router = Router();

// 1. Create a Channel
// Body should contain { name: "general", workspaceId: "..." }
router.post("/", authenticate, createChannel);

// 2. Get all channels for a SPECIFIC Workspace
// Usage: GET /channels/workspace/123456
router.get("/workspace/:workspaceId", authenticate, getChannels);

// 3. Get specific channel info
router.get("/:channelId", authenticate, getChannelInfo);

// 4. Update channel (Description, Topic)
router.patch("/:channelId", authenticate, updateChannel);

// 5. Delete channel
router.delete("/:channelId", authenticate, deleteChannel);

export default router;