# Hostinger hPanel Deployment Guide

This guide walks through deploying this Node.js portfolio app on Hostinger shared/VPS hosting using hPanel.

---

## Requirements

- Hostinger plan that supports **Node.js** (Business Shared or VPS)
- A **Groq API key** — get one free at https://console.groq.com/keys
- Git access or File Manager access in hPanel

---

## Step 1 — Upload the Project Files

### Option A: Via Git (Recommended)

1. Push your code to GitHub (make sure `.env` and `node_modules/` are NOT committed — they are already in `.gitignore`)
2. In hPanel, go to **Advanced → Git**
3. Connect your GitHub repository
4. Set the branch to `master` (or `main`)
5. Click **Deploy**

### Option B: Via File Manager

1. Delete `node_modules/` from your local machine before zipping
2. Zip the entire project folder
3. In hPanel, go to **Files → File Manager**
4. Upload the zip to `public_nodejs/` (or the folder assigned to your domain)
5. Extract the zip there

---

## Step 2 — Set Up Node.js App in hPanel

1. In hPanel, go to **Advanced → Node.js**
2. Click **Create Application**
3. Fill in:
   - **Node.js version:** `18.x` or higher
   - **Application mode:** `Production`
   - **Application root:** the folder where you uploaded your files (e.g. `public_nodejs`)
   - **Application URL:** your domain
   - **Application startup file:** `server.js`
4. Click **Create**

---

## Step 3 — Set Environment Variables

> **Never upload your `.env` file.** Set variables through hPanel instead.

1. In hPanel Node.js app settings, find **Environment Variables**
2. Add the following variable:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | your actual Groq API key |

3. Save the variables

---

## Step 4 — Install Dependencies

1. In the Node.js app panel, click **Run NPM command**
2. Run: `install`
3. Wait for it to finish (installs `express`, `cors`, `dotenv`, `groq-sdk`)

---

## Step 5 — Build & Start the App

1. In the Node.js app panel, click **Run NPM command**
2. Run: `run build`
3. After it succeeds, click **Run NPM command** again
4. Run: `start`  — OR click the **Start** / **Restart** button in the panel

---

## Step 6 — Verify Deployment

Open your browser and visit:

```
https://yourdomain.com/api/health
```

You should see a JSON response like:

```json
{ "status": "ok", "model": "llama-3.3-70b-versatile", "docs": 12 }
```

If that works, your chatbot is live at `https://yourdomain.com`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build failed | Make sure Node.js version is 18+ in hPanel |
| Chatbot returns 503 | `GROQ_API_KEY` is missing — re-check Step 3 |
| Site shows blank page | Check that Application root points to the correct folder containing `index.html` |
| `/api/health` returns 404 | App is not running — go to hPanel Node.js panel and click Restart |
| Port error in logs | Hostinger sets the PORT automatically via env var — this app already respects `process.env.PORT` |

---

## Project Structure (what gets deployed)

```
/
├── index.html          ← Main portfolio page
├── server.js           ← Express server (entry point)
├── knowledge.js        ← AI chatbot knowledge base
├── package.json        ← Dependencies & scripts
├── css/                ← Stylesheets
├── js/                 ← Frontend scripts
├── images/             ← Images & PDFs
└── fonts/              ← Icon fonts
```

Files that should NOT be uploaded:
- `node_modules/` — installed by `npm install` on the server
- `.env` — set via hPanel Environment Variables instead
- `.git/` — not needed on the server

---

## Updating the Site

After making changes locally:

1. Push to GitHub
2. In hPanel Git panel, click **Pull** (or re-deploy)
3. In hPanel Node.js panel, click **Restart**
