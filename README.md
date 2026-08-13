# 🚀 AI Platform - Plataforma de IA Completa e Moderna

Uma plataforma profissional de IA com chat em tempo real, múltiplos modelos, gerenciamento de conversas, upload de arquivos, memória de usuário, projetos e muito mais.

## 🎯 Características Principais

### 💬 Chat & Conversas
- ✅ Chat em tempo real com streaming de respostas
- ✅ Múltiplas conversas com histórico completo
- ✅ Renomear, arquivar, fixar e excluir conversas
- ✅ Busca global em histórico
- ✅ Suporte a Markdown com syntax highlighting
- ✅ Copiar, editar e regenerar mensagens

### 🤖 Inteligência Artificial
- ✅ Suporte para múltiplos modelos (OpenAI, Anthropic, etc)
- ✅ Seleção de modelo por conversa
- ✅ Configuração de temperatura e criatividade
- ✅ Streaming de respostas em tempo real
- ✅ Interrupção de geração

### 📁 Gerenciamento de Arquivos
- ✅ Upload de PDF, DOCX, TXT, CSV, imagens, etc
- ✅ Preview de arquivos
- ✅ Análise de conteúdo pela IA
- ✅ Limite de tamanho configurável

### 💾 Memória & Contexto
- ✅ Memória curta (contexto da conversa)
- ✅ Memória longa (preferências persistentes)
- ✅ Tela de gerenciamento de memórias
- ✅ Resumo automático de contexto

### 📊 Projetos & Organização
- ✅ Criar projetos/workspaces
- ✅ Agrupar conversas por projeto
- ✅ Gerenciar arquivos por projeto
- ✅ Instruções personalizadas por projeto

### 👤 Autenticação & Perfil
- ✅ Cadastro e login seguros
- ✅ Recuperação de senha
- ✅ Perfil com foto e preferências
- ✅ Autenticação JWT
- ✅ Preparado para OAuth (Google, GitHub)

### ⚙️ Configurações
- ✅ Tema claro/escuro
- ✅ Personalidade da IA
- ✅ Idioma
- ✅ Privacidade e dados
- ✅ Segurança

### 📱 Responsividade
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile com drawer navigation
- ✅ Touch-friendly

### 🏢 Admin Dashboard
- ✅ Gerenciar usuários
- ✅ Visualizar conversas e uso
- ✅ Monitorar modelos e custos
- ✅ Logs e erros
- ✅ Gráficos de uso

### 🔒 Segurança
- ✅ Autenticação JWT segura
- ✅ Rate limiting
- ✅ Validação de entrada
- ✅ CORS configurado
- ✅ Proteção de API keys
- ✅ Autorização por usuário

---

## 🏗️ Stack Tecnológico

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Query (Data Fetching)

**Backend:**
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT (Autenticação)
- Joi (Validação)

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/gabrielkadesg/ai-platform.git
cd ai-platform

# 2. Instalar dependências
npm install

# 3. Configurar ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 4. Subir banco de dados
docker-compose up -d

# 5. Executar migrations
npm run db:migrate

# 6. Iniciar aplicação
npm run dev
```

### Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📖 Configuração de Provedores de IA

### OpenAI

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

---

## 📄 Licença

MIT License
