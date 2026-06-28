# Hostinger Auto-Deploy Guide (GitHub → Server)

**Goal:** After this one-time setup, updating the live site = just `git push`. Nothing else. No hPanel login, no file upload, no server commands.

---

## ⚠️ Read this first — the honest truth

There is **no system** where the server updates from GitHub *without ever* touching the server once.
GitHub does not know about your server until you connect them **one time**.

So the deal is:

1. **One-time setup** (below) — done once in hPanel + GitHub. ~5 minutes.
2. **Forever after** — you only run `git push`. The server pulls, installs, and restarts on its own.

That one-time step is unavoidable for *any* hosting provider. But you only do it **once**.

---

## Method used here: Hostinger native Git Auto-Deployment

```
git push  →  GitHub fires a webhook  →  Hostinger pulls the repo  →  npm install + restart  →  site updated
```

No passwords or FTP keys stored anywhere. The server does all the work.

---

## Requirements

- A Hostinger plan that supports **Node.js** (Business Shared or VPS)
- A **Groq API key** — free at https://console.groq.com/keys
- This repo on GitHub (already done): `https://github.com/Md-Emon-Hasan/My-Resume`

---

# PART A — Initial Setup (one-time)

### Step 1 — Connect the repo in hPanel

1. Log in to **hPanel** → **Advanced → Git**
2. Click **Create / Connect Repository**
3. Fill in:
   - **Repository:** `https://github.com/Md-Emon-Hasan/My-Resume`
   - **Branch:** `master`
   - **Directory:** your app folder (e.g. `public_nodejs`)
4. Click **Create** — Hostinger clones the repo.

> `.env` and `node_modules/` are in `.gitignore`, so they are **not** cloned. That is correct and intended.

### Step 2 — Create the Node.js app

1. hPanel → **Advanced → Node.js** → **Create Application**
2. Settings:
   - **Node.js version:** `18.x` or higher
   - **Application mode:** `Production`
   - **Application root:** same folder as Step 1 (e.g. `public_nodejs`)
   - **Application URL:** your domain
   - **Startup file:** `server.js`
3. Click **Create**

### Step 3 — Set the environment variable

> Never push or upload `.env`. Set the key through hPanel instead.

1. In the Node.js app panel → **Environment Variables**
2. Add:

   | Key | Value |
   |-----|-------|
   | `GROQ_API_KEY` | your real Groq API key |

3. **Save**

### Step 4 — Install dependencies & start

1. Node.js panel → **Run NPM command** → type `install` → run
2. Then click **Start** (or run the `start` command)

### Step 5 — Verify it's live

Open: `https://yourdomain.com/api/health`

Expected:

```json
{ "status": "ok", "model": "llama-3.3-70b-versatile", "docs": 12 }
```

If you see this, Part A is done. Now do Part B to make it auto-update.

---

# PART B — Turn on Auto-Deploy (one-time, the important part)

This is the step that makes `git push` enough.

### Step 1 — Get the webhook URL from Hostinger

1. hPanel → **Advanced → Git**
2. Find your connected repo
3. Look for **Auto-Deployment** — turn it **ON**
4. Copy the **Webhook URL** it shows

> It looks like: `https://webhooks.hostinger.com/deploy/xxxxxxxxxxxxxxxx`

### Step 2 — Paste the webhook into GitHub

1. Go to: https://github.com/Md-Emon-Hasan/My-Resume/settings/hooks
2. Click **Add webhook**
3. Fill in:
   - **Payload URL:** the URL you copied from hPanel
   - **Content type:** `application/json`
   - **Which events:** **Just the push event**
   - **Active:** ✅ checked
4. Click **Add webhook**

GitHub sends a test ping → a **green ✓** next to the webhook = it works.

### Step 3 — Prove it works

```powershell
git commit --allow-empty -m "test: verify auto-deploy"
git push
```

Wait ~30 seconds, then reload your site. The change should appear automatically.

> **If the page shows old content after a push:** some Hostinger plans need the Node app restarted once. hPanel → Node.js → **Restart**. Many plans restart automatically — check yours once; after that it's hands-free.

---

## ✅ Day-to-day workflow (after setup)

```
edit files locally  →  git add . && git commit -m "..."  →  git push   →  site updates itself
```

That's the whole thing. You never log into hPanel again for normal updates.

> Remember: when resume info changes, update **both** `index.html` (the website) and `knowledge.js` (the chatbot's knowledge), then push.

---

## What gets deployed

```
/
├── index.html      — portfolio page
├── server.js       — Express server (startup file)
├── knowledge.js    — chatbot knowledge base
├── package.json    — dependencies & scripts
├── css/ js/ images/ fonts/
```

Excluded via `.gitignore` (correct):
- `node_modules/` — reinstalled by `npm install` on the server
- `.env` — set via hPanel Environment Variables
- `.git/` — not needed at runtime

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Push didn't update the site | GitHub → Settings → Webhooks → check the delivery log for a red ✗; re-check the URL |
| Webhook ✓ but old content shows | hPanel → Node.js → **Restart** once |
| Chatbot returns 503 | `GROQ_API_KEY` missing — re-do Part A, Step 3 |
| `/api/health` returns 404 | App not running — hPanel → Node.js → **Restart** |
| App won't start | Confirm Node.js version is 18+ in the Node.js panel |
| Blank page | Application root must point to the folder that contains `index.html` |

---

## Can I do this with ZERO server access?

**No.** The one-time connection in Part A & B *must* be done in hPanel once — there is no way around it for any host. But once it's done, you genuinely never touch the server again: every future update is just `git push`.
