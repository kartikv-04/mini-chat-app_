import type { Request, Response } from "express";
import {
  getAllChannel,
  createChannelService,
  getChannelInfoService,
  channelUpdateService,
  deleteChannelService,
} from "../services/channel.service.js";

export const createChannel = async (req: Request, res: Response) => {
  try {
    const { name, description, workspaceId } = req.body;
    const userId = (req as any).user.id;

    if (!name || !workspaceId) {
      return res.status(400).json({
        success: false,
        error: "Channel name and workspaceId are required",
      });
    }

    const channel = await createChannelService(name, description, workspaceId, userId);

    return res.status(201).json({
      success: true,
      data: channel,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getChannels = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        error: "workspaceId is required",
      });
    }

    const channels = await getAllChannel(workspaceId);

    return res.json({
      success: true,
      data: channels,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getChannelInfo = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({
        success: false,
        error: "channelId is required",
      });
    }

    const channel = await getChannelInfoService(channelId);

    if (!channel) {
      return res.status(404).json({
        success: false,
        error: "Channel not found",
      });
    }

    return res.json({
      success: true,
      data: channel,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const updateChannel = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const updateData = req.body;

    if (!channelId) {
      return res.status(400).json({
        success: false,
        error: "channelId is required",
      });
    }

    const updated = await channelUpdateService(channelId, updateData);

    return res.json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({
        success: false,
        error: "channelId is required",
      });
    }

    const result = await deleteChannelService(channelId);

    return res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
