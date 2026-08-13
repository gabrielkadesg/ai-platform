# AI Platform - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/gabrielkadesg/ai-platform.git
cd ai-platform

# Copy environment file
cp .env.example .env

# Start services
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migrate

# (Optional) Seed test data
docker-compose exec backend npm run seed
```

### Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

### Test Login (After Seeding)

- Email: `test@example.com`
- Password: `password` (default seeded password)

### Useful Commands

```bash
# View logs
docker-compose logs -f backend

# Run migrations
docker-compose exec backend npm run migrate

# Access database
docker-compose exec postgres psql -U ai_user -d ai_platform

# Stop services
docker-compose down

# Reset everything
docker-compose down -v && docker-compose up -d
```

## 🔧 Configuration

Edit `.env` file to configure:

- `OPENAI_API_KEY` - Your OpenAI API key
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `DATABASE_*` - Database credentials
- `JWT_SECRET` - Secret for JWT tokens

## 📚 Documentation

- **Architecture**: See `ARCHITECTURE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Contributing**: See `CONTRIBUTING.md`
- **Backend**: See `backend/README.md`
- **Frontend**: See `frontend/README.md`

## 🐛 Troubleshooting

### Port already in use

```bash
# Change port in .env
BACKEND_PORT=5001
FRONTEND_PORT=3001
```

### Database connection error

```bash
# Check if postgres is running
docker-compose ps

# Restart postgres
docker-compose restart postgres
```

### Cannot find module

```bash
# Reinstall dependencies
docker-compose exec backend npm install
```

## 🎯 Next Steps

1. **Add AI API Keys** - Get keys from OpenAI and Anthropic
2. **Customize UI** - Edit components in `frontend/components/`
3. **Add Features** - Create new routes and services
4. **Deploy** - Follow `DEPLOYMENT.md` guide

## 📞 Support

- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Documentation: Check README files

## 📄 License

MIT License - See LICENSE file
