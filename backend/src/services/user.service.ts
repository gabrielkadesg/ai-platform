import { query, queryOne, execute } from '../config/database';
import { User } from '../types';
import { generateId, getCurrentTimestamp } from '../utils/helpers';
import { hashPassword, comparePassword } from '../utils/auth';

const TABLE = 'users';

export const userService = {
  async create(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
    const id = generateId();
    const password_hash = await hashPassword(password);
    const now = getCurrentTimestamp();

    const [user] = await query<User>(
      `INSERT INTO ${TABLE} (id, email, name, password_hash, theme, language, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [id, email, name, password_hash, 'dark', 'pt-BR', 'user', true, now, now]
    );

    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    return queryOne<User>(
      `SELECT * FROM ${TABLE} WHERE email = $1`,
      [email.toLowerCase()]
    );
  },

  async findById(id: string): Promise<User | null> {
    return queryOne<User>(
      `SELECT * FROM ${TABLE} WHERE id = $1`,
      [id]
    );
  },

  async update(id: string, data: Partial<User>): Promise<User> {
    const now = getCurrentTimestamp();
    const fields = Object.keys(data)
      .filter((key) => data[key as keyof Partial<User>] !== undefined)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = Object.values(data).filter((val) => val !== undefined);
    values.push(now);
    values.push(id);

    const [user] = await query<User>(
      `UPDATE ${TABLE} SET ${fields}, updated_at = $${values.length - 1} WHERE id = $${values.length} RETURNING *`,
      values
    );

    return user;
  },

  async delete(id: string): Promise<boolean> {
    const result = await execute(
      `DELETE FROM ${TABLE} WHERE id = $1`,
      [id]
    );
    return result > 0;
  },

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return comparePassword(password, user.password_hash);
  },
};
