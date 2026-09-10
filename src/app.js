import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerChatEvents } from "./features/chat/chat.socket.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  registerChatEvents(io, socket);

  socket.on("disconnect", (reason) => {
    console.log("A user disconnected:", reason);
  });
});

export { app, server, io };
