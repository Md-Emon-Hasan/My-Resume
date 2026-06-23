# Md. Hasan Imon — Personal Portfolio

Personal portfolio website for **Md. Hasan Imon**, featuring projects, skills, experience, certifications, contact information, and an AI-powered portfolio chatbot.

## Requirements

- **Node.js 18+**
- A **Groq API key** for the chatbot

## Run locally

1. Open a terminal in this project folder:

   ```powershell
   cd "C:\Users\emon1\Desktop\New folder (4)\My-Resume"
   ```

2. Install the dependencies:

   ```powershell
   npm install
   ```

3. Create a local environment file from the example:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Open `.env` and add your Groq API key:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. Start the website:

   ```powershell
   npm start
   ```

6. Open **http://localhost:8080** in your browser.

To run in development mode with automatic server restart after changes:

```powershell
npm run dev
```

## Chatbot setup

The chatbot needs `GROQ_API_KEY` in `.env`. Without it, the portfolio website still opens, but chatbot requests return an error.

You can get a Groq API key from [Groq Console](https://console.groq.com/keys).

The chatbot knowledge is maintained in `knowledge.js`. When portfolio/resume information changes, update both:

- `index.html` — information visible on the website
- `knowledge.js` — information used by the chatbot

Then restart the local server.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run the local server at port 8080. |
| `npm run dev` | Run the server in watch mode for development. |
| `npm run build` | Run the project build command. |

## Project structure

```text
My-Resume/
├── index.html       # Portfolio page
├── server.js        # Express server and chatbot API
├── knowledge.js     # Chatbot knowledge base
├── .env.example     # Environment variable template
├── css/             # Stylesheets
├── js/              # Frontend JavaScript
└── images/          # Portfolio images and resume PDFs
```

## Troubleshooting

- **`npm` or `node` is not recognized:** install Node.js 18 or newer, then reopen the terminal.
- **Chatbot shows an API-key error:** check that `.env` exists in the project root and `GROQ_API_KEY` has a valid value.
- **Port 8080 is already in use:** run PowerShell with a different port, for example:

  ```powershell
  $env:PORT=3000; npm start
  ```

  Then open **http://localhost:3000**.
