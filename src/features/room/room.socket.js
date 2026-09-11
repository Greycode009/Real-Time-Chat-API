import { getRoomMessages } from "../chat/chat.service.js";

export const registerRoomEvents = (io, socket) => {
  socket.on("room:join", async (roomId) => {
    if (!room || typeof room !== "string" || !room.trim()) {
      return;
    }
    socket.join(roomId);
    try {
      const messages = await getRoomMessages(room);

      socket.emit("message:history", messages);

      console.log(`User joined room: ${room}`);
    } catch (error) {
      console.error("Failed to load message history:", error.message);
    }
  });
};
