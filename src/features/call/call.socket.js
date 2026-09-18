import { getUserSocket } from "../presence/presence.service.js";

export const registerCallEvents = (io, socket) => {
  socket.on("call:offer", ({ offer, targetUsername }) => {
    const targetSocket = getUserSocket(targetUsername);

    if (!targetSocket) {
      return;
    }
    io.to(targetSocket).emit("call:offer", {
      offer,
      callerUsername: socket.username,
    });
  });

  socket.on("call:answer", ({ answer, targetUsername }) => {
    const targetSocket = getUserSocket(targetUsername);

    if (!targetSocket) {
      return;
    }
    io.to(targetSocket).emit("call:answer", {
      answer,
      calleeUsername: socket.username,
    });
  });
};
