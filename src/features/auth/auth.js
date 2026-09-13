import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const createTestToken = () => {
  return jwt.sign(
    {
      id: "test-user-1",
      username: "Dipesh",
    },
    config.JWT_SECRET,
    {
      expiresIn: config.TOKEN_EXPIRATION,
    },
  );
};
