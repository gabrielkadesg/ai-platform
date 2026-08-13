export interface User {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  avatar?: string;
  theme: 'light' | 'dark';
  language: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  model: string;
  project_id?: string;
  system_prompt?: string;
  temperature?: number;
  is_pinned: boolean;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  tokens_used?: number;
  model?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Attachment {
  id: string;
  message_id?: string;
  user_id: string;
  filename: string;
  file_type: string;
  size: number;
  storage_path: string;
  created_at: Date;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Memory {
  id: string;
  user_id: string;
  content: string;
  category?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
