import { query, queryOne } from '../config/database';
import { Message } from '../types';
import { generateId, getCurrentTimestamp } from '../utils/helpers';

const TABLE = 'messages';

export const messageService = {
  async create(
    conversationId: string,
    role: 'user' | 'assistant',
    content: string,
    model?: string,
    tokensUsed?: number
  ): Promise<Message> {
    const id = generateId();
    const now = getCurrentTimestamp();

    const [message] = await query<Message>(
      `INSERT INTO ${TABLE} (id, conversation_id, role, content, tokens_used, model, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, conversationId, role, content, tokensUsed || null, model || null, now, now]
    );

    return message;
  },

  async findByConversationId(conversationId: string, limit = 50): Promise<Message[]> {
    return query<Message>(
      `SELECT * FROM ${TABLE} WHERE conversation_id = $1 ORDER BY created_at ASC LIMIT $2`,
      [conversationId, limit]
    );
  },

  async findById(id: string): Promise<Message | null> {
    return queryOne<Message>(
      `SELECT * FROM ${TABLE} WHERE id = $1`,
      [id]
    );
  },
};
