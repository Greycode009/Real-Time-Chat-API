import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("room:join", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("message:send", (message) => {
    if (!message || typeof message.text !== "string" || !message.text.trim()) {
      return;
    }

    console.log("Message received:", message);

    io.emit("message:receive", message);
  });

  socket.on("disconnect", (reason) => {
    console.log("A user disconnected", reason);
  });
});

export { app, server, io };
