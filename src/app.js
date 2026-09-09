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

  socket.on("message:send", (message) => {
    console.log("Message received:", message);

    io.emit("message:receive", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, server, io };
