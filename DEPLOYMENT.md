# Deploying to Vercel — Step-by-Step Guide

This portfolio uses a **static frontend** (HTML/CSS/JS) served by Vercel and a **Python AI backend** deployed as a Vercel serverless function. Both live in the same repository.

---

## Prerequisites

| Tool | Install |
|------|---------|
| Node.js 18+ | https://nodejs.org |
| Vercel CLI | `npm install -g vercel` |
| Git | https://git-scm.com |
| Groq API Key | https://console.groq.com/keys (free) |

---

## Step 1 — Get a Groq API Key

1. Go to **https://console.groq.com/keys**
2. Sign up or log in (free account)
3. Click **Create API Key**
4. Copy the key — you will add it to Vercel in Step 4

---

## Step 2 — Push Project to GitHub

```bash
# From your project root
git add .
git commit -m "add AI chatbot backend"
git push origin master
```

If you haven't set up GitHub yet:

1. Create a new **public** repository at https://github.com/new
2. Follow GitHub's instructions to push your local repo

---

## Step 3 — Import Project on Vercel

1. Go to **https://vercel.com** → Log in (use GitHub account)
2. Click **Add New → Project**
3. Select your GitHub repository
4. Vercel auto-detects the project — **leave all settings as default**
5. Click **Deploy**

The first deploy will succeed for the static frontend. The chatbot backend needs the API key (Step 4).

---

## Step 4 — Add the Groq API Key as an Environment Variable

1. In your Vercel project dashboard, go to **Settings → Environment Variables**
2. Click **Add**:
   - **Name**: `GROQ_API_KEY`
   - **Value**: paste your Groq key
   - **Environments**: check Production, Preview, Development
3. Click **Save**
4. Go to **Deployments** → click the latest → click **Redeploy**

The chatbot will now work on your live site.

---

## Step 5 — Verify

After redeployment, open your live URL and:

- Click the **AI chat button** (bottom-right)
- Ask a question like "What are Imon's top skills?"
- You should get a response within a few seconds

Check the health endpoint:
```
https://your-site.vercel.app/api/health
```
Expected response: `{"status": "ok", "model": "llama-3.3-70b-versatile", "docs": 22}`

---

## Local Development

Run the backend locally before deploying:

```powershell
# Windows PowerShell
$env:GROQ_API_KEY = "your_key_here"

# Install dependencies
pip install -r requirements.txt

# Start the server
python run.py
```

The API runs on **http://localhost:5000**. Open `index.html` in a browser — the chatbot auto-detects localhost and connects to the local server.

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
│   ├── knowledge.py      ← Portfolio knowledge base (edit to update AI knowledge)
│   ├── rag.py            ← BM25 retrieval engine
│   └── chat.py           ← LangChain + Groq ChatEngine
├── css/
├── js/
├── images/
├── index.html
├── run.py                ← Local dev server runner
├── vercel.json           ← Vercel routing config
└── requirements.txt      ← Python dependencies
```

---

## Customising the AI Assistant

### Update AI knowledge
Edit `backend/knowledge.py` — add, edit, or remove strings in `PORTFOLIO_DOCS`.

### Change AI personality / tone
Edit the `SYSTEM_PROMPT` string in `backend/config.py`.

### Change the LLM model
In `backend/config.py`:
```python
GROQ_MODEL = "llama-3.3-70b-versatile"  # change to any Groq model
```
Available models: https://console.groq.com/docs/models

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Chatbot says "server not reachable" on localhost | Run `python run.py` and confirm it starts on port 5000 |
| Chatbot says "GROQ_API_KEY not configured" | Add the env variable to Vercel (Step 4) and redeploy |
| 500 error from `/api/health` | Check Vercel function logs: Dashboard → Deployments → Functions |
| Static files (CSS/JS/images) not loading | Ensure all files are committed and pushed to GitHub |
| Python import error on Vercel | Verify `backend/**` is in `vercel.json` `includeFiles` |
