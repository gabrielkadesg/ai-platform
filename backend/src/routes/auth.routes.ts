import { Router } from 'express';
import { validate } from '../middleware/validation';
import { authLimiter, asyncHandler } from '../middleware';
import Joi from 'joi';
import { userService } from '../services/user.service';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth';
import { ConflictError, AuthenticationError } from '../errors/AppError';

const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Register
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('Email already in use');
    }

    const user = await userService.create(email, name, password);
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.status(201).json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  })
);

// Login
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isValid = await userService.verifyPassword(user, password);
    if (!isValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  })
);

// Refresh Token
router.post(
  '/refresh-token',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthenticationError('Refresh token required');
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await userService.findById(decoded.id);

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      success: true,
      token,
    });
  })
);

export default router;
