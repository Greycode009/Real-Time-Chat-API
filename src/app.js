import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerChatEvents } from "./features/chat/chat.socket.js";
import { registerRoomEvents } from "./features/room/room.socket.js";
import { registerCallEvents } from "./features/call/call.socket.js";

import {
  addUser,
  removeUser,
  getOnlineCount,
  getUserRoom,
  addUserSocket,
  getUserSocket,
  removeUserSocket,
} from "./features/presence/presence.service.js";
import { authenticateSocket } from "./features/auth/auth.socket.js";
import authRouter from "./features/auth/auth.routes.js";

const app = express();

app.use(express.json());

// Lets the test client call /auth/* from file:// or a different port,
// matching the origin policy the Socket.IO server already uses below.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(authenticateSocket);
app.use("/auth", authRouter);

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.username = socket.user.username;
  addUserSocket(socket.username, socket.id);
  console.log(`User connected: ${socket.username}`);

  io.emit("presence:update", {
    onlineCount: getOnlineCount(),
  });

  registerChatEvents(io, socket);
  registerRoomEvents(io, socket);
  registerCallEvents(io, socket);

  socket.on("disconnect", (reason) => {
    const room = getUserRoom(socket.id);
    removeUser(socket.id);

    // On a reload the new socket registers before this fires, so only drop
    // the mapping when it still points at the socket that is going away.
    if (getUserSocket(socket.username) === socket.id) {
      removeUserSocket(socket.username);
    }

    if (room) {
      socket.to(room).emit("presence:update", {
        status: "offline",
      });
    }

    console.log("A user disconnected:", reason);
  });
});

export { app, server, io };
