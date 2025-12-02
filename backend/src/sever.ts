// src/server.ts
import express from "express";
import http from "http";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import logger from "./config/logger.js";
import { MONGO_URI, PORT } from "./env.js";
import type { Request, Response } from "express";

// Create Express app FIRST
const app = express();
const server = http.createServer(app); // Needed for Socket.io later


// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req : Request, res : Response) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/v1", );


// Start server function
const startServer = async () => {
  if (!MONGO_URI) {
    logger.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    // Connect to database
    await connectDatabase(MONGO_URI);
    logger.info("Database connected successfully");

    // Start listening
    const port = PORT || 5000;
    server.listen(port, () => {
      logger.info(`Server running on port ${port}`);
      logger.info(`Health check: http://localhost:${port}/health`);
    });
  } catch (err: any) {
    logger.error("Server failed to start");
    logger.error(err.message);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
export { server }; // Export server for Socket.io setup later