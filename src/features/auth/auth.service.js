import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "./user.model.js";

export const registerUser = async (username, password) => {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await argon2.hash(password);

  return User.create({
    username,
    password: hashedPassword,
  });
};

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordValid = await argon2.verify(user.password, password);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return { token, username: user.username };
};
