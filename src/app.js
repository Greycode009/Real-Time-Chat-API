import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerChatEvents } from "./features/chat/chat.socket.js";
import { registerRoomEvents } from "./features/room/room.socket.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");

  onlineUsers.set(socket.id, true);

  io.emit("presence:update", {
    onlineCount: onlineUsers.size,
  });

  registerChatEvents(io, socket);
  registerRoomEvents(io, socket);

  socket.on("disconnect", (reason) => {
    onlineUsers.delete(socket.id);

    console.log("A user disconnected:", reason);

    io.emit("presence:update", {
      onlineCount: onlineUsers.size,
    });
  });
});

export { app, server, io };
