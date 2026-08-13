export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  theme: 'light' | 'dark'
  language: string
  role: 'user' | 'admin'
}

export interface Conversation {
  id: string
  user_id: string
  title: string
  model: string
  project_id?: string
  system_prompt?: string
  temperature?: number
  is_pinned: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  tokens_used?: number
  model?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Memory {
  id: string
  user_id: string
  content: string
  category?: string
  is_active: boolean
  created_at: string
  updated_at: string
}
