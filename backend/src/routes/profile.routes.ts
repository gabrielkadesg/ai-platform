import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { userService } from '../services/user.service';

const router = Router();
router.use(authMiddleware);

// Get profile
router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await userService.findById(req.user!.id);
    res.json(user);
  })
);

// Update profile
router.put(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const { name, theme, language } = req.body;
    const user = await userService.update(req.user!.id, { name, theme, language });
    res.json(user);
  })
);

export default router;
