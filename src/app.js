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

  socket.on("hello", (message) => {
    console.log("Client says:", message);

    socket.emit("hello", "Hello from server!");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, server, io };
