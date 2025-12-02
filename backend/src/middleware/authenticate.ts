import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "No token provided",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!ACCESS_SECRET) {
      throw new Error("ACCESS_SECRET is not defined");
    }

    // FIX APPLIED HERE: Added '!' after ACCESS_SECRET
    const decoded = jwt.verify(token!, ACCESS_SECRET!) as unknown as {
      id: string;
      email: string;
    };

    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
    return;
  }
};