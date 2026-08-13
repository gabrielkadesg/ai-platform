import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

export const config = {
  // Node
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Server
  port: parseInt(process.env.BACKEND_PORT || '5000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Database
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    name: process.env.DATABASE_NAME || 'ai_platform',
    user: process.env.DATABASE_USER || 'ai_user',
    password: process.env.DATABASE_PASSWORD || 'ai_password',
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  },
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
  
  // AI Providers
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
  },
  
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.ANTHROPIC_MODEL || 'claude-opus-4-1',
  },
  
  google: {
    apiKey: process.env.GOOGLE_AI_API_KEY,
  },
  
  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800', 10),
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'pdf,docx,txt,csv,xlsx,json,md,jpg,jpeg,png,gif,webp').split(','),
    storagePath: process.env.FILE_STORAGE_PATH || './uploads',
  },
  
  // Rate Limiting
  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    aiWindowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS || '3600000', 10),
    aiMaxRequests: parseInt(process.env.AI_RATE_LIMIT_MAX_REQUESTS || '20', 10),
  },
  
  // Features
  features: {
    memory: process.env.ENABLE_MEMORY === 'true',
    projects: process.env.ENABLE_PROJECTS === 'true',
    webSearch: process.env.ENABLE_WEB_SEARCH === 'true',
    imageGeneration: process.env.ENABLE_IMAGE_GENERATION === 'true',
    voice: process.env.ENABLE_VOICE === 'true',
  },
  
  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
  },
};
