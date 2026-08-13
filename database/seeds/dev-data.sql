-- Test user for development
INSERT INTO users (email, name, password_hash, theme, language, role, is_active)
VALUES
  ('test@example.com', 'Test User', '$2a$10$YIvxPWGFdAP7.i5zPG8R4.KJKr.pwxX3Tx/AJ/TmQ3Y8MXwHH2iOe', 'dark', 'pt-BR', 'user', true),
  ('admin@example.com', 'Admin User', '$2a$10$YIvxPWGFdAP7.i5zPG8R4.KJKr.pwxX3Tx/AJ/TmQ3Y8MXwHH2iOe', 'dark', 'pt-BR', 'admin', true);

-- Create subscription for test user
INSERT INTO subscriptions (user_id, plan, status, credits, monthly_limit)
SELECT id, 'pro', 'active', 1000, 10000
FROM users
WHERE email = 'test@example.com';
