# Hostinger Deployment Guide

This guide is split into two parts:
- **Part A — Initial Setup** (one-time, done by the deployer)
- **Part B — Auto-Deploy Setup** (one-time webhook config so every GitHub push auto-deploys)

After both parts are done, updating the site = just `git push`. Nothing else.

---

## Requirements

- Hostinger plan that supports **Node.js** (Business Shared or VPS)
- A **Groq API key** — get one free at https://console.groq.com/keys
- The GitHub repository must be **public** (or connected via GitHub OAuth in hPanel)

---

## Part A — Initial Setup (One-time)

### Step 1 — Upload Project via hPanel Git

1. Log in to **hPanel** → go to **Advanced → Git**
2. Click **Create** or **Connect Repository**
3. Fill in:
   - **Repository URL:** your GitHub repo URL (e.g. `https://github.com/yourname/your-repo`)
   - **Branch:** `master`
   - **Clone Directory:** the folder assigned to your domain (e.g. `public_nodejs` or your app root)
4. Click **Create** — hPanel will clone the repo to the server

> `.env` and `node_modules/` are already in `.gitignore` so they will not be cloned. That is correct.

---

### Step 2 — Set Up Node.js App

1. In hPanel, go to **Advanced → Node.js**
2. Click **Create Application**
3. Fill in:
   - **Node.js version:** `18.x` or higher
   - **Application mode:** `Production`
   - **Application root:** same folder from Step 1 (e.g. `public_nodejs`)
   - **Application URL:** your domain
   - **Application startup file:** `server.js`
4. Click **Create**

---

### Step 3 — Set Environment Variables

> Never upload your `.env` file. Set variables through hPanel instead.

1. In the Node.js app panel, find **Environment Variables**
2. Add this variable:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | your actual Groq API key from https://console.groq.com/keys |

3. Click **Save**

---

### Step 4 — Install Dependencies

1. In the Node.js app panel, click **Run NPM command**
2. Type `install` and run it
3. Wait for it to complete (installs `express`, `cors`, `dotenv`, `groq-sdk`)

---

### Step 5 — Start the App

1. In the Node.js app panel, click **Run NPM command**
2. Type `start` and run it — OR simply click the **Start** button in the panel

---

### Step 6 — Verify the App is Running

Open your browser and visit:

```
https://yourdomain.com/api/health
```

Expected response:

```json
{ "status": "ok", "model": "llama-3.3-70b-versatile", "docs": 12 }
```

If you see this, the app is live. Now proceed to Part B to enable auto-deployment.

---

## Part B — Auto-Deploy Setup (One-time)

This enables automatic deployment every time someone pushes to GitHub. No manual steps needed after this.

### Step 1 — Get the Webhook URL from hPanel

1. In hPanel, go to **Advanced → Git**
2. Find your connected repository
3. Look for a **Webhook URL** or **Auto-deployment URL** — copy it

> It will look something like: `https://api.hostinger.com/v1/git/deploy/xxxxxxxxxxxx`

---

### Step 2 — Add the Webhook to GitHub

1. Go to your GitHub repository
2. Click **Settings** (top menu of the repo)
3. In the left sidebar, click **Webhooks**
4. Click **Add webhook**
5. Fill in:
   - **Payload URL:** paste the webhook URL from hPanel
   - **Content type:** `application/json`
   - **Which events:** select `Just the push event`
   - **Active:** checked
6. Click **Add webhook**

GitHub will send a test ping — a green checkmark means it is working.

---

### Step 3 — Confirm Auto-Deploy Works

1. Make any small change in the project (e.g. fix a typo in `index.html`)
2. Push to GitHub:
   ```
   git add .
   git commit -m "test: verify auto-deploy"
   git push
   ```
3. Wait 15–30 seconds
4. Visit `https://yourdomain.com/api/health` — the app should reflect the change

> If the Node.js app needs a restart after pull, go to hPanel → Node.js → click **Restart**. Some Hostinger plans restart automatically; others require a manual restart once.

---

## Day-to-Day Workflow (After Setup)

```
make changes locally → git push → site updates automatically
```

That is it. No hPanel login needed.

---

## Project Structure (What Gets Deployed)

```
/
├── index.html          — Main portfolio page
├── server.js           — Express server (entry point)
├── knowledge.js        — AI chatbot knowledge base
├── package.json        — Dependencies and scripts
├── css/                — Stylesheets
├── js/                 — Frontend scripts
├── images/             — Images and PDFs
└── fonts/              — Icon fonts
```

Files excluded from deployment (via `.gitignore`):
- `node_modules/` — reinstalled via `npm install` on the server
- `.env` — set via hPanel Environment Variables
- `.git/` — not needed on the server

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| App not starting | Check Node.js version is 18+ in hPanel Node.js panel |
| Chatbot returns 503 | `GROQ_API_KEY` is missing — re-check Step 3 of Part A |
| Site shows blank page | Check that Application root points to the correct folder containing `index.html` |
| `/api/health` returns 404 | App is not running — go to hPanel Node.js panel and click Restart |
| Port error in logs | Hostinger sets PORT automatically via env — this app already uses `process.env.PORT` |
| Webhook not triggering | In GitHub → Settings → Webhooks, check the delivery log for errors |
| Push deployed but old content shows | hPanel Node.js app needs a manual Restart — do it once from the panel |
