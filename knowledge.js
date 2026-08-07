'use strict';

// This is the single factual source for chatbot answers. Keep it in sync with
// index.html, the downloadable resume (images/Md-Emon-Hasan.pdf), and the
// project READMEs on GitHub. Last synced against all three: August 2026.
const PORTFOLIO_DOCS = [
  `
PROFILE & CONTACT — Md. Emon Hasan
Full name: Md. Emon Hasan.
Professional title: AI/ML Engineer; portfolio focus includes AI engineering, ML engineering, NLP engineering, backend, and MLOps.
GitHub headline he uses: "Machine Learning Engineer || AI Engineer || Fine-Tuning LLM || NLP || Data Engineering || Multi-Agent Expert".
Location: Savar, Dhaka, Bangladesh.
Email: emon.mlengineer@gmail.com.
Phone and WhatsApp: +880 1834-363533.
LinkedIn: https://www.linkedin.com/in/md-emon-hasan-695483237/
GitHub: https://github.com/Md-Emon-Hasan
Kaggle: https://www.kaggle.com/mdhasanimon
Medium: https://medium.com/@emon.mlengineer
Facebook: https://www.facebook.com/mdemon.hasan2001/
Instagram: https://www.instagram.com/md_emon_hasan01/
His personal website / portfolio website URL: https://emonlabs-ai.hitechparks.com — this is the live site this chat assistant runs on.
Downloadable resume: available on the portfolio as "View Resume" (images/Md-Emon-Hasan.pdf).
`,
  `
PROFESSIONAL SUMMARY — Md. Emon Hasan
AI/ML Engineer specialising in Generative AI, NLP, and Machine Learning, with expertise in Deep Learning and in developing production-grade multi-agent systems, RAG pipelines, and tool-augmented AI architectures.
Skilled in fine-tuning LLMs (LoRA/QLoRA/PEFT) and applying NLP techniques such as transformers and language modelling to build robust AI solutions.
Experienced with FastAPI, Docker, Nginx, and CI/CD for designing and deploying scalable, end-to-end AI systems that improve decision-making, drive automation, and deliver measurable business outcomes.
Self-described on the portfolio as a full-stack AI engineer who designs AI solutions that learn, reason, and act autonomously.
His GitHub account has around 160 public repositories, and six projects are pinned: MediGenius, BookSage-AI, Translatica, FraudChurn-Nexus, TrueWealth-AI, and InformaTruth.
He is open to collaborations, freelance work, and new opportunities.
`,
  `
AVAILABILITY & HIRING — Md. Emon Hasan
Md. Emon Hasan is actively open to new opportunities and is ready to join at any time. He welcomes full-time roles, contract and freelance work, and collaborations in AI/ML engineering, NLP, Generative AI, Agentic AI, and MLOps.
Recruiters and hiring managers are encouraged to reach out directly by email (emon.mlengineer@gmail.com), WhatsApp (+880 1834-363533), or LinkedIn (https://www.linkedin.com/in/md-emon-hasan-695483237/).
The portfolio also has a contact form and a "Hire Me" button that opens an email to emon.mlengineer@gmail.com.
When asked about hiring, job openings, availability, notice period, or joining a company, the answer is that he is available and ready to start immediately.
`,
  `
WORK EXPERIENCE — AutoMetaHQ
Role: Machine Learning Engineer.
Period shown on the portfolio and resume: April 2026 – Present.
Location: London, UK (Remote).
Company website: https://www.autometahq.com/
Role highlights:
- Takes ML work from sketch to scale for business workflows, covering data preprocessing, fine-tuning, validation, and optimisation.
- Architected scalable ML pipelines aligned with business goals, improving production reliability and workflow efficiency.
- Integrated workflows, model monitoring, and feedback loops for faster iteration and seamless deployment.
- Engineers high-performance data pipelines and large-scale data-handling systems for production AI environments.
- Implements LLM fine-tuning and training strategies to improve efficiency, accuracy, and latency, and deploys inference pipelines on cloud-native infrastructure.
`,
  `
WORK EXPERIENCE — Codixel
Role: Junior Machine Learning Engineer.
Period shown on the portfolio and resume: January 2026 – Present.
Location: Dhaka, Bangladesh.
Company website: https://codixel.tech/
Role highlights:
- Fine-tuned Generative AI and ML models using transformer architectures, improving performance and inference reliability.
- Built multi-agent RAG systems and multi-agent workflows, improving scalability and production readiness.
- Collaborated with senior engineers to deploy AI solutions using FastAPI, Docker, and CI/CD pipelines.
- Architects agentic workflows with LangGraph and AgentOps orchestration, tool-augmented retrieval pipelines, and memory-driven reasoning.
- Works on LLM fine-tuning for specialised domains, including intelligent financial advisors and medical assistants.
`,
  `
WORK EXPERIENCE — Hi-Tech Parks
Role: Machine Learning Engineer Intern (shown on the portfolio timeline as Intern Machine Learning Engineer).
Period shown on the portfolio and resume: October 2025 – December 2025.
Location: Dhaka, Bangladesh.
Company website: https://www.hitechparks.com/
Role highlights:
- Developed RAG pipelines and supported multi-agent AI applications with model integration, testing, and deployment.
- Performed data preprocessing, feature engineering, and model optimisation for reliable ML pipelines.
- Designed backend-centric AI/ML systems with scalable data pipelines, end-to-end inference services, and modular Python AI backends.
`,
  `
EDUCATION — Md. Emon Hasan
Bachelor of Science in Computer Science and Engineering, City University, Dhaka, Bangladesh.
Academic years shown on the portfolio and resume: 2022 – 2025. Focus: Software Engineering principles and real-world applications; he built AI systems, participated in research, and contributed to open-source AI/ML projects during these years.
Honours and awards shown: four consecutive scholarships for excellence in Machine Learning and project performance, plus a Merit Scholarship for outstanding academic excellence.
Higher Secondary Certificate: science subjects including Physics, Chemistry, Mathematics, and Biology.
Secondary School Certificate: completed under the Dinajpur Board.
`,
  `
SKILLS — AI AGENTS & AGENTIC AI
Frameworks and orchestration: LangChain, LangGraph (StateGraph workflows), LangSmith, AgentOps, CrewAI.
Patterns and capabilities: Agentic RAG, multi-agent systems, supervisor and sub-agent hierarchies, agent orchestration, tool calling, tool-augmented agents, planner-based query decomposition, reasoning and planning, long-term episodic and semantic memory, safety and guardrails, deterministic (non-LLM) routing gates.
LLM gateway work: LiteLLM provider abstraction with task routing and ordered fallback across Groq, OpenAI, and Anthropic models.
Prompting: context engineering, prompt engineering, prompt-injection defence.
`,
  `
SKILLS — LLM FINE-TUNING & TRAINING
PEFT, LoRA, QLoRA, SFT, RLHF, DPO, quantisation, instruction tuning, token optimisation, vLLM optimisation, mixed precision, and model evaluation.
Model families he has worked with: GPT (including gpt-oss-120b and gpt-oss-20b via Groq), LLaMA (LLaMA-3-70B, Llama 3.3, Llama 3.1), Mistral, Claude, RoBERTa, FLAN-T5, and Helsinki-NLP MarianMT.
Practical fine-tuning experience: LoRA adapters on RoBERTa-base for classification and on opus-mt-en-es for translation, training only a fraction of parameters (about 0.38% trainable in Translatica).
`,
  `
SKILLS — NLP & REPRESENTATION LEARNING
Transformers, Hugging Face, SentenceTransformers, embeddings (all-MiniLM-L6-v2, 384-dimensional), semantic search, CrossEncoder reranking, BPE tokenisation, attention mechanisms, language modelling, beam-search decoding, sentence-aware chunking, NER and POS tagging, spaCy, and NLTK.
Document and text ingestion: PyMuPDF, PyPDFLoader, python-docx, BeautifulSoup, and Newspaper3k for URL article extraction.
`,
  `
SKILLS — MACHINE LEARNING & DEEP LEARNING
PyTorch, TensorFlow, Keras, Scikit-learn, SciPy, CNN and RNN, LSTM and GRU (including LSTM-GRU hybrid and bidirectional LSTM architectures), XGBoost and LightGBM, supervised and unsupervised learning, classification and regression, voting ensembles, Gradient Boosting, AdaBoost, Random Forest, Decision Trees, Logistic Regression, KNN, SMOTE for class imbalance, hyperparameter tuning, transfer learning, and model evaluation with precision/recall/F1 trade-off analysis.
`,
  `
SKILLS — DATA SCIENCE & ANALYSIS
NumPy, Pandas, EDA and data wrangling, statistical analysis, hypothesis testing, Matplotlib, Seaborn, feature engineering, sparse-matrix modelling, TF-IDF and cosine similarity, and time-series analysis.
Financial and quantitative analysis: portfolio concentration, volatility, and drawdown computation with pandas and numpy; live market data via yfinance.
`,
  `
SKILLS — DATABASES & VECTOR RETRIEVAL
Vector databases and retrieval: FAISS, ChromaDB, Qdrant, Redis retrieval, and hybrid search — dense embedding retrieval fused with BM25 sparse keyword matching via Reciprocal Rank Fusion (RRF), followed by CrossEncoder reranking and optional LLM context compression.
Databases: PostgreSQL, MySQL, MongoDB, Redis, SQLite (with SQLModel), and NoSQL generally.
Retrieval engineering: session-scoped metadata isolation to prevent cross-session leakage, contradiction detection in long-term memory, and multi-layer TTL caching for embeddings, reranking, answers, and external search.
`,
  `
SKILLS — SOFTWARE ENGINEERING
Python (3.9–3.12), TypeScript and JavaScript, FastAPI, Uvicorn, Flask, Pydantic, SQLModel, REST APIs, WebSockets, Server-Sent Events for token streaming, async programming, ThreadPoolExecutor concurrency, OOP, and design patterns.
Frontend: React (React 18 and React 19), Vite, Tailwind CSS, DaisyUI, and Framer Motion.
Testing and reliability: pytest and pytest-cov, with several of his projects reporting 100% backend statement and branch coverage (for example 173 tests in InformaTruth, 193 in Translatica, and 135 in TrueWealth-AI), structured and rotating file logging, input validation, and proxy-aware rate limiting with slowapi.
`,
  `
SKILLS — DEPLOYMENT, MLOPS & AGENTOPS
Docker and Docker Compose (including multi-stage builds that bundle frontend and backend), CI/CD pipelines, GitHub Actions (lint and test on pull requests, then rebuild and deploy on merge to main), AgentOps, monitoring and logging, audit trails with latency and token tracking, MLflow, Weights & Biases, Linux, Nginx, and Render for hosting.
Production concerns he builds in routinely: TTL caching layers, per-client rate limiting, model warm-up on startup, human-in-the-loop review queues, SSRF-safe URL validation, PII and injection detection, and per-domain output policies.
`,
  `
EXPERTISE AREAS — What Md. Emon Hasan Does
The portfolio lists six expertise areas:
1. Full-Stack AI/ML Engineering — designing end-to-end AI/ML pipelines from data to deployable applications.
2. Generative AI & Agentic Systems — modular agentic workflows with memory-integrated generative AI architectures.
3. Model Fine-Tuning & Optimisation — fine-tuning LLMs using LoRA, QLoRA, PEFT, and quantisation techniques.
4. Autonomous & Tool-Augmented Reasoning — intelligent decision-making via tools, memory, and multi-agent planning.
5. Supervised / Unsupervised Deep Learning — building intelligent systems with structured, labelled, and unlabelled datasets.
6. Model Deployment & MLOps — deploying scalable ML models with React, FastAPI, Docker, and CI/CD pipelines.
He presents himself in four role cards: AI Engineer, ML Engineer, NLP Engineer, and Backend & MLOps.
`,
  `
PROJECT — MediGenius (Multi-Agent Medical AI Assistant)
Category: Artificial Intelligence, multi-agent medical system.
What MediGenius does: an enterprise-grade medical AI assistant that gives empathetic, doctor-like responses by combining LLM reasoning, medical document retrieval, and safety guardrails. Importantly, MediGenius does not diagnose — it helps users understand symptoms, medications, and health information, and routes critical cases to professionals.
Results reported for MediGenius on the resume: 82% clinical alignment, misinformation reduced by 60%, and query resolution rate improved by 75%.
MediGenius agents (a LangGraph StateGraph): MedicalSupervisorAgent for routing, SymptomAnalysisSubAgent, DrugInteractionSubAgent (RxNav/RxNorm drug-name recognition, refers to pharmacists), ParallelRetrievalAgent (concurrent RAG + Wikipedia + Tavily with per-branch timeouts), ExecutorAgent for synthesis, MemoryAgent for session history and semantic recall, LLMAgent as knowledge fallback, and a DiagnosisVerificationSubAgent for post-generation claim verification.
Deterministic safety layer (not LLM-decided): a safety_router that pattern-matches crisis language and returns static helpline responses, and dosage_grounding that refuses paediatric and pregnancy dosing and strips unverified figures.
MediGenius stack: LangChain, LangGraph, FastAPI, React 19 with Tailwind CSS 4, Groq-hosted gpt-oss-120b for synthesis with gpt-oss-20b as fallback, a LiteLLM model gateway, HuggingFace sentence-transformers embeddings, ChromaDB vector storage, SQLite for chat history and audit logs, Docker Compose, GitHub Actions CI/CD, and Render hosting.
Other MediGenius features: exact-match TTL caching (500 answer entries for 1 hour, 200 retrieval entries for 6 hours), slowapi rate limiting (20 requests/min), audit logging, and a clinician review queue with an agreement-rate stats endpoint.
Measured MediGenius latencies (single-run): crisis response ~0.01–0.02s, cache hit ~0.01–0.02s, direct LLM ~0.7–0.8s, and a full RAG medical question ~7–11s.
Live demo: https://medigenius.onrender.com/
Repository: https://github.com/Md-Emon-Hasan/MediGenius.git
`,
  `
PROJECT — InformaTruth (Explainable AI Fake-News Detection)
Category: Machine Learning, NLP, fine-tuning, explainable AI.
What InformaTruth does: automatically verifies news articles, PDFs, and web content, pairing an ML classifier with explainability so users see why something was flagged, plus RAG verification, source validation, and trust-aware reasoning.
InformaTruth model work: RoBERTa-base fine-tuned with LoRA/PEFT on the LIAR political fact-checking dataset (12.8K labelled statements), with the six original LIAR classes collapsed to binary Real vs Fake. Best epoch (epoch 2) reported in the repository: 70.3% accuracy, 67.2% F1, 68.2% precision, 70.3% recall. The resume summarises this as roughly 70% accuracy and 0.69 F1 under recall-weighted evaluation that deliberately prioritises catching fake claims.
InformaTruth explanations come from FLAN-T5-base used zero-shot.
InformaTruth pipeline (LangGraph nodes): Planner for request planning, InputHandler for text/URL/PDF processing, Router for conditional branching, Executor for classification plus explanation plus hallucination detection, and FallbackSearch doing concurrent DuckDuckGo retrieval. Input flows through guardrail sanitisation, then the classifier, then FLAN-T5 explanation, then hallucination-risk assessment, then an optional human review queue.
InformaTruth stack: PyTorch, Transformers, HuggingFace, FastAPI (async), SQLModel with SQLite, LangGraph, React with Vite and Tailwind CSS, Newspaper3k for URLs, PyMuPDF for PDFs, Docker, and Render.
Other InformaTruth features: prompt-injection and output guardrails, heuristic hallucination-risk scoring with optional self-consistency checks, parallel fallback search via ThreadPoolExecutor, multi-layer TTL caching, per-input-type rate limiting, and 173 backend tests at 100% statement and branch coverage.
Live demo: https://informatruth.onrender.com
Repository: https://github.com/Md-Emon-Hasan/InformaTruth.git
`,
  `
PROJECT — AutoDocThinker (Agentic Document QA System)
Category: Artificial Intelligence, Agentic RAG, enterprise document intelligence.
What AutoDocThinker does: turns a document collection into an intelligent assistant. Users ingest PDFs, Word documents, URLs, and raw text, then ask natural-language questions and get answers with source citations, verification, governance controls, and optional human approval — designed for regulated domains such as healthcare, law, and finance.
AutoDocThinker workflow modes — five selectable LangGraph modes: Naive (direct retrieval and generation), Advanced (query rewriting plus relevance evaluation), CRAG (retrieval validation with Wikipedia fallback), Self-RAG (self-reflection on retrieval, relevance, and support), and Deep (a planner decomposes complex queries into parallel sub-agent tasks, then synthesises). Both the portfolio project card and the resume list all five modes.
AutoDocThinker retrieval: ChromaDB dense vectors plus BM25 sparse matching fused with Reciprocal Rank Fusion, then CrossEncoder reranking, with optional LLM context compression. Reported to improve query efficiency by 40% across 50+ documents, with TTL caching to control LLM spend.
AutoDocThinker stack: FastAPI, Uvicorn, LangGraph, LangChain, Groq LLaMA-3-70B, all-MiniLM-L6-v2 embeddings, sentence-transformers CrossEncoder, rank-bm25, cachetools, PyMuPDF, python-docx, BeautifulSoup, React 18 with Vite and Tailwind CSS, Docker Compose, and SQLite for audit, HITL queue, and memory.
Other AutoDocThinker features: seven domain presets (General, Medical, Legal, Finance, Education, Technical, Customer Support), a verification agent doing groundedness scoring and hallucination detection, a governance layer with injection/PII detection and SSRF-safe URL validation and per-domain output policy, a human-in-the-loop approval queue (off by default), long-term memory with episodic turns plus semantic facts and contradiction detection, four-layer TTL caching, session-scoped index isolation, an LLM gateway with ordered fallback across Groq/OpenAI/Anthropic, Server-Sent Events streaming with a step timeline, and both a CLI and a React web UI.
Live demo: https://autodocthinker.onrender.com/
Repository: https://github.com/Md-Emon-Hasan/AutoDocThinker.git
`,
  `
PROJECT — TrueWealth-AI (Multi-Agent Financial Advisor)
Category: Artificial Intelligence, Agentic AI, financial analysis.
What TrueWealth-AI does: an intelligent financial advisor chatbot that answers investment questions with real-time data verification and compliance screening — LangGraph for structured reasoning, RAG over The Intelligent Investor, and live data from Yahoo Finance and DuckDuckGo.
TrueWealth-AI has nine specialised agents in a LangGraph StateGraph with conditional routing: Retriever (RAG/PDF lookup), Generator (answer synthesis), Market Desk (parallel Yahoo Finance and DuckDuckGo), Portfolio Analyst (pandas/numpy risk metrics), Due Diligence (hallucination and citation checking), Compliance Officer (policy guardrails with zero LLM calls), Memory (SQLite plus semantic recall), LLM Query (direct reasoning), and Web Search (DuckDuckGo fallback). Query routing is regex-based so classification costs no LLM calls.
TrueWealth-AI stack: Python 3.12, FastAPI, LangChain, LangGraph, ChromaDB, SQLModel with SQLite, Groq API, LiteLLM gateway routing gpt-oss-120b / Llama 3.3 / Llama 3.1, HuggingFace embeddings, PyPDFLoader, Pandas, NumPy, scikit-learn, yfinance, ddgs, React 19 with Tailwind CSS and DaisyUI and Vite, Docker, GitHub Actions CI/CD, and Render.
TrueWealth-AI measured performance: mean latency 5.91s and P95 18.51s over a 15-query sample; general questions ~1.39s, portfolio questions ~2.23s, market-desk queries ~15.56s; answer cache hits about 250× faster. Backend tests: 135 tests at 100% statement and branch coverage; frontend statement coverage 77.23%.
Other TrueWealth-AI features: portfolio analysis computing concentration, volatility, and drawdown; compliance screening that blocks guaranteed-return language and unsourced figures; a human review queue for flagged responses; an audit trail with latency and token tracking; and TTL caches for answers, RAG, news, and search.
Live demo: https://truewealth-ai.onrender.com/
Repository: https://github.com/Md-Emon-Hasan/TrueWealth-AI.git
`,
  `
PROJECT — FraudChurn-Nexus (Unified Fraud and Churn Prediction)
Category: Data Science, Machine Learning, classification.
What FraudChurn-Nexus does: replaces manual screening with a unified platform that returns a clear verdict plus a confidence level for both transaction fraud and customer churn. Fraud uses transaction metadata and e-commerce data; churn uses demographic and billing information.
FraudChurn-Nexus models: fraud detection with Logistic Regression and one-hot encoding; churn prediction with a five-estimator hard-voting ensemble of Gradient Boosting, AdaBoost, Random Forest, Decision Tree, and Logistic Regression, using SMOTE to handle class imbalance.
FraudChurn-Nexus metrics reported in the repository — fraud: 92.4% accuracy, 89.2% precision, 91.5% recall, 0.90 F1. Churn: 85.6% accuracy, 81.4% precision, 83.2% recall, 0.82 F1. Response time under 0.5 seconds for both. The resume rounds these to 0.90 F1 / 92% accuracy on fraud and 0.82 F1 / 86% accuracy on churn, noting precision/recall evaluation was chosen because false negatives are far costlier in fraud.
FraudChurn-Nexus stack: FastAPI, Pydantic, SQLite, scikit-learn, Pandas, NumPy, React 19 with Vite and Tailwind/DaisyUI, Docker Compose, and pytest with pytest-cov.
Other FraudChurn-Nexus features: dual-engine architecture, automated feature engineering, SQLite persistent logging of every prediction, dynamic dropdowns derived from the training data, rotating file logging, and 100% backend test coverage. No public live demo is listed for this project.
Repository: https://github.com/Md-Emon-Hasan/FraudChurn-Nexus
`,
  `
PROJECT — Translatica (Fine-Tuned English → Spanish Translation)
Category: Machine Learning, NLP, fine-tuning, machine translation.
What Translatica does: translates English into Spanish while keeping the original's tone and style, aimed at literary text, with consistent output and full translation logging.
Translatica fine-tuning: Helsinki-NLP opus-mt-en-es as the base model, fine-tuned with PEFT/LoRA on the opus_books English–Spanish literary corpus. LoRA rank 8, alpha 32, targeting the q_proj and v_proj modules — only about 0.38% of parameters are trainable.
Translatica stack: FastAPI with Uvicorn, React 19 with TypeScript, Tailwind CSS and Vite, PyTorch, Transformers, PEFT, cachetools TTLCache, slowapi, Docker, and Render.
Other Translatica features: sentence-aware chunking to avoid silent truncation, beam-search decoding (num_beams=4), thread-safe TTL response caching (1 hour default), deterministic decoding for reproducibility, SQLite logging of all translations, proxy-aware rate limiting, and 193 Pytest tests. The repository references BLEU scoring but does not publish a BLEU number.
Live demo: https://bilingual-bridge.onrender.com/
Repository: https://github.com/Md-Emon-Hasan/Translatica.git
`,
  `
PROJECT — BookSage AI (Hybrid Book Recommendation Engine)
Category: Machine Learning, Data Science, recommendation systems.
What BookSage AI does: turns a book someone liked into a ranked list of others worth reading, by weighing what similar readers rated highly against what the book is actually about.
BookSage AI data and algorithms: the Book-Crossing dataset (BX-Books, BX-Users, BX-Ratings — roughly 1.1 million ratings). Collaborative filtering uses SciPy sparse matrices with scikit-learn k-nearest-neighbours over the user–item matrix; content-based filtering uses TF-IDF vectorisation and cosine similarity over title, author, publisher, and year; the two are fused with configurable weighted-average scoring.
BookSage AI stack: FastAPI, Python 3.11, Pandas, NumPy, scikit-learn, SciPy, React 19 with Vite, Tailwind CSS, DaisyUI and Framer Motion, Docker Compose, and GitHub Actions CI/CD.
Other BookSage AI features: transparent scoring with metadata display, in-memory TTL caching (no Redis needed), per-client rate limiting with X-Forwarded-For awareness, cold-start handling via a popular-books fallback, and 100% backend test coverage with structured logging.
Live demo: https://booksage-ai.onrender.com/
Repository: https://github.com/Md-Emon-Hasan/BookSage-AI.git
`,
  `
PROJECT — Factify (Deep-Learning Fake-News Classifier)
Category: Data Science, Deep Learning, fact-checking and verification.
What Factify does: classifies news articles as real or fabricated using deep learning, returning a confidence score, and refuses to predict on text that is too short to judge. The portfolio describes it as a fact-checking and data-verification pipeline with explainable predictions, statistical analysis, visualisation, and automated insight generation.
Factify data and architecture: a balanced Kaggle dataset of about 42,000 labelled true and fake articles. The primary model is an LSTM-GRU hybrid — embedding layer (10,000 vocabulary, 100 dimensions), LSTM layer (100 units, return sequences), GRU layer (100 units), 0.2 dropout, and a dense sigmoid output. Bidirectional LSTM and CNN-LSTM hybrid variants achieved comparable performance.
Factify metrics: 99% accuracy on held-out test data, with precision, recall, and F1 all at 0.99 for both classes.
Factify stack: Python 3.9, FastAPI, TensorFlow 2.8, Keras, NLTK, Pandas, React with Vite, Tailwind CSS, cachetools TTLCache, slowapi, Docker, GitHub Actions CI/CD, and Render.
Other Factify features: in-memory TTL response caching, proxy-aware rate limiting (20 requests/min on the prediction endpoint), model warm-up on startup, and input validation that rejects oversized or too-short submissions.
Live demo: https://ml-project-fake-news-prediction-using.onrender.com
Repository: https://github.com/Md-Emon-Hasan/Factify
`,
  `
LIVE DEMOS — Try Md. Emon Hasan's Projects
Most of his projects are deployed and can be tried in a browser right now:
- MediGenius (medical AI assistant): https://medigenius.onrender.com/
- AutoDocThinker (agentic document QA): https://autodocthinker.onrender.com/
- TrueWealth-AI (financial advisor): https://truewealth-ai.onrender.com/
- InformaTruth (fake-news verification): https://informatruth.onrender.com
- BookSage AI (book recommendations): https://booksage-ai.onrender.com/
- Translatica (English→Spanish translation): https://bilingual-bridge.onrender.com/
- Factify (fake-news classifier): https://ml-project-fake-news-prediction-using.onrender.com
FraudChurn-Nexus has no public live demo — it runs locally via Docker Compose.
All demos are hosted on Render's free tier, so the first request may take a few seconds to wake the service.
`,
  `
GITHUB PRESENCE — Md. Emon Hasan's GitHub Account
GitHub profile: https://github.com/Md-Emon-Hasan
Number of public repositories on GitHub: around 160 repos. Followers: about 31.
Profile headline: "Machine Learning Engineer || AI Engineer || Fine-Tuning LLM || NLP || Data Engineering || Multi-Agent Expert".
Location listed on GitHub: Savar, Dhaka, with current affiliation to AutoMetaHQ in London.
Six repositories are pinned on his GitHub profile: MediGenius, BookSage-AI, Translatica, FraudChurn-Nexus, TrueWealth-AI, and InformaTruth.
GitHub achievement badges earned: Starstruck, Quickdraw, Pull Shark, and YOLO.
If someone asks how many repositories, repos, or GitHub projects he has, the answer is around 160 public repositories — the portfolio itself only features eight of them.
`,
  `
ENGINEERING PRACTICES — How Md. Emon Hasan Builds
A consistent production pattern runs through his projects, not just notebooks:
- Full-stack delivery: FastAPI backends paired with React (18/19) + Vite + Tailwind frontends, containerised with Docker Compose and shipped through GitHub Actions CI/CD to Render.
- Testing discipline: several repositories report 100% backend statement and branch coverage — 173 tests in InformaTruth, 193 in Translatica, 135 in TrueWealth-AI, plus full coverage in BookSage AI and FraudChurn-Nexus.
- Cost and latency control: multi-layer TTL caching for answers, embeddings, reranking, and external search; cache hits measured up to ~250× faster than a cold query.
- Safety and governance: deterministic (non-LLM) guardrails, prompt-injection and PII detection, SSRF-safe URL validation, compliance screening, and hallucination/groundedness verification agents.
- Human-in-the-loop: clinician and reviewer approval queues backed by SQLite, with audit trails tracking latency and tokens.
- Reliability: LLM gateways with ordered provider fallback, per-branch timeouts on parallel retrieval, model warm-up on startup, rate limiting, and rotating structured logs.
He also documents honest limitations in his READMEs — for example noting that MediGenius crisis detection is pattern-based with false-negative potential, that it does not diagnose, and that some performance figures are single-run measurements rather than statistical benchmarks.
`,
  `
BLOG & ARTICLES — Md. Emon Hasan on Medium
He writes engineering articles on Medium: https://medium.com/@emon.mlengineer
Three posts are featured on the portfolio:
1. "When LLM Fine-Tuning Fails: A Data-Centric Debugging Story" — April 21, 2026, topic: fine-tuning. On why the hardest problem in LLM engineering is data design and alignment, not the model.
   https://medium.com/@emon.mlengineer/when-llm-fine-tuning-fails-a-data-centric-debugging-story-83ac6f4b7a19
2. "MediGenius: Tool-Augmented Clinical Reasoning" — January 29, 2026, topic: agent design. An article walking through symptom triage agents, retrieval-augmented grounding on medical guidelines, citation fidelity checks, and safety fallback policies. Published on Medium as "How a Simple Tool-Routing Decision Impacted My AI Chatbot in Production".
   https://medium.com/@emon.mlengineer/how-a-simple-tool-routing-decision-impacted-my-ai-chatbot-in-production-bba46ce6508c
3. "Why a 92% Accuracy Model Still Created a Terrible User Experience" — June 11, 2026, topic: model evaluation. On why a high accuracy score does not always translate into a good product.
   https://medium.com/@emon.mlengineer/why-a-92-accuracy-model-still-created-a-terrible-user-experience-f1d01a42f691
`,
  `
CERTIFICATIONS — Md. Emon Hasan
1. Machine Learning Specialisation — Stanford University via Coursera; type: Specialisation; domain: AI & ML.
   Verify: https://www.coursera.org/account/accomplishments/specialization/W5FZ8XQJZFP3
2. Programming for Everybody — University of Michigan via Coursera; type: Certificate; domain: Python.
   Verify: https://www.coursera.org/account/accomplishments/verify/YB3ZZTJ8WE7Y
3. Google IT Support Professional Certificate — Google via Coursera; type: Professional Certificate; domain: IT Support.
   Verify: https://www.coursera.org/account/accomplishments/specialization/certificate/E5WWVDFEAM6S
4. Google UX Design Professional Certificate — Google via Coursera; type: Professional Certificate; domain: UX Design.
   Verify: https://www.coursera.org/account/accomplishments/specialization/certificate/BDZVJW5D94HT
The portfolio certifications section shows all four; the one-page downloadable resume lists the first three.
`,
  `
PROJECTS OVERVIEW & COUNTS
The portfolio project section features eight projects, filterable by category:
- Artificial Intelligence: MediGenius, AutoDocThinker, TrueWealth-AI.
- Machine Learning: InformaTruth, Translatica, BookSage AI.
- Data Science: FraudChurn-Nexus, Factify.
The four projects he highlights on his downloadable resume — his flagship, most advanced work — are MediGenius, InformaTruth, AutoDocThinker, and FraudChurn-Nexus. MediGenius and AutoDocThinker are the largest agentic systems; if asked which project best shows his skills or which is the most impressive, lead with those two. Six are pinned on GitHub: MediGenius, BookSage-AI, Translatica, FraudChurn-Nexus, TrueWealth-AI, and InformaTruth.
His GitHub account holds around 160 public repositories in total: https://github.com/Md-Emon-Hasan
The portfolio does not publish counter statistics — the old counters section (clients, partners, cups of coffee) is no longer displayed on the site.
Counts that can safely be stated: eight featured projects, seven with live demos, three featured Medium articles, four certifications, and three roles in the work-experience timeline (AutoMetaHQ, Codixel, Hi-Tech Parks).
Never invent or estimate numbers for clients, years of experience, salary, or team sizes. If asked for a figure that is not listed, say it is not specified on the portfolio.
`,
];

module.exports = { PORTFOLIO_DOCS };
