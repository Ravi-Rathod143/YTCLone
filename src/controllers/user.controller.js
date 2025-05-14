import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    const token = generateToken(newUser._id.toString());

    return res.status(201).json({ userId: newUser._id, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res
        .status(400)
        .json({ message: "Either username or password is invalid" });

    const passwordMatched = await foundUser.validatePassword(password);
    if (!passwordMatched)
      return res
        .status(400)
        .json({ message: "Either username or password is invalid" });

    const token = generateToken(foundUser._id.toString());
    return res.status(200).json({ foundUser, token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ message: "Found User", foundUser });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res.json({ message: "User Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const addToHistory = async (req, res) => {
  try {
    const { videoId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Add only if not already present
    if (!user.history.includes(videoId)) {
      user.history.push(videoId);
      await user.save();
    }

    return res.status(200).json({ message: "Video added to history" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};