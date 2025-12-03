// src/middleware/socketauth.ts
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/env.js";
import logger from "../config/logger.js";

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, ACCESS_SECRET!) as {
      id: string;
      email: string;
    };

    // Attach user to socket
    (socket as any).user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error: any) {
    logger.error("Socket auth error:", error);
    next(new Error("Authentication error: Invalid token"));
  }
};