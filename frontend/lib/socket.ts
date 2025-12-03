import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const token = localStorage.getItem("accessToken");

    socket = io(SOCKET_URL, {
      withCredentials: true,
      auth: {
        token: token || "",
      },
      transports: ["websocket"], // force low-latency
    });
  }

  return socket;
};


