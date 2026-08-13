# AI Platform - Frontend Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Set up environment
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

## Development

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

## Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js app router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected pages
│   └── page.tsx           # Home page
├── components/            # React components
├── store/                 # Zustand stores (state management)
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript types
├── styles/                # Global styles
└── middleware.ts          # Next.js middleware
```

## Key Technologies

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Query** - Data fetching
- **Axios** - HTTP client

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Pages

### Public
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page

### Protected
- `/dashboard` - Main dashboard
- `/chat/[id]` - Chat window

## Components

- `Sidebar` - Navigation and conversation list
- `ChatWindow` - Message display and composer
- `ChatContainer` - Chat layout wrapper

## State Management

Using Zustand for simple, scalable state:

```typescript
// Auth store
const { user, token, logout } = useAuthStore()

// Chat store
const { conversations, currentConversation } = useChatStore()
```

## API Integration

Axios instance with automatic token injection:

```typescript
import api from '@/lib/api'

// Token is automatically added to all requests
const response = await api.get('/chat/conversations')
```

## Styling

Utility classes defined in `styles/globals.css`:

- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input-base` - Form input
- `.card` - Card container

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Linting

```bash
# Run ESLint
npm run lint

# Type checking
npm run type-check
```

## Performance

- Image optimization with `next/image`
- Code splitting with dynamic imports
- Streaming chat responses (SSE)

## Deployment

See root DEPLOYMENT.md for production deployment instructions.
