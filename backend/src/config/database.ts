import { Pool } from 'pg';
import { config } from './index';
import logger from '../utils/logger';

const pool = new Pool({
  connectionString: config.database.url,
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
  logger.debug('Database connection established');
});

export default pool;

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug(`Query executed in ${duration}ms`, { query: text });
    return res.rows;
  } catch (error) {
    logger.error('Database query error', error);
    throw error;
  }
}

export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function execute(
  text: string,
  params?: any[]
): Promise<number> {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug(`Query executed in ${duration}ms`, { query: text });
    return res.rowCount || 0;
  } catch (error) {
    logger.error('Database execute error', error);
    throw error;
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
  logger.info('Database connection pool closed');
}
