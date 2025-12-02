import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
    createWorkspace,
    getUserWorkspaces,
    joinWorkspace,
    getWorkspaceDetails,
    updateWorkspace,
    deleteWorkspace,
} from "../controller/workspace.controller.js";

const router = Router();

// 1. Create a new workspace ("My Company")
router.post("/", authenticate, createWorkspace);

// 2. Get all workspaces the logged-in user belongs to (for the sidebar)
router.get("/", authenticate, getUserWorkspaces);

// 3. Join a workspace (via a shareable code)
// Example: POST /workspaces/join { code: "join-abc-123" }
router.post("/join", authenticate, joinWorkspace);

// 4. Get specific workspace details (members, settings)
router.get("/:workspaceId", authenticate, getWorkspaceDetails);

// 5. Update workspace (Rename, Change Icon) - Owner only
router.patch("/:workspaceId", authenticate, updateWorkspace);

// 6. Delete workspace - Owner only
router.delete("/:workspaceId", authenticate, deleteWorkspace);

export default router;