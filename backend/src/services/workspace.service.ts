import workspaceModel from "../model/workspace.model.js";
import userModel from "../model/user.model.js";
import mongoose from "mongoose";

// 1. Create workspace
export async function createWorkspaceService(userId: string, name: string) {
    if (!name) throw new Error("Workspace name is required");

    const workspace = await workspaceModel.create({
        name,
        owner: userId,
        members: [userId],
    });

    return workspace;
}

// 2. Get workspaces for a user
export async function getUserWorkspacesService(userId: string) {
    const workspaces = await workspaceModel.find({
        members: userId,
    })
        .populate("owner", "_id name email")
        .select("_id name owner");

    return workspaces;
}

// 3. Join workspace via code
export async function joinWorkspaceService(userId: string, code: string) {
    if (!code) throw new Error("Join code is required");

    const workspace = await workspaceModel.findOne({ inviteCode: code });
    if (!workspace) throw new Error("Invalid workspace code");

    if (!userId) {
        throw new Error("userId is required");
    }

    if (workspace.members.some(m => m.toString() === userId)) {
        throw new Error("User already in workspace");
    }

    workspace.members.push(new mongoose.Types.ObjectId(userId));
    await workspace.save();


    return workspace;
}

// 4. Get workspace details
export async function getWorkspaceDetailsService(workspaceId: string) {
    const workspace = await workspaceModel.findById(workspaceId)
        .populate("owner", "_id name email avatar")
        .populate("members", "_id name email avatar");

    if (!workspace) throw new Error("Workspace not found");

    return workspace;
}

// 5. Update workspace (owner only)
export async function updateWorkspaceService(
    workspaceId: string,
    userId: string,
    updates: { name?: string; icon?: string }
) {
    const workspace = await workspaceModel.findById(workspaceId);

    if (!workspace) throw new Error("Workspace not found");

    if (workspace.owner.toString() !== userId) {
        throw new Error("Only the owner can update this workspace");
    }

    if (updates.name) workspace.name = updates.name;

    await workspace.save();
    return workspace;
}

// 6. Delete workspace
export async function deleteWorkspaceService(workspaceId: string, userId: string) {
    const workspace = await workspaceModel.findById(workspaceId);

    if (!workspace) throw new Error("Workspace not found");

    if (workspace.owner.toString() !== userId) {
        throw new Error("Only the owner can delete this workspace");
    }

    await workspaceModel.findByIdAndDelete(workspaceId);

    return true;
}
