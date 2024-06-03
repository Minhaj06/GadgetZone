const User = require("../models/user.js");
const Order = require("../models/order.js");
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    // 1. Destructure name, email, password from req.body
    const { firstName, lastName, email, password } = req.body;

    // 2. All fields require validation
    if (!firstName.trim()) {
      return res.json({ error: "First name is required" });
    }
    if (!lastName.trim()) {
      return res.json({ error: "Last name is required" });
    }
    if (!email.trim()) {
      return res.json({ error: "Email is required" });
    }
    if (!password.trim()) {
      return res.json({ error: "Password is required" });
    }

    // 3. Check if email is taken / Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }

    // 4. Has password
    const hashedPassword = await hashPassword(password);

    // 5. Register user / Save user details
    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    // 6. Create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 7. Send response
    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log("===================================>>>>>>>>>>>>>>>>");
    console.log("===================================>>>>>>>>>>>>>>>>");
    console.log(err);
    console.log("======================================>>>>>>>>>");
    console.log("======================================>>>>>>>>>");
    return res.status(400).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Destructure email, password from req.body
    const { email, password } = req.body;

    // 2. All fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    // 3. Check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // 4. Compare Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    // 5. Create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. Send response
    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// For testing purpose
exports.secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, password, address } = req.body;
    const user = await User.findById(req.user._id);

    // Check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }

    // Hash password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.firstName,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};
