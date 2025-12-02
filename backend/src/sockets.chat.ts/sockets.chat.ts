import { Server, Socket } from "socket.io";
import logger from "../config/logger.js";

export default function registerChatSocketHandlers(io: Server, socket: Socket) {
  logger.info("User connected:");

  // Join a channel (room)
  socket.on("join-channel", (channelId: string) => {
    socket.join(channelId);
    logger.info(`${socket.id} joined channel ${channelId}`);
  });

  // Leave a channel
  socket.on("leave-channel", (channelId: string) => {
    socket.leave(channelId);
    logger.info(`${socket.id} left channel ${channelId}`);
  });

  // Disconnect
  socket.on("disconnect", () => {
    logger.info("User disconnected:");
  });
}
