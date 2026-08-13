# AI Platform - Backend Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Set up environment
cp ../.env.example .env

# Run migrations
npm run migrate

# (Optional) Seed development data
npm run seed
```

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Type checking
npm run type-check
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh-token` - Refresh JWT token

### Chat
- `GET /api/chat/conversations` - List conversations
- `POST /api/chat/conversations` - Create new conversation
- `GET /api/chat/conversations/:id` - Get specific conversation
- `PUT /api/chat/conversations/:id` - Update conversation
- `DELETE /api/chat/conversations/:id` - Delete conversation
- `GET /api/chat/conversations/:id/messages` - Get messages
- `POST /api/chat/conversations/:id/messages` - Send message
- `POST /api/chat/stream` - Stream response (SSE)

### Files
- `POST /api/files/upload` - Upload file

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Admin
- `GET /api/admin/stats` - Get statistics
- `GET /api/admin/users` - List all users
- `GET /api/admin/health` - Health check

## Environment Variables

```env
NODE_ENV=development
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:3000

DATABASE_URL=postgresql://user:password@localhost:5432/ai_platform

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

## Database Migrations

```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Reset database
npm run migrate:reset
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```bash
Authorization: Bearer <token>
```

## Rate Limiting

- General endpoints: 100 requests per 15 minutes
- AI endpoints: 20 requests per hour
- Auth endpoints: 5 attempts per 15 minutes

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Deployment

See root DEPLOYMENT.md for production deployment instructions.
