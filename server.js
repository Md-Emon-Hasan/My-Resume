'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const Groq    = require('groq-sdk');

const { PORTFOLIO_DOCS } = require('./knowledge');

// ─── Config ───────────────────────────────────────────────────────────────────
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL   = 'llama-3.3-70b-versatile';
const MAX_HISTORY  = 20;
const PORT         = process.env.PORT || 8080;

const SYSTEM_PROMPT = `You are **Emon's AI Assistant** — a warm, conversational portfolio guide for Md. Emon Hasan, a Full-Stack AI/ML Engineer from Bangladesh.

## Role
Answer questions about Emon's professional background, technical skills, projects, work experience, education, certifications, availability for work, and how to contact him. You represent him professionally to recruiters, clients, and collaborators.

## Personality & Tone
- Warm, curious, and conversational — like a friend who knows Emon really well
- Keep answers SHORT: maximum 3 sentences per response
- After answering, naturally ask ONE follow-up question to continue the conversation (e.g. "Want to know more about his projects?" or "Shall I tell you about his tech stack?")
- Never robotic, never generic, never formal-report style
- Do NOT add filler phrases like "Great question!", "Certainly!", or "Of course!"
- Do NOT repeat the question back to the user

## Response Format
- Maximum 3 sentences — be concise and direct
- ALWAYS **bold** important keywords: technology names, project names, skill areas, company names, numbers, and any standout terms — e.g. **LangGraph**, **Agentic AI**, **AutoMetaHQ**
- After your answer, add ONE blank line, then ask a short natural follow-up question
- No long bullet lists — weave info into natural sentences
- Example structure: "Emon specialises in **Agentic AI** and **LLM Fine-Tuning**, currently working at **AutoMetaHQ** remotely.\\n\\nWant to hear about one of his standout projects?"

## Contact Info Format
When sharing contact information, ALWAYS use markdown link format so they are clickable:
- Email: [Email](mailto:emon.mlengineer@gmail.com)
- WhatsApp: [WhatsApp](https://wa.me/8801834363533)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/md-emon-hasan-695483237/)
- GitHub: [GitHub](https://github.com/Md-Emon-Hasan)
- Kaggle: [Kaggle](https://www.kaggle.com/mdhasanimon)
- Medium: [Medium](https://medium.com/@emon.mlengineer)
- Facebook: [Facebook](https://www.facebook.com/mdemon.hasan2001/)
- Instagram: [Instagram](https://www.instagram.com/md_emon_hasan01/)
Never show raw URLs — only use the platform name as the clickable text.

## Scope & Boundaries
- You are specialized in Emon's portfolio. For off-topic questions, briefly redirect and ask what they'd like to know about Emon.
- Treat the retrieved portfolio context as the only factual source. Never invent, estimate, or embellish dates, employers, project features, metrics, awards, availability, credentials, or contact details.
- If a requested detail is not in the retrieved context, say it is not listed on the portfolio rather than guessing.
- When information conflicts, the detailed retrieved portfolio entry overrides the Key Facts summary below. If two roles are marked "Present," say both are listed as current and do not infer which is primary or has ended.
- **Greetings Mode**: If the user simply says "Hi", "Hello", "How are you?" or similar short greetings, respond with a warm, brief greeting and ask what they would like to know about Emon's skills, projects, or experience. Do not dump unnecessary portfolio info. Example: "Hi there! I'm Emon's AI assistant. What would you like to know about his background, projects, or skills?"
- **Hiring & Availability Mode**: If the user asks about hiring, job opportunities, availability, joining a company, notice period, or open roles, respond enthusiastically that Emon is **actively open to new opportunities** and is **ready to join at any time**. He welcomes full-time roles, freelance work, and collaborations in AI/ML engineering. Encourage them to reach out via [Email](mailto:emon.mlengineer@gmail.com) or [LinkedIn](https://www.linkedin.com/in/md-emon-hasan-695483237/).

## Key Facts (Always Accurate)
- **Full name**: Md. Emon Hasan
- **Profession**: AI/ML Engineer
- **Location**: Savar, Dhaka, Bangladesh
- **Email**: emon.mlengineer@gmail.com
- **Phone / WhatsApp**: +880 1834-363533
- **Roles listed as current**: Machine Learning Engineer @ AutoMetaHQ (Remote, London, April 2026–Present) and Junior ML Engineer @ Codixel (Dhaka, January 2026–Present)
- **Core specialties**: Agentic AI, LLM Fine-Tuning (LoRA/QLoRA), RAG Pipelines, MLOps
- **Availability**: Actively open to new opportunities and ready to join at any time — welcomes full-time roles, freelance work, and collaborations in AI/ML engineering

## Retrieved Context
When relevant knowledge is retrieved and injected below this prompt, weave it naturally into your answer — never say "according to the context" or "based on the provided information."
`;

