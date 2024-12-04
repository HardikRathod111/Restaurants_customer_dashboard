const User = require('../models/CustomerMOdel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your_jwt_secret'; 
const userSignup = async (req, res) => {
  const { name, phone } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User with this phone number already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      phone,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id, phone: newUser.phone },
      JWT_SECRET,
      { expiresIn: '1h' }  // Token expiration (optional)
    );

    res.status(201).json({
      message: "User signed up successfully",
      user: newUser,
      token: token  // Return the token to the client
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({
      message: "Error signing up user",
      error: error.message,
    });
  }
};    

  const getUser = async (req , res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('name phone');  // Find user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
  }

module.exports = {userSignup , getUser}