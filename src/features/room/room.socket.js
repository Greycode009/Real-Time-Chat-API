import { getRoomMessages } from "../chat/chat.service.js";
import { addUser } from "../presence/presence.service.js";

export const registerRoomEvents = (io, socket) => {
  socket.on("room:join", async (room) => {
    if (!room || typeof room !== "string" || !room.trim()) {
      return;
    }

    socket.join(room);
    addUser(socket.id, room);
    socket.to(room).emit("presence:update", {
      status: "online",
    });

    try {
      const messages = await getRoomMessages(room);

      socket.emit("message:history", messages);

      console.log(`User joined room: ${room}`);
    } catch (error) {
      console.error("Failed to load message history:", error.message);
    }
  });

  socket.on("room:leave", (room) => {
    if (!room || typeof room !== "string" || !room.trim()) {
      return;
    }

    socket.leave(room);

    console.log(`User left room: ${room}`);
  });
};
