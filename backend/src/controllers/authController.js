const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const setAuthCookie = require('../utils/setAuthCookie');

const isProd = process.env.NODE_ENV === 'production';

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    return res.status(201).json({
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return res.json({
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    return next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd
  });
  return res.json({ message: 'Logged out' });
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('_id email');
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    return res.json({ user: { id: user._id, email: user.email } });
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, login, logout, me };
