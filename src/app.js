import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerChatEvents } from "./features/chat/chat.socket.js";
import { registerRoomEvents } from "./features/room/room.socket.js";

import {
  addUser,
  removeUser,
  getOnlineCount,
  getUserRoom,
} from "./features/presence/presence.service.js";
import { authenticateSocket } from "./features/auth/auth.socket.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(authenticateSocket);

const onlineUsers = new Map();

io.on("connection", (socket) => {
  
  socket.username = socket.user.username;
  console.log(`User connected: ${socket.username}`);

  io.emit("presence:update", {
    onlineCount: getOnlineCount(),
  });

  registerChatEvents(io, socket);
  registerRoomEvents(io, socket);

  socket.on("disconnect", (reason) => {
    const room = getUserRoom(socket.id);
    removeUser(socket.id);

    if (room) {
      socket.to(room).emit("presence:update", {
        status: "offline",
      });
    }

    console.log("A user disconnected:", reason);
  });
});

export { app, server, io };
