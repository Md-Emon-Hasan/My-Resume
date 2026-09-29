# Md. Emon Hasan — Personal Portfolio

Personal portfolio website for **Md. Emon Hasan**, featuring projects, skills, experience, certifications, contact information, and an AI-powered portfolio chatbot.

The site is a static page (`index.html`) served by a small Express server (`server.js`), which also exposes the chatbot API backed by [Groq](https://groq.com/).

## Requirements

- **Node.js 18 or newer** (includes `npm`) — check with `node -v`
- **Git** (to clone the repository)
- A **Groq API key** for the chatbot — free at [Groq Console](https://console.groq.com/keys)

## Run locally

### 1. Clone the repository

```bash
git clone <repository-url> My-Resume
cd My-Resume
```

If you already have the folder, just open a terminal inside it.

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Copy the example file:

```powershell
# Windows (PowerShell)
Copy-Item .env.example .env
```

```bash
# macOS / Linux / Git Bash
cp .env.example .env
```

Then open `.env` and set your Groq API key:

```env
GROQ_API_KEY=gsk_your_real_key_here
```

> `.env` is listed in `.gitignore` — never commit your real key.

### 4. Start the server

```bash
npm start
```

You should see:

```text
Server running on http://localhost:8080
Press Ctrl+C to stop.
```

### 5. Open the site

- Portfolio: **http://localhost:8080**
- Health check: **http://localhost:8080/api/health** — should return `{"status":"ok", ...}`

Press `Ctrl+C` in the terminal to stop the server.

### Development mode

To restart the server automatically when `server.js` or `knowledge.js` changes:

```bash
npm run dev
```

## Editing CSS or JavaScript

`index.html` loads the **bundled** files `css/app.min.css` and `js/app.min.js`, not the source files. After editing any file in `css/` (e.g. `style.css`, `scroll-animations.css`) or `js/` (e.g. `main.js`, `scroll-animator.js`), rebuild the bundles:

```bash
npm run build        # images + CSS + JS
npm run build:css    # CSS only
npm run build:js     # JS only
npm run build:images # convert/resize images to WebP only
```

Then refresh the browser (use `Ctrl+Shift+R` to bypass the cache). The generated `.min` files and `.webp` images are committed to the repository.

## Chatbot setup

The chatbot needs `GROQ_API_KEY` in `.env`. Without it, the website still opens, but chatbot requests return a `503` error and the server prints a warning on startup.

The chatbot knowledge is maintained in `knowledge.js`. When portfolio/resume information changes, update both:

- `index.html` — information visible on the website
- `knowledge.js` — information used by the chatbot

Then restart the server (or use `npm run dev`, which restarts automatically).

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run the server at http://localhost:8080. |
| `npm run dev` | Run the server in watch mode (auto-restart on changes). |
| `npm run build` | Rebuild WebP images, `css/app.min.css` and `js/app.min.js`. |
| `npm run build:images` | Rebuild WebP images only. |
| `npm run build:css` | Rebuild `css/app.min.css` only. |
| `npm run build:js` | Rebuild `js/app.min.js` only. |

## Project structure

```text
My-Resume/
├── index.html       # Portfolio page
├── server.js        # Express server and chatbot API (/api/chat, /api/health)
├── knowledge.js     # Chatbot knowledge base
├── .env.example     # Environment variable template
├── scripts/
│   └── build.js     # Image / CSS / JS build pipeline
├── css/             # Stylesheets (source + app.min.css bundle)
├── js/              # Frontend JavaScript (source + app.min.js bundle)
├── fonts/           # Icon and Bootstrap fonts
├── images/          # Portfolio images and resume PDFs
└── DEPLOY.md        # Deployment guide
```

## Troubleshooting

- **`npm` or `node` is not recognized:** install Node.js 18 or newer from [nodejs.org](https://nodejs.org/), then reopen the terminal.
- **Chatbot shows an API-key error:** make sure `.env` exists in the project root (not `.env.example`), `GROQ_API_KEY` has a valid value, and restart the server.
- **CSS/JS changes don't appear:** run `npm run build` and hard-refresh the browser.
- **`npm install` fails on `sharp`:** `sharp` is only needed for `npm run build`. Update Node.js to the latest LTS and run `npm install` again.
- **Port 8080 is already in use:** start on another port:

  ```powershell
  # Windows (PowerShell)
  $env:PORT=3000; npm start
  ```

  ```bash
  # macOS / Linux
  PORT=3000 npm start
  ```

  Then open **http://localhost:3000**.

## Deployment

See [DEPLOY.md](DEPLOY.md).

## License

See [LICENSE](LICENSE).
