export const sendNotification = (socket, room, notification) => {
  socket.to(room).emit("notification:new", notification);
};
