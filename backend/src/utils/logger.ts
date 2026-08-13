import winston from 'winston';
import { config } from '../config';

const logger = winston.createLogger({
  level: config.logging.level,
  format: config.logging.format === 'json' 
    ? winston.format.json()
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
  defaultMeta: { service: 'ai-platform-backend' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
