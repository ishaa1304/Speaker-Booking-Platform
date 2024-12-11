

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Speaker from '../models/speaker.js';

const router = express.Router();

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Role Middleware
const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.userType)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

// Signup Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, userType, pricePerSession, bio } = req.body;

  if (!userType) {
    return res.status(400).json({ error: 'User type is required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    const existingSpeaker = await Speaker.findOne({ email });

    if (existingUser || existingSpeaker) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      isVerified: true,
    };

    if (userType === 'speaker') {
      const speaker = new Speaker({
        ...userData,
        pricePerSession,
        bio,
      });
      await speaker.save();
      return res.status(201).json({ message: 'Speaker created successfully.' });
    } else {
      const user = new User(userData);
      await user.save();
      return res.status(201).json({ message: 'User created successfully.' });
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in User model first
    let user = await User.findOne({ email });

    // If not found, check Speaker model
    if (!user) {
      user = await Speaker.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        userType: user.userType 
      },
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: error.message });
  }
});


router.get('/dashboard', verifyToken, authorizeRole(['user', 'speaker']), (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.userType}!` });
});

// Profile Route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      const speaker = await Speaker.findById(req.user.id).select('-password');
      if (!speaker) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(speaker);
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;