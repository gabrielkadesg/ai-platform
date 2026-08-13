# 🏗️ Arquitetura - AI Platform

## Visão Geral

A AI Platform é uma arquitetura moderna de **three-tier** com separação clara entre Frontend, Backend e Database.

## Camadas

### 1️⃣ Frontend Layer (Next.js)

```
┌─────────────────────────────────────┐
│     Browser / Mobile Client         │
├─────────────────────────────────────┤
│   React 18 + Next.js 14             │
│   - App Router                      │
│   - Client & Server Components      │
│   - Streaming Chat (SSE)            │
├─────────────────────────────────────┤
│   State Management                  │
│   - Zustand (Auth, Chat)            │
│   - React Query (Data Fetching)     │
├─────────────────────────────────────┤
│   Tailwind CSS                      │
│   - Dark Mode Support               │
│   - Responsive Design               │
└─────────────────────────────────────┘
```

**Responsabilidades:**
- UI/UX rendering
- User input handling
- Real-time chat updates
- State management
- Authentication token storage

### 2️⃣ Backend Layer (Express + Node.js)

```
┌─────────────────────────────────────┐
│   Express.js REST API               │
├─────────────────────────────────────┤
│   Middleware Stack                  │
│   - Authentication (JWT)            │
│   - Rate Limiting                   │
│   - CORS                            │
│   - Error Handling                  │
├─────────────────────────────────────┤
│   Routes                            │
│   - /api/auth                       │
│   - /api/chat                       │
│   - /api/files                      │
│   - /api/profile                    │
│   - /api/admin                      │
├─────────────────────────────────────┤
│   Services Layer                    │
│   - User Service                    │
│   - Chat Service                    │
│   - Message Service                 │
│   - AI Provider Integration         │
├─────────────────────────────────────┤
│   AI Providers                      │
│   - OpenAI (GPT-4, GPT-3.5)         │
│   - Anthropic (Claude)              │
│   - Google Gemini (prepared)        │
└─────────────────────────────────────┘
```

**Responsabilidades:**
- API endpoint serving
- Business logic
- Authentication/Authorization
- AI provider orchestration
- Database operations
- File handling
- Rate limiting & security

### 3️⃣ Database Layer (PostgreSQL)

```
┌──────────────────────────────────────────┐
│         PostgreSQL Database              │
├──────────────────────────────────────────┤
│   Core Tables                            │
│   ├─ users                               │
│   ├─ conversations                       │
│   ├─ messages                            │
│   ├─ attachments                         │
│   ├─ projects                            │
│   ├─ memories                            │
│   ├─ models                              │
│   ├─ api_usage                           │
│   └─ subscriptions                       │
├──────────────────────────────────────────┤
│   Indexes                                │
│   - Email (users)                        │
│   - User ID (conversations, messages)    │
│   - Timestamps (for sorting)             │
│   - Full-text search (prepared)          │
├──────────────────────────────────────────┤
│   Extensions                             │
│   - uuid-ossp (UUID generation)          │
│   - pg_trgm (Full-text search)           │
└──────────────────────────────────────────┘
```

## Fluxos de Dados

### 1. Autenticação

```
Client (Login Form)
    ↓
[POST /api/auth/login]
    ↓
Backend (Validate credentials)
    ↓ Generate JWT Token
[Return token + user data]
    ↓
Client (Store in localStorage)
    ↓
[Add token to API requests]
```

### 2. Chat Request

```
Client (User types message)
    ↓
[POST /api/chat/conversations/:id/messages]
    ↓
Backend (Save user message)
    ↓
[Call AI Provider]
    ↓
AI Provider (OpenAI/Claude/Gemini)
    ↓ Stream response
[SSE - Send chunks to client]
    ↓
Backend (Save assistant message)
    ↓
Client (Render streamed response)
```

### 3. File Upload

```
Client (Select file)
    ↓
[POST /api/files/upload (multipart)]
    ↓
Backend (Validate & save file)
    ↓ Store path in database
[Return file metadata]
    ↓
Client (Associate with message)
```

## Security Architecture

### Authentication
- **JWT Tokens** with configurable expiration
- **Refresh Tokens** for session renewal
- **HTTP-only cookies** (prepared for enhancement)
- **bcrypt** password hashing (rounds: 10)

### Authorization
- **Role-based access control** (user, admin)
- **User isolation** (can only access own data)
- **Admin endpoints** protected by role check

### Rate Limiting
- **General endpoints**: 100 requests / 15 minutes
- **AI endpoints**: 20 requests / hour
- **Auth endpoints**: 5 attempts / 15 minutes

### Input Validation
- **Joi schemas** for all endpoints
- **Type checking** with TypeScript
- **Sanitization** of file uploads

### Data Protection
- **HTTPS ready** (configured via environment)
- **CORS** white-listed by origin
- **API keys** stored in environment variables
- **Helmet.js** for security headers

## Scalability Considerations

### Current Design
- **Stateless backend** - can be load-balanced
- **Database connection pooling** - pg-pool (max 20 connections)
- **Streaming responses** - reduces memory usage

### Future Enhancements
- **Redis caching** for frequently accessed data
- **Message queue** (Bull/BullMQ) for async tasks
- **CDN** for static assets and file serving
- **Horizontal scaling** with load balancer
- **Database replication** for high availability

## Error Handling

```typescript
AppError (Base)
├── ValidationError (400)
├── AuthenticationError (401)
├── AuthorizationError (403)
├── NotFoundError (404)
├── ConflictError (409)
└── Default (500)
```

## Logging

- **Winston logger** with multiple transports
- **Console output** (development)
- **File output** (error.log, combined.log)
- **Structured logging** (JSON format)

## Deployment

See `DEPLOYMENT.md` for production deployment details.

## Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|----------|
| Frontend | Next.js 14, React 18, Tailwind | UI/UX |
| State | Zustand, React Query | State & Data |
| API Client | Axios | HTTP requests |
| Backend | Express.js, TypeScript | API Server |
| Database | PostgreSQL | Data storage |
| Auth | JWT, bcryptjs | Security |
| Validation | Joi | Input validation |
| AI | OpenAI, Anthropic | LLM providers |
| Hosting | Docker, Docker Compose | Containerization |

## Development Workflow

1. **Frontend development** happens in `/frontend` with hot reload
2. **Backend development** happens in `/backend` with ts-node-dev
3. **Database migrations** are in `/database/migrations`
4. **Shared types** are in `/frontend/types` and `/backend/src/types`

## Performance Optimizations

- **Code splitting** in Next.js
- **Image optimization** with next/image
- **Database query optimization** with indexes
- **Connection pooling** for database
- **Rate limiting** to prevent abuse
- **Streaming responses** for chat

## Monitoring & Observability

- **Winston logging** for application events
- **HTTP request logging** with Morgan
- **Error tracking** with stack traces
- **Admin dashboard** (prepared) for statistics

## API Response Format

```json
{
  "success": true,
  "data": { },
  "error": null
}
```

Or on error:

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
