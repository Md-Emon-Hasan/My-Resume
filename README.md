# Md. Hasan Imon — Portfolio

Personal portfolio website with an AI chatbot assistant powered by **Groq (LLaMA 3.3 70B)** and a BM25 RAG pipeline.

**Live:** [your-site.vercel.app](https://your-site.vercel.app) &nbsp;|&nbsp; **Tech:** HTML · CSS · Vanilla JS · Python · Flask · LangChain · Vercel

---

## Project Structure

```
My-Resume/
├── api/
│   ├── __init__.py
│   └── index.py          ← Vercel serverless entry point (Flask app)
├── backend/
│   ├── __init__.py
│   ├── config.py         ← API key, model, system prompt
│   ├── knowledge.py      ← Portfolio knowledge base (edit to update AI facts)
│   ├── rag.py            ← BM25 retrieval engine
│   └── chat.py           ← LangChain + Groq ChatEngine
├── css/
├── js/
│   └── main.js           ← Frontend + chatbot UI logic
├── images/
├── fonts/
├── index.html            ← Main portfolio page
├── run.py                ← Local dev server
├── requirements.txt      ← Python dependencies
├── vercel.json           ← Vercel routing config
└── DEPLOYMENT.md         ← Full Vercel deployment guide
```

---

## Local Development — Full Setup

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Python | 3.9+ | https://python.org |
| pip | bundled with Python | — |
| Groq API Key | free | https://console.groq.com/keys |

> A browser is all you need for the frontend — no Node.js required locally.

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/Md-Emon-Hasan/My-Resume.git
cd My-Resume
```

---

### Step 2 — Create and activate a virtual environment

**Windows (PowerShell)**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS / Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

> After activation you should see `(venv)` at the start of your terminal prompt.

---

### Step 3 — Install Python dependencies

```bash
pip install -r requirements.txt
```

---

### Step 4 — Get a free Groq API key

1. Go to **https://console.groq.com/keys**
2. Sign up / log in (free)
3. Click **Create API Key** and copy it

---

### Step 5 — Set the API key as an environment variable

**Windows (PowerShell)**
```powershell
$env:GROQ_API_KEY = "your_key_here"
```

**macOS / Linux**
```bash
export GROQ_API_KEY="your_key_here"
```

> This is session-scoped. You need to set it again each time you open a new terminal.
> To persist it, add it to your shell profile (`.bashrc`, `.zshrc`) or a `.env` file
> (the `.env` file is git-ignored — never commit your API key).

---

### Step 6 — Start the backend server

```bash
python run.py
```

Expected output:
```
Starting AI Assistant API on http://localhost:5000
Press Ctrl+C to stop.
```

Verify the server is running:
```
http://localhost:5000/api/health
```
Expected: `{"status": "ok", "model": "llama-3.3-70b-versatile", "docs": 22}`

---

### Step 7 — Open the frontend

Open `index.html` directly in your browser (double-click or drag into Chrome/Firefox).

The JavaScript auto-detects `localhost` and connects to `http://localhost:5000` for the
chatbot. No extra configuration needed.

---

### Running both at once (quick reference)

```powershell
# Windows PowerShell — run in sequence
$env:GROQ_API_KEY = "your_key_here"
.\venv\Scripts\Activate.ps1
python run.py
# Then open index.html in browser
```

```bash
# macOS / Linux
export GROQ_API_KEY="your_key_here"
source venv/bin/activate
python run.py
# Then open index.html in browser
```

---

## Customising the AI Assistant

### Update AI knowledge
Edit `backend/knowledge.py` — add, edit, or remove strings in `PORTFOLIO_DOCS`.
Each string is one knowledge chunk used by the RAG retriever.

### Change AI personality / tone
Edit the `SYSTEM_PROMPT` string in `backend/config.py`.

### Change the LLM model
In `backend/config.py`:
```python
GROQ_MODEL = "llama-3.3-70b-versatile"  # change to any Groq model
```
Available models: https://console.groq.com/docs/models

---

## Deploying to Vercel

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the full step-by-step guide.

Quick summary:
1. Push to GitHub
2. Import project on vercel.com
3. Add `GROQ_API_KEY` in **Settings → Environment Variables**
4. Redeploy

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ModuleNotFoundError` when running `python run.py` | Run `pip install -r requirements.txt` inside the activated venv |
| Chatbot says "server not reachable" | Make sure `python run.py` is running and shows "Starting AI..." |
| `GROQ_API_KEY not set` warning on startup | Set the env variable (Step 5) before running `python run.py` |
| `503` from `/api/chat` | GROQ_API_KEY is missing or invalid — check the key and re-set it |
| Port 5000 already in use | Kill the process using port 5000, or change `PORT` in `backend/config.py` |
| `.\venv\Scripts\Activate.ps1` blocked | Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
