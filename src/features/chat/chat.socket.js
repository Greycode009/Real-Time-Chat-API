export const registerChatEvents = (io, socket) => {
  socket.on("message:send", (message) => {
    if (
      !message ||
      typeof message.text !== "string" ||
      !message.text.trim()
    ) {
      return;
    }

    console.log("Message received:", message);

    io.emit("message:receive", message);
  });
};