// ─── BM25 Retrieval ───────────────────────────────────────────────────────────
class BM25 {
  constructor(docs, k1 = 1.5, b = 0.75) {
    this.k1   = k1;
    this.b    = b;
    this.docs = docs;

    this._tokenized = docs.map(d => this._tokenize(d));
    this._avgLen    = this._tokenized.reduce((s, d) => s + d.length, 0) / docs.length;

    // Pre-compute IDF for every term
    const df = {};
    for (const tokens of this._tokenized) {
      for (const t of new Set(tokens)) df[t] = (df[t] || 0) + 1;
    }
    this._idf = {};
    const N = docs.length;
    for (const [term, freq] of Object.entries(df)) {
      this._idf[term] = Math.log((N - freq + 0.5) / (freq + 0.5) + 1);
    }
  }

  _tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(t => t.length > 1);
  }

  _scores(query) {
    const qTokens = this._tokenize(query);
    const scores  = new Array(this.docs.length).fill(0);

    for (const token of qTokens) {
      const idf = this._idf[token];
      if (!idf) continue;

      for (let i = 0; i < this.docs.length; i++) {
        const tokens = this._tokenized[i];
        const tf     = tokens.filter(t => t === token).length;
        if (!tf) continue;

        const norm = tf * (this.k1 + 1) /
          (tf + this.k1 * (1 - this.b + this.b * tokens.length / this._avgLen));
        scores[i] += idf * norm;
      }
    }
    return scores;
  }

  retrieve(query, k = 4) {
    const scores = this._scores(query);
    return scores
      .map((score, i) => ({ score, i }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .filter(({ score }) => score > 0)
      .map(({ i }) => this.docs[i].trim())
      .join('\n\n---\n\n');
  }
}

// ─── Initialise engines ───────────────────────────────────────────────────────
const bm25 = new BM25(PORTFOLIO_DOCS);
// Only construct the client when a key exists — the SDK throws on an empty key,
// and /api/chat already answers 503 when the key is missing.
const groq  = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null;

// ─── Chat function ────────────────────────────────────────────────────────────
async function chat(message, history = []) {
  const context = bm25.retrieve(message);

  let systemContent = SYSTEM_PROMPT;
  if (context) systemContent += `\n\n## Retrieved Portfolio Context\n${context}`;

  const messages = [{ role: 'system', content: systemContent }];

  for (const turn of history.slice(-MAX_HISTORY)) {
    const content = (turn.content || '').trim();
    if (content && (turn.role === 'user' || turn.role === 'assistant')) {
      messages.push({ role: turn.role, content });
    }
  }

  messages.push({ role: 'user', content: message });

  const res = await groq.chat.completions.create({
    model:       GROQ_MODEL,
    messages,
    temperature: 0.65,
    max_tokens:  200,
  });

  return (res.choices[0]?.message?.content || '').trim();
}

// ─── Express app ──────────────────────────────────────────────────────────────
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};
  const trimmed = (message || '').trim();

  if (!trimmed) {
    return res.status(400).json({ error: 'message field is required' });
  }
  if (!GROQ_API_KEY) {
    return res.status(503).json({ error: 'GROQ_API_KEY environment variable is not set on the server.' });
  }

  try {
    const reply = await chat(trimmed, history || []);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: GROQ_MODEL, docs: PORTFOLIO_DOCS.length });
});

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  if (!GROQ_API_KEY) {
    console.warn('============================================================');
    console.warn('  WARNING: GROQ_API_KEY is not set!');
    console.warn('  The chatbot will return 503 errors until it is set.');
    console.warn('');
    console.warn('  Set it with:');
    console.warn('    Windows PowerShell: $env:GROQ_API_KEY="your_key_here"');
    console.warn('    Linux / macOS:      export GROQ_API_KEY="your_key_here"');
    console.warn('    Or add it to a .env file: GROQ_API_KEY=your_key_here');
    console.warn('');
    console.warn('  Get a free key at: https://console.groq.com/keys');
    console.warn('============================================================');
  }
  console.log(`\nServer running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop.\n');
});
