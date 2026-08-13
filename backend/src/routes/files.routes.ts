import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { ValidationError } from '../errors/AppError';
import multer from 'multer';
import path from 'path';
import { config } from '../config';
import { generateId } from '../utils/helpers';
import fs from 'fs';

const router = Router();
router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = config.upload.storagePath;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${generateId()}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: config.upload.maxFileSize },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).slice(1).toLowerCase();
    if (config.upload.allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new ValidationError(`File type .${ext} not allowed`));
    }
  },
});

// Upload file
router.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.file) {
      throw new ValidationError('No file uploaded');
    }

    res.json({
      id: generateId(),
      filename: req.file.originalname,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`,
    });
  })
);

export default router;
