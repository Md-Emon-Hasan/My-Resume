# Vercel-এ Deploy করার সম্পূর্ণ গাইড

এই project-এ দুটো অংশ আছে:
- **Frontend** — `index.html`, CSS, JS, Images (static files)
- **Backend** — Python Flask AI chatbot (`api/index.py`)

দুটোই একই GitHub repo থেকে Vercel-এ deploy হবে।

---

## ধাপ ১ — Groq API Key নাও (AI chatbot-এর জন্য)

> ইতোমধ্যে থাকলে এই ধাপ skip করো।

1. যাও: **https://console.groq.com/keys**
2. Google বা GitHub দিয়ে Sign up করো (সম্পূর্ণ free)
3. **"Create API Key"** বাটনে click করো
4. Key-টা copy করে কোথাও রেখে দাও — পরে লাগবে

---

## ধাপ ২ — GitHub-এ Code Push করো

> ইতোমধ্যে push করা থাকলে এই ধাপ skip করো।

Terminal/PowerShell খুলে project folder-এ যাও, তারপর:

```bash
git add .
git commit -m "initial commit"
git push origin master
```

GitHub-এ repo না থাকলে:
1. যাও: **https://github.com/new**
2. Repository name দাও (যেমন: `My-Resume`)
3. **Public** রাখো, তারপর **Create repository**
4. GitHub-এ যে commands দেখাবে সেগুলো run করো

---

## ধাপ ৩ — Vercel Account তৈরি করো

1. যাও: **https://vercel.com**
2. উপরে-ডানে **"Sign Up"** এ click করো
3. **"Continue with GitHub"** select করো
4. GitHub account দিয়ে login করো এবং Vercel-কে permission দাও

---

## ধাপ ৪ — Project Import করো Vercel-এ

1. Vercel dashboard-এ যাওয়ার পর **"Add New..."** বাটনে click করো
2. **"Project"** select করো
3. বাম দিকে তোমার GitHub repositories দেখবে
4. **`My-Resume`** repository-টা খোঁজো, পাশে **"Import"** বাটনে click করো

   > যদি repo না দেখাও: **"Adjust GitHub App Permissions"** এ click করে repository access দাও

5. **Configure Project** পেজে:
   - Framework Preset: **Other** (অথবা যা auto-detect করে রাখো)
   - Root Directory: **ফাঁকা রাখো** (change করো না)
   - Build Command: **ফাঁকা রাখো**
   - Output Directory: **ফাঁকা রাখো**

6. **"Deploy"** বাটনে click করো

Vercel কয়েক মিনিট নেবে build করতে।

---

## ধাপ ৫ — GROQ_API_KEY Environment Variable যোগ করো

Deploy শেষ হলে chatbot কাজ করবে না যতক্ষণ API key না দাও।

1. Vercel dashboard-এ তোমার project-এ যাও
2. উপরে **"Settings"** tab-এ click করো
3. বাম দিকের menu থেকে **"Environment Variables"** select করো
4. নিচের মতো fill করো:

   | Field | Value |
   |-------|-------|
   | Key | `GROQ_API_KEY` |
   | Value | তোমার Groq key paste করো |
   | Environment | Production, Preview, Development সব check করো |

5. **"Save"** বাটনে click করো

---

## ধাপ ৬ — Redeploy করো

Environment variable যোগ করার পর আবার deploy করতে হবে:

1. Vercel project-এ **"Deployments"** tab-এ যাও
2. সবচেয়ে উপরে যে deployment আছে সেটার ডানে **"..."** (তিনটা dot) click করো
3. **"Redeploy"** select করো
4. নতুন popup-এ **"Redeploy"** বাটনে click করো

কয়েক মিনিট অপেক্ষা করো।

---

## ধাপ ৭ — Site Check করো

Deploy সম্পন্ন হলে Vercel একটা URL দেবে, যেমন:
```
https://my-resume-xyz.vercel.app
```

**Check করো:**

1. URL-এ গেলে তোমার portfolio দেখা যাচ্ছে কিনা
2. নিচের health URL-এ যাও (তোমার URL দিয়ে replace করো):
   ```
   https://my-resume-xyz.vercel.app/api/health
   ```
   এরকম response দেখাবে:
   ```json
   {"status": "ok", "model": "llama-3.3-70b-versatile", "docs": 22}
   ```
3. Chatbot button (নিচে-ডানে) click করে একটা question করো

---

## সমস্যা হলে কী করবে

| সমস্যা | সমাধান |
|--------|--------|
| Site দেখাচ্ছে না / "Not Found" | Vercel → Deployments → সর্বশেষ deployment-এ click করে "Redeploy" করো |
| Chatbot কাজ করছে না | Settings → Environment Variables-এ `GROQ_API_KEY` ঠিকমতো আছে কিনা দেখো, তারপর Redeploy করো |
| Build fail হয়েছে | Deployments → failed deployment-এ click করে error log দেখো |
| API key কাজ করছে না | **https://console.groq.com/keys** থেকে নতুন key তৈরি করো |

---

## পরে Code Update করলে কী করবে

Local-এ code change করে push করলেই Vercel automatically redeploy করবে:

```bash
git add .
git commit -m "update resume"
git push origin master
```

আর কিছু করতে হবে না — Vercel নিজেই detect করে deploy করে নেবে।
