export const registerChatEvents = (io, socket) => {
  socket.on("message:send", (message) => {
    if (
      !message ||
      typeof message.text !== "string" ||
      !message.text.trim() ||
      typeof message.room !== "string" ||
      !message.room.trim()
    ) {
      return;
    }

    console.log("Message received:", message);

    io.to(message.room).emit("message:receive", message);
  });
};
