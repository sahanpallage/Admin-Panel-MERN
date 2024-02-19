import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/signIn", async (req, res) => {
  const { tokenId, username, password } = req.body;
  if (tokenId) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { name, email } = ticket.getPayload();

      let user = await User.findOne({ email });

      if (!user) {
        user = new User({ username: name, email });
        await user.save();
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ token, message: "User Successfully logged in !" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid token" });
    }
  } else if (username && password) {
    try {
      const user = await User.findOne({ username });

      console.log(user);

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

export default router;
