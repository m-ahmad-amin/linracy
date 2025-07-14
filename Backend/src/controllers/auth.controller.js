import { generateToken } from "../lib/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password, userName } = req.body;

  try {
    if (!email || !fullName || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const userByEmail = await User.findOne({ email });

    if (userByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userByUserName = await User.findOne({ userName });

    if (userByUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      userName,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "Profile created successfully",
      });
    } else {
      res.status(400).json({ message: "Inavlid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("log out");
};
