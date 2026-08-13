import { query, queryOne, execute } from '../config/database';
import { Conversation } from '../types';
import { generateId, getCurrentTimestamp } from '../utils/helpers';

const TABLE = 'conversations';

export const conversationService = {
  async create(
    userId: string,
    title: string,
    model: string,
    projectId?: string
  ): Promise<Conversation> {
    const id = generateId();
    const now = getCurrentTimestamp();

    const [conversation] = await query<Conversation>(
      `INSERT INTO ${TABLE} (id, user_id, title, model, project_id, is_pinned, is_archived, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, userId, title, model, projectId || null, false, false, now, now]
    );

    return conversation;
  },

  async findById(id: string, userId: string): Promise<Conversation | null> {
    return queryOne<Conversation>(
      `SELECT * FROM ${TABLE} WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
  },

  async findByUserId(userId: string, limit = 50, offset = 0): Promise<Conversation[]> {
    return query<Conversation>(
      `SELECT * FROM ${TABLE} WHERE user_id = $1 ORDER BY updated_at DESC LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
  },

  async update(id: string, userId: string, data: Partial<Conversation>): Promise<Conversation> {
    const now = getCurrentTimestamp();
    const fields = Object.keys(data)
      .filter((key) => data[key as keyof Partial<Conversation>] !== undefined)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = Object.values(data).filter((val) => val !== undefined);
    values.push(now);
    values.push(id);
    values.push(userId);

    const [conversation] = await query<Conversation>(
      `UPDATE ${TABLE} SET ${fields}, updated_at = $${values.length - 2} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`,
      values
    );

    return conversation;
  },

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await execute(
      `DELETE FROM ${TABLE} WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    return result > 0;
  },
};
