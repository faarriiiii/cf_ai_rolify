# cf_ai_rolify

AI-powered internship application assistant on Cloudflare — CV analysis, cover letters, job matching, application tracker, and AI chat assistant.

## Cloudflare Criteria

## Live Demo
https://cf-ai-rolify.pages.dev ( go to get started --> resume analyser --> upload cv pdf )

| Requirement | Implementation |
|---|---|
| LLM | Workers AI — `@cf/meta/llama-3.1-8b-instruct` |
| Workflow / coordination | Multi-route Worker coordinating AI calls across CV, cover letter, jobs, and chat |
| User input via chat | Floating `ChatWidget.jsx` — real-time text chat |
| Memory / state | Durable Objects (`ChatDO`) for chat history + D1 for application tracker + KV binding |

## Quick Start

### 1. Set up D1

```bash
wrangler d1 create rolify
# Paste the returned database_id into wrangler.toml
wrangler d1 execute rolify --file=cf_backend/schema.sql
```

### 2. Set up KV

```bash
wrangler kv:namespace create rolify-kv
# Paste the returned id into wrangler.toml
```

### 3. Run locally

```bash
cd cf_backend
wrangler dev
# Worker → http://localhost:8787
```

```bash
cd frontend
echo "VITE_API_URL=http://localhost:8787" > .env.local
npm install
npm run dev
# Frontend → http://localhost:5173
```

### 4. Deploy

```bash
cd cf_backend
wrangler deploy

cd frontend
npm run build
wrangler pages deploy dist --project-name cf-ai-rolify
```

Set `VITE_API_URL` in your Pages environment variables to your deployed Worker URL.

## File Structure

```
cf_ai_rolify/
├── cf_backend/
│   ├── src/worker/
│   │   ├── index.js      # All API routes (CV, cover letter, jobs, tracker, chat)
│   │   └── ChatDO.js     # Durable Object — persists chat history per session
│   ├── schema.sql        # D1 database schema
│   └── wrangler.toml     # Cloudflare bindings
├── frontend/
│   └── src/
│       ├── utils/api.js              # API helpers → Worker
│       └── components/ChatWidget.jsx # Floating AI chat UI
├── README.md
└── PROMPTS.md
```

## API Routes

| Method | Path | Description |
|---|---|---|
| POST | `/api/cv/analyse` | Analyse CV (file upload or JSON) |
| POST | `/api/coverletter/generate` | Generate personalised cover letter |
| POST | `/api/jobs/match` | Match CV to 5 internship roles |
| GET | `/api/tracker` | List applications |
| POST | `/api/tracker` | Add application |
| PATCH | `/api/tracker/:id/status` | Update status |
| DELETE | `/api/tracker/:id` | Delete application |
| POST | `/api/chat` | Chat with Rolify AI (session memory) |
| GET | `/api/chat/history` | Get chat history |
| POST | `/api/chat/reset` | Clear chat history |
