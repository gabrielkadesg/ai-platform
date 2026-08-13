-- Insert available models
INSERT INTO models (name, provider, model_id, context_window, max_tokens, supports_vision, supports_tools, supports_streaming, pricing_input, pricing_output, is_active)
VALUES
  ('GPT-4 Turbo', 'openai', 'gpt-4-turbo', 128000, 4096, true, true, true, 0.01, 0.03),
  ('GPT-4', 'openai', 'gpt-4', 8192, 4096, false, true, true, 0.03, 0.06),
  ('GPT-3.5 Turbo', 'openai', 'gpt-3.5-turbo', 4096, 4096, false, true, true, 0.0005, 0.0015),
  ('Claude 3 Opus', 'anthropic', 'claude-opus-4-1', 200000, 4096, true, true, true, 0.015, 0.075),
  ('Claude 3 Sonnet', 'anthropic', 'claude-sonnet-4', 200000, 4096, true, true, true, 0.003, 0.015),
  ('Claude 3 Haiku', 'anthropic', 'claude-haiku-3', 200000, 4096, true, true, true, 0.00025, 0.00125);
