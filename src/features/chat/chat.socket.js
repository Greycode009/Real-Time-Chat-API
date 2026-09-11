import Message from "./message.model.js";

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
      });

      io.to(message.room).emit("message:receive", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });
};
