-- 009_create_models.sql
CREATE TABLE IF NOT EXISTS models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  provider VARCHAR(50) NOT NULL,
  model_id VARCHAR(255) NOT NULL,
  context_window INTEGER NOT NULL,
  max_tokens INTEGER NOT NULL,
  supports_vision BOOLEAN DEFAULT false,
  supports_tools BOOLEAN DEFAULT false,
  supports_streaming BOOLEAN DEFAULT true,
  pricing_input DECIMAL(10, 6),
  pricing_output DECIMAL(10, 6),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_models_provider ON models(provider);
