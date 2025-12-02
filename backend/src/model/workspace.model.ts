// models/Workspace.ts
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    // The owner has admin rights (can delete workspace, etc.)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Members who have access to this workspace
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // Optional: Invite code for joining
    joinCode: { type: String, unique: true } 
}, { timestamps: true });

export default mongoose.model("Workspace", workspaceSchema);