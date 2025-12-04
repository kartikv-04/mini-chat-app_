import type { Request, Response } from "express";
import {
  createWorkspaceService,
  getUserWorkspacesService,
  joinWorkspaceService,
  getWorkspaceDetailsService,
  updateWorkspaceService,
  deleteWorkspaceService,
} from "../services/workspace.service.js";

export async function createWorkspace(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { name } = req.body;

    const workspace = await createWorkspaceService(userId, name);

    res.status(201).json({
      success: true,
      data: workspace,
    });
  } catch (err: any) {

    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getUserWorkspaces(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const workspaces = await getUserWorkspacesService(userId);

    res.json({
      success: true,
      data: workspaces,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function joinWorkspace(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { code } = req.body;

    const workspace = await joinWorkspaceService(userId, code);

    res.json({
      success: true,
      data: workspace,
    });
  } catch (err: any) {

    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getWorkspaceDetails(req: Request, res: Response) {
  try {
    const { workspaceId } = req.params;

    if (!workspaceId) {
      throw new Error("workspaceId is required");
    }

    const workspace = await getWorkspaceDetailsService(workspaceId);

    res.json({
      success: true,
      data: workspace,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
}

export async function updateWorkspace(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { workspaceId } = req.params;
    const updates = req.body;

    if (!workspaceId) {
      throw new Error("workspaceId is required");
    }

    const workspace = await updateWorkspaceService(
      workspaceId,
      userId,
      updates
    );

    res.json({
      success: true,
      data: workspace,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function deleteWorkspace(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { workspaceId } = req.params;

    if (!workspaceId) {
      throw new Error("workspaceId is required");
    }

    await deleteWorkspaceService(workspaceId, userId);

    res.json({
      success: true,
      message: "Workspace deleted",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}
