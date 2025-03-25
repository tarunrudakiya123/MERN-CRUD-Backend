import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body, "req.body-------");

    const existingUser = await User.findOne({ email });
    console.log(existingUser, "existingUser");

    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ status: true, message: "User registered", user });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true }).json({
      status: true,
      message: "Logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Login failed", error });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ status: true, message: "Logged out" });
};

export const checkAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({ status: true, message: "Authenticated", user });
};
