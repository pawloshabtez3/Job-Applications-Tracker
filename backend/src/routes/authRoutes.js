const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/register',
  [body('email').isEmail().withMessage('Valid email required'), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')],
  validateRequest,
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validateRequest,
  login
);

router.post('/logout', logout);

module.exports = router;
