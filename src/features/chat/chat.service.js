import Message from "./message.model.js";

export const getRoomMessages = async (room) => {
  return Message.find({ room }).sort({ createdAt: 1 }).limit(50);
};
