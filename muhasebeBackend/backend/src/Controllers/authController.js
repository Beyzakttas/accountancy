// authController.js

const jwt = require('jsonwebtoken');
const User = require('../Models/User');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Placeholder for password validation logic
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token with role information
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  register: async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      const newUser = new User({ name, email, password, role });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
};