export const registerRoomEvents = (io, socket) => {
  socket.on("room:join", (roomId) => {
    socket.join(roomId);

    console.log(`User joined room: ${roomId}`);
  });

  socket.on("room:leave", (roomId) => {
    socket.leave(roomId);

    console.log(`User left room: ${roomId}`);
    socket.emit("room:leave", roomId);   
  });
};
