import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await registerUser(username, password);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await loginUser(username, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
