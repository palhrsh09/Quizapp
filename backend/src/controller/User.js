const User = require("../model/User");
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken');
require('dotenv').config()

const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all required fields are present
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if the user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Check if the error is due to the unique constraint on email
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Log the error for debugging purposes
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);  // Detailed error logging
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {loginUser,registerUser}