// src/socket.chat.ts
import { Server, Socket } from "socket.io";
import userModel from "../model/user.model.js";
import messageModel from "../model/message.model.js";
import logger from "../config/logger.js";

interface AuthSocket extends Socket {
  user?: {
    id: string;
    email: string;
  };
}

export default function registerChatSocketHandlers(io: Server, socket: AuthSocket) {
  const userId = socket.user?.id;

  if (!userId) {
    logger.error("No userId in socket");
    return;
  }

  // Mark user online
  userModel.findByIdAndUpdate(userId, { isOnline: true }).catch(err => {
    logger.error("Failed to mark user online:", err);
  });

  // Broadcast to others that this user is online
  socket.broadcast.emit("user:online", userId);

  logger.info(`User connected: ${userId}`);

  // ------------------ CHANNEL EVENTS ------------------

  socket.on("join-channel", (channelId: string) => {
    socket.join(channelId);
    logger.info(`User ${userId} joined channel ${channelId}`);
  });

  socket.on("leave-channel", (channelId: string) => {
    socket.leave(channelId);
    logger.info(`User ${userId} left channel ${channelId}`);
  });

  // ------------------ MESSAGE EVENTS ------------------ 

  socket.on("message:send", async ({ channelId, content }: { channelId: string; content: string }) => {
    try {
      const message = await messageModel.create({
        content,
        sender: userId,
        channel: channelId
      });

      await message.populate("sender", "username email isOnline");

      // Send to everyone in channel (including sender)
      io.to(channelId).emit("message:new", message);
      
      logger.info(`Message sent in channel ${channelId} by user ${userId}`);
    } catch (error: any) {
      logger.error("Error sending message:", error.message);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  // ------------------ DISCONNECT ------------------

  socket.on("disconnect", async () => {
    try {
      await userModel.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });

      socket.broadcast.emit("user:offline", userId);
      logger.info(`User disconnected: ${userId}`);
    } catch (error: any) {
      logger.error("Error on disconnect:", error);
    }
  });
}