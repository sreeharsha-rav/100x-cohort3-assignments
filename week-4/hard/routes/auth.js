// Authentication routes
const { Router } = require("express");
const User = require("../models/user");
const { registerSchema, loginSchema } = require("../validators/user.validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = Router();

// Register new user
authRouter.post("/register", async (req, res) => {
  try {
    const { email, name, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Login user
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // find user and verify password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(400).json({
      message: e.errors,
    });
  }
});

module.exports = authRouter;
