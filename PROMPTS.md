#  cf_ai_rolify — Cloudflare AI Internship Copilot

This project is an AI-powered internship helper built entirely on **Cloudflare Workers**, using:

- **Llama 3.3 (Workers AI)** for CV analysis, job matching, and chat
- **Durable Objects** for conversation memory
- **D1** as a database for user/application state
- **KV** for caching CV pipeline results
- **React (optional)** as a simple UI layer

This repository includes all four components required by the Cloudflare AI assignment.

---------------------------------------------------

# Cloudflare AI Assignment Requirements

| Requirement | Implemented | Where |
|------------|-------------|------|
| **LLM** | ✔ Yes | `src/worker/index.js` (Llama 3.3 Workers AI) |
| **Workflow / Coordination** | ✔ Yes | CV pipeline + Durable Object memory |
| **User input via chat or voice** | ✔ Yes | Chat endpoint + optional Whisper route |
| **Memory / State** | ✔ Yes | Durable Objects + D1 + KV |

---

# 📁 Project Structure

cf_ai_rolify/
├── cf_backend/
│   ├── wrangler.toml          # Cloudflare project config
│   ├── schema.sql             # D1 database schema
│   └── src/
│       └── worker/
│           ├── index.js       # Main Worker backend
│           └── ChatDO.js      # Durable Object for chat memory
├── frontend/                  # (Optional) pretty UI
│   └── ...                    # React/Vite code
├── README.md
└── PROMPTS.md                 # AI prompts used for generation

> Only the `cf_backend` folder is required for the assignment.

---

# Getting Started

## 1. Install Wrangler
npm install -g wrangler

## 2. Install dependencies
None required — Workers uses a native runtime.

## 3. Start local dev server
cd cf_backend
wrangler dev

Your Worker will run locally at: [http://localhost:8787](http://localhost:8787)

---

# D1 Database Setup

Create your D1 database:
wrangler d1 create rolify

Apply schema:
wrangler d1 execute rolify --local --file=schema.sql

---

# Durable Object Migration

Add the migration (already included in `wrangler.toml`):
[[migrations]]
tag = "v1"
new_sqlite_classes = ["ChatDO"]

Deploy Durable Objects remotely:
wrangler deploy

---

# 🤖 API Endpoints

**Chat (Llama 3.3)**
`POST /api/chat`

**Reset conversation memory**
`POST /api/chat/reset`

**CV Analysis Pipeline**
`POST /api/cv/pipeline`

**Voice → Text (Whisper)**
`POST /api/voice/transcribe`

---

# 🔧 Tech Stack

- Cloudflare Workers
- Cloudflare D1
- Cloudflare KV
- Cloudflare Durable Objects
- Workers AI (Llama 3.3 + Whisper)
- React (frontend optional)

---

# 📝 Notes

This project was created to complete the **Cloudflare AI Engineer Optional Assignment**.
All work is original, and AI assistance was documented inside `PROMPTS.md`.