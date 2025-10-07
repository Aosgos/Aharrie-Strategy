const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper: Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  // 🟢 Create Account
  createAccount: async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
      // Basic validation
      const namePattern = /^[a-zA-Z\s]+$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordPattern = /^.{6,}$/; // At least 6 characters

      if (!namePattern.test(fullName)) {
        return res.status(400).json({ success: false, msg: "Please enter a valid full name" });
      }
      if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, msg: "Enter a valid email address" });
      }
      if (!passwordPattern.test(password)) {
        return res.status(400).json({ success: false, msg: "Password must be at least 6 characters long" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, msg: "Email already registered" });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: role || "user", // defaults to user
      });

      // Generate token
      const token = generateToken(newUser._id, newUser.role);

      return res.status(201).json({
        success: true,
        msg: "Account created successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      });
    } catch (error) {
      console.error("Create Account Error:", error);
      return res.status(500).json({ success: false, msg: "Server error" });
    }
  },

  // 🟢 Login
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, msg: "Enter a valid email address" });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, msg: "Invalid email or password" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, msg: "Invalid email or password" });
      }

      // Generate token
      const token = generateToken(user._id, user.role);

      return res.status(200).json({
        success: true,
        msg: "Login successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ success: false, msg: "Server error" });
    }
  },
};
