# 🚀 Deployment Guide - AI Platform

## Prerequisites

- Docker & Docker Compose
- Git
- Domain name (for production)
- SSL certificate (for production)
- API keys for AI providers

## Local Development with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset database (careful!)
docker-compose down -v && docker-compose up -d
```

## Production Deployment

### Option 1: VPS (Recommended for control)

#### 1. Server Setup

```bash
# SSH into your VPS
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx (reverse proxy)
sudo apt install nginx -y
```

#### 2. Clone Repository

```bash
cd /opt
sudo git clone https://github.com/gabrielkadesg/ai-platform.git
cd ai-platform
```

#### 3. Setup Environment

```bash
# Copy example env
sudo cp .env.example .env

# Edit with production values
sudo nano .env
```

Essential production env vars:

```env
NODE_ENV=production
BACKEND_PORT=5000
FRONTEND_URL=https://yourdomain.com

DATABASE_URL=postgresql://prod_user:strong_password@postgres:5432/ai_platform_prod
DATABASE_HOST=postgres
DATABASE_USER=prod_user
DATABASE_PASSWORD=strong_password
DATABASE_NAME=ai_platform_prod

JWT_SECRET=your-very-long-random-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-very-long-random-refresh-secret

OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

CORS_ORIGIN=https://yourdomain.com
```

#### 4. Nginx Configuration

Create `/etc/nginx/sites-available/ai-platform`:

```nginx
upstream backend {
    server 127.0.0.1:5000;
}

upstream frontend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/ai-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

#### 6. Start Services

```bash
cd /opt/ai-platform
sudo docker-compose -f docker-compose.yml up -d

# Run migrations
sudo docker-compose exec backend npm run migrate

# Seed initial data
sudo docker-compose exec backend npm run seed
```

#### 7. Verify Deployment

```bash
# Check services
docker-compose ps

# Check backend health
curl https://yourdomain.com/api/health

# Check frontend
curl https://yourdomain.com
```

### Option 2: Cloud Platform (Railway, Render, Vercel)

#### Railway.app (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Railway Project**
   - Go to railway.app
   - Connect GitHub repository
   - Auto-detect services

3. **Configure Environment**
   - Set environment variables in Railway
   - Add PostgreSQL database

4. **Deploy**
   - Railway auto-deploys on push
   - Scales automatically

#### Vercel (Frontend Only)

1. **Deploy Frontend**
   ```bash
   # In frontend directory
   vercel
   ```

2. **Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` in Vercel dashboard

## Production Checklist

- [ ] Strong database password set
- [ ] JWT secrets are long and random (32+ chars)
- [ ] API keys secured in environment variables
- [ ] HTTPS/SSL configured
- [ ] CORS origin set to production domain
- [ ] Database backups scheduled
- [ ] Monitoring/alerting configured
- [ ] Rate limiting tuned
- [ ] Error logging enabled
- [ ] Database migrations tested

## Monitoring

### Docker Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Database Monitoring

```bash
# Connect to database
psql $DATABASE_URL

# Check active connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;

# Check slow queries
SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;
```

## Backups

### Database Backup

```bash
# Backup
docker-compose exec postgres pg_dump -U $DATABASE_USER $DATABASE_NAME > backup.sql

# Restore
cat backup.sql | docker-compose exec -T postgres psql -U $DATABASE_USER $DATABASE_NAME
```

### Automated Backups (Cron)

```bash
# Add to crontab
0 2 * * * cd /opt/ai-platform && docker-compose exec postgres pg_dump -U ai_user ai_platform_prod > /backups/ai-platform-$(date +\%Y-\%m-\%d).sql
```

## Troubleshooting

### Services not starting

```bash
# Check logs
docker-compose logs -f

# Restart services
docker-compose restart

# Full reset (careful!)
docker-compose down && docker-compose up -d
```

### Database connection issues

```bash
# Test connection
docker-compose exec postgres psql -U ai_user -d ai_platform -c "SELECT NOW();"

# Check port mapping
docker-compose port postgres 5432
```

### High memory usage

```bash
# Check resource usage
docker stats

# Restart container
docker-compose restart backend
```

## Performance Tuning

### PostgreSQL

```sql
-- Check index usage
SELECT * FROM pg_stat_user_indexes ORDER BY idx_scan DESC;

-- Analyze table
ANALYZE conversations;

-- Vacuum
VACUUM;
```

### Node.js

```bash
# Set memory limit
NODE_MAX_OLD_SPACE_SIZE=2048 npm start
```

## Security Hardening

1. **Firewall**
   ```bash
   ufw allow 22/tcp
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw enable
   ```

2. **SSH Key Only**
   ```bash
   sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
   systemctl restart sshd
   ```

3. **Fail2ban**
   ```bash
   apt install fail2ban
   systemctl enable fail2ban
   ```

4. **Regular Updates**
   ```bash
   apt install unattended-upgrades
   ```

## Rollback

```bash
# Revert to previous image
git revert HEAD
git push origin main

# Docker will automatically redeploy
```

## Cost Optimization

- Use spot instances if available
- Optimize image sizes
- Clean old logs regularly
- Use CDN for static files
- Monitor API usage

## Support

For issues, check:
- Logs: `docker-compose logs -f`
- GitHub Issues
- Documentation in README.md files
