import type { Request, Response } from "express";
import {
  createMessageService,
  getChannelMessagesService,
  editMessageService,
  deleteMessageService,
} from "../services/message.service.js";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { content, channelId } = req.body;
    const userId = (req as any).user.id;

    const msg = await createMessageService({
      content,
      channelId,
      userId,
    });

    return res.status(201).json({
      success: true,
      data: msg,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getChannelMessages(req: Request, res: Response) {
  try {
    const { channelId } = req.params;
    const page = Number(req.query.page) || 1;
    if(!channelId) {
      throw new Error("channelId is required");
    }

    const messages = await getChannelMessagesService(channelId, page);

    return res.json({
      success: true,
      data: messages,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function editMessage(req: Request, res: Response) {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user.id;

    if(!messageId) {
      throw new Error("messageId is required");
    }

    const msg = await editMessageService(messageId, userId, content);

    return res.json({
      success: true,
      data: msg,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const { messageId } = req.params;
    const userId = (req as any).user.id;

    if(!messageId) {
      throw new Error("messageId is required");
    }

    await deleteMessageService(messageId, userId);

    return res.json({
      success: true,
      message: "Message deleted",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}
