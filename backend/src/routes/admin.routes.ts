import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthorizationError } from '../errors/AppError';
import pool, { query } from '../config/database';

const router = Router();
router.use(authMiddleware);

// Check if user is admin
const isAdmin = (req: AuthRequest, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new AuthorizationError('Admin access required');
  }
  next();
};

// Get statistics
router.get(
  '/stats',
  isAdmin,
  asyncHandler(async (req, res) => {
    const [users] = await Promise.all([
      query('SELECT COUNT(*) as count FROM users'),
    ]);

    res.json({
      totalUsers: users[0].count,
      timestamp: new Date().toISOString(),
    });
  })
);

// Get all users (paginated)
router.get(
  '/users',
  isAdmin,
  asyncHandler(async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const users = await query(
      'SELECT id, email, name, role, is_active, created_at FROM users LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    res.json({ users, page, limit });
  })
);

// Health check
router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const dbHealthy = await pool.query('SELECT NOW()');
    res.json({
      status: dbHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
