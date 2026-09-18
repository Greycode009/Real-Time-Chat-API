const onlineUsers = new Map();
const userSockets = new Map();

export const addUser = (socketId, room) => {
  onlineUsers.set(socketId, room);

  console.log("Added:", socketId);
  console.log("Current users:", [...onlineUsers.keys()]);
};

export const removeUser = (socketId) => {
  onlineUsers.delete(socketId);

  console.log("Removed:", socketId);
  console.log("Current users:", [...onlineUsers.keys()]);
};

export const getOnlineCount = () => {
  return onlineUsers.size;
};

export const getUserRoom = (socketId) => {
  return onlineUsers.get(socketId);
};

export const addUserSocket = (username, socketId) => {
  userSockets.set(username, socketId);
};

export const getUserSocket = (username) => {
  return userSockets.get(username);
};

export const removeUserSocket = (username) => {
  userSockets.delete(username);
};
