import Message from "./message.model.js";
import { sendNotification } from "../notification/notification.socket.js";

export const registerChatEvents = (io, socket) => {
  socket.on("message:send", async (message) => {
    if (
      !message ||
      typeof message.text !== "string" ||
      !message.text.trim() ||
      typeof message.room !== "string" ||
      !message.room.trim()
    ) {
      return;
    }

    try {
      const savedMessage = await Message.create({
        text: message.text,
        room: message.room,
        sender: socket.username,
      });

      io.to(message.room).emit("message:receive", savedMessage);
      sendNotification(socket, message.room, {
        sender: socket.username,
        room: message.room,
        text: message.text,
      });
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });
};
