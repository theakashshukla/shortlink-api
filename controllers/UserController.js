const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv=require('dotenv');
dotenv.config();

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.json({ user });
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeDatabaseError') {
        res.status(400).json({ error: 'User registration failed. Please check your data and try again.' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate a new authentication token
      const authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      // Save the token and expiration date in the user model
      user.authToken = authToken;
      await user.save();

      res.json({ authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async logout(req, res) {
    try {
      const user = req.user; // Assuming you have the user object attached to the request

      // Clear the authentication token in the user model
      user.authToken = null;
      await user.save();

      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
};

module.exports = UserController;
