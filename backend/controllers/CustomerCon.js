const User = require('../models/CustomerMOdel');

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
  
      res.status(201).json({
        message: "User signed up successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error during user signup:", error);  // Log the full error
      res.status(500).json({
        message: "Error signing up user",
        error: error.message,
      });
    }
  };
    

module.exports = {userSignup}