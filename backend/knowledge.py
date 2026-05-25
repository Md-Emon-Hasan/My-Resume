"""
Portfolio knowledge base for BM25 retrieval.
Add, edit, or remove documents here to update the AI assistant's knowledge.
Each string in PORTFOLIO_DOCS is one retrievable chunk.
"""

PORTFOLIO_DOCS = [

    # ── Profile & Contact ─────────────────────────────────────────────────────
    """
PROFILE & CONTACT — Md. Hasan Imon
Full name: Md. Hasan Imon (also written as Md Emon Hasan)
Profession: Full-Stack AI/ML Engineer
Location: Savar, Dhaka, Bangladesh
Email: emon.mlengineer@gmail.com
Phone: +880 1834-363533
WhatsApp: +880 1834-363533 (https://wa.me/8801834363533)
LinkedIn: https://www.linkedin.com/in/md-emon-hasan-695483237/
GitHub: https://github.com/Md-Emon-Hasan
Kaggle: https://www.kaggle.com/mdhasanimon
Medium: https://medium.com/@emon.mlengineer
Facebook: https://www.facebook.com/mdemon.hasan2001/
Instagram: https://www.instagram.com/md_emon_hasan01/
Typical response time: within 24 hours
""",

    # ── Professional Summary ──────────────────────────────────────────────────
    """
PROFESSIONAL SUMMARY — Md. Hasan Imon
Experienced AI/ML Engineer from Bangladesh specialising in Machine Learning, NLP, Deep Learning,
Generative AI, LLM Fine-Tuning (LoRA/QLoRA), Agentic RAG Pipelines, and Vector Databases.
Over multiple production-grade projects he has designed and deployed end-to-end, multi-agent,
tool-augmented AI systems that deliver measurable business outcomes through reasoning, automation,
and intelligence at scale.
Strong proficiency in FastAPI, Flask, Docker, and CI/CD with Backend-as-a-Service (BaaS).
Every system is enterprise-ready, modular, and deployable across real-world environments.
Bridges deep technical design with business impact — enabling organisations to harness AI for
smarter decisions, scalable automation, and competitive advantage.
30+ projects delivered successfully. Open to collaborations, freelance work, and new opportunities.
""",

    # ── Work Experience ───────────────────────────────────────────────────────
    """
WORK EXPERIENCE — Machine Learning Engineer @ AutoMetaHQ
Company: AutoMetaHQ (https://www.autometahq.com/)
Period: April 2026 – Present
Location: London, UK (Remote)
Role highlights:
- Engineering high-performance data pipelines and architecting large-scale data handling systems for production AI environments
- Optimising end-to-end ML workflows including design and training of advanced neural architectures
- Implementing state-of-the-art LLM fine-tuning and training strategies to maximise efficiency, accuracy, and latency
- Streamlining data-centric optimisation and deploying robust inference pipelines using cloud-native infrastructure
""",

    """
WORK EXPERIENCE — Junior Machine Learning Engineer @ Codixel
Company: Codixel (https://codixel.tech/)
Period: January 2026 – June 2026
Location: Dhaka, Bangladesh
Role highlights:
- Architecting production-grade multi-agent AI systems and agentic workflows using LangGraph and AgentOps orchestration
- Engineering tool-augmented pipelines for complex data retrieval and integrating memory-driven reasoning systems
- Specialising in LLM fine-tuning and optimisation for specialised domains including intelligent financial advisors and medical assistants
- Ensuring high-fidelity outputs and efficient training cycles
""",

    """
WORK EXPERIENCE — Intern Machine Learning Engineer @ Hi-TechParks
Company: Hi-TechParks (https://www.hitechparks.com/)
Period: October 2025 – December 2025
Location: Dhaka, Bangladesh
Role highlights:
- Designing and deploying backend-centric AI/ML systems focusing on scalable data pipelines and RAG workflows
- Implementing end-to-end inference services and optimising model performance
- Managing modular AI backends using Python
- Streamlining data preprocessing and model serving layers for efficient, high-performance production execution
""",

    # ── Education ─────────────────────────────────────────────────────────────
    """
EDUCATION — Md. Hasan Imon
1. Bachelor of Science in Computer Science & Engineering (BSc CSE)
   Institution: City University, Dhaka, Bangladesh
   Period: 2022 – 2025
   Specialisation: Software Engineering principles with focus on real-world AI/ML applications
   Activities: Building industry-grade AI systems, research participation, open-source AI/ML contributions

2. Higher Secondary Certificate (HSC)
   Focus: Science — Physics, Chemistry, Mathematics, Biology
   This phase laid foundational knowledge and discipline for the AI/ML journey.

3. Secondary School Certificate (SSC)
   Board: Dinajpur Board
""",

    # ── Skills ────────────────────────────────────────────────────────────────
    """
SKILLS — Artificial Intelligence & Agentic AI (Knowledge: 95/100, Production: 90/100)
Imon's primary specialisation is agentic AI systems:
- LangChain, LangGraph, LangSmith
- AgentOps (agent monitoring and tracing)
- CrewAI and AutoGen
- Agentic RAG (Retrieval-Augmented Generation)
- Multi-Agent Systems and Agent Orchestration
- Reasoning & Planning
- Tool Calling / Function Calling
- Long-Term Memory for agents
""",

    """
SKILLS — LLM Fine-Tuning & Training (Knowledge: 88/100, Production: 85/100)
Imon fine-tunes large language models for specialised domains:
- PEFT (Parameter-Efficient Fine-Tuning)
- LoRA and QLoRA
- SFT (Supervised Fine-Tuning) and RLHF (Reinforcement Learning from Human Feedback)
- DPO (Direct Preference Optimization)
- Quantisation techniques (GGUF, AWQ, GPTQ)
- Instruction Tuning
- vLLM Optimisation for fast inference
- Mixed Precision training
- Model Evaluation (BLEU, ROUGE, perplexity, human eval)
""",

    """
SKILLS — NLP & Representation Learning (Knowledge: 87/100, Production: 82/100)
- Transformers architecture (attention, BERT, GPT families)
- Hugging Face ecosystem (datasets, hub, pipelines)
- SentenceTransformers for semantic embeddings
- Semantic Search
- Tokenisation (BPE, WordPiece, SentencePiece)
- Attention Mechanisms
- Named Entity Recognition (NER) and POS tagging
- spaCy and NLTK
""",

    """
SKILLS — Machine Learning & Deep Learning (Knowledge: 92/100, Production: 88/100)
- PyTorch (primary deep learning framework)
- TensorFlow / Keras
- Scikit-learn
- CNN (Convolutional Neural Networks) and RNN (Recurrent Neural Networks)
- LSTM and GRU architectures
- XGBoost and LightGBM (gradient boosting)
- Hyperparameter Tuning (Optuna, GridSearch, RandomSearch)
- Transfer Learning
- Neural Architecture design and customisation
""",

    """
SKILLS — Data Science & Analysis (Knowledge: 83/100, Production: 78/100)
- NumPy and Pandas for data manipulation
- Exploratory Data Analysis (EDA) and Data Wrangling
- Statistical Analysis and Hypothesis Testing
- Data Visualisation: Matplotlib, Seaborn, Plotly (interactive)
- Feature Engineering
- Time Series Analysis
""",

    """
SKILLS — Vector Databases & Retrieval (Knowledge: 87/100, Production: 82/100)
Imon works with multiple vector database solutions for semantic and hybrid search:
- FAISS (Facebook AI Similarity Search)
- ChromaDB
- Pinecone
- Qdrant
- Milvus
- Weaviate
- Redis for vector retrieval
- Hybrid Search (dense + sparse retrieval combined)
""",

    """
SKILLS — Software Engineering (Knowledge: 80/100, Production: 75/100)
- Programming: Python (primary), C++, TypeScript/JavaScript
- Web Frameworks: FastAPI and Flask
- Databases: PostgreSQL, MongoDB, Redis (NoSQL)
- APIs: REST and WebSockets
- Frontend: React, Vite, TailwindCSS
- OOP and Design Patterns (SOLID, Factory, Repository)
""",

    """
SKILLS — Deployment, MLOps & DevOps (Knowledge: 82/100, Production: 78/100)
- Docker and Docker Compose for containerisation
- CI/CD Pipelines (automated testing and deployment)
- GitHub Actions for workflow automation
- AgentOps for AI agent monitoring and observability
- Monitoring & Logging systems
- MLflow and Weights & Biases (W&B) for experiment tracking
- Linux server administration and Nginx configuration
- Cloud platforms: AWS and GCP
""",

    # ── Projects ──────────────────────────────────────────────────────────────
    """
PROJECT — MediGenius
Category: Artificial Intelligence, Multi-Agent Medical System
Description: Enterprise-grade medical AI system using LangGraph orchestration, retrieval grounding,
tool routing, and doctor-like reasoning pipelines. Features a symptom triage agent, RAG grounding
on medical guidelines, citation fidelity checks, and safety fallback policies.
Technologies: LangGraph, HumanLoop, VectorDB, RAG, FastAPI, LLM
GitHub: https://github.com/Md-Emon-Hasan/MediGenius.git
""",

    """
PROJECT — InformaTruth
Category: Machine Learning, NLP, Fine-Tuning, Fake News Detection
Description: Fine-tuned multi-agent fake news detection system with explainable AI, RAG
verification, source validation, and trust-aware reasoning. Includes claim parsing, fine-tuning,
reranking, structured evidence scoring, and AgentOps trace logging for reliability evaluation.
Technologies: Fine-Tuned LLM, Multi-Agent, VectorDB, LangGraph, AgentOps, NLP
GitHub: https://github.com/Md-Emon-Hasan/InformaTruth.git
""",

    """
PROJECT — BookSage AI
Category: Machine Learning, Data Science, Recommendation System
Description: Hybrid recommendation engine combining collaborative filtering, content-based
intelligence, ranking optimisation, and scalable personalisation using TF-IDF and KNN.
Technologies: Collaborative Filtering, KNN, TF-IDF, Scikit-Learn, Pandas, Flask
GitHub: https://github.com/Md-Emon-Hasan/BookSage-AI.git
""",

    """
PROJECT — Translatica
Category: Machine Learning, NLP, Fine-Tuning, Machine Translation
Description: Fine-tuned English to Spanish Translation System using Seq2Seq Transformers with
LoRA/PEFT optimisation, context-aware generation, and production-ready multilingual inference.
Technologies: Transformers, LoRA, PEFT, Seq2Seq, HuggingFace, Fine-Tuning
GitHub: https://github.com/Md-Emon-Hasan/Translatica.git
""",

    """
PROJECT — AutoDocThinker
Category: Artificial Intelligence, Agentic RAG, Enterprise Document System
Description: Agentic RAG System with Intelligent Search Engine — enterprise document reasoning
using LangGraph orchestration, tool-augmented retrieval, and fallback logic for robust Q&A.
Technologies: ToolRouter, RAG, ChromaDB, LangChain, Agentic AI, FastAPI
GitHub: https://github.com/Md-Emon-Hasan/AutoDocThinker.git
""",

    """
PROJECT — FraudChurn-Nexus
Category: Data Science, Machine Learning, Classification
Description: Multimodal AI system detecting e-commerce fraud and predicting customer churn using
Machine Learning and advanced data engineering techniques. Includes EDA, feature engineering,
and explainable predictions.
Technologies: EDA, Feature Engineering, Scikit-Learn, Pandas, Matplotlib, Prediction
GitHub: https://github.com/Md-Emon-Hasan/FraudChurn-Nexus
""",

    """
PROJECT — TrueWealth-AI
Category: Artificial Intelligence, Agentic AI, Financial Analysis
Description: AI-Powered Financial Strategist — multi-agent system with memory-driven reasoning,
portfolio analysis, market data fetching via tools, and adaptive decision workflows.
Blog: "Building an Agentic Financial Strategist" — how a multi-agent system (Planner, Tool,
Memory) with LangGraph analyses portfolios and delivers explainable, goal-aware recommendations.
Technologies: Agentic AI, LangGraph, RAG, Vector DB, FastAPI, Memory
GitHub: https://github.com/Md-Emon-Hasan/TrueWealth-AI.git
""",

    """
PROJECT — Factify
Category: Data Science, Deep Learning, Fact-Checking
Description: Fact-checking and data verification pipeline with deep learning models, explainable
predictions, statistical analysis, visualisation, and automated insight generation.
Technologies: Statistical Analysis, Data Visualisation, Pandas, Seaborn, Plotly
GitHub: https://github.com/Md-Emon-Hasan/Factify
""",

    # ── Certifications ────────────────────────────────────────────────────────
    """
CERTIFICATIONS — Md. Hasan Imon
1. Machine Learning Specialization
   Issuer: Stanford University (via Coursera)
   Type: Specialisation (multi-course)
   Verify: https://www.coursera.org/account/accomplishments/specialization/W5FZ8XQJZFP3

2. Programming for Everybody (Python)
   Issuer: University of Michigan (via Coursera)
   Verify: https://www.coursera.org/account/accomplishments/verify/YB3ZZTJ8WE7Y

3. Google UX Design Professional Certificate
   Issuer: Google (via Coursera)
   Verify: https://www.coursera.org/account/accomplishments/specialization/certificate/BDZVJW5D94HT

4. Google IT Support Professional Certificate
   Issuer: Google (via Coursera)
   Verify: https://www.coursera.org/account/accomplishments/specialization/certificate/E5WWVDFEAM6S
""",

    # ── Services ──────────────────────────────────────────────────────────────
    """
SERVICES OFFERED — Md. Hasan Imon
1. Full-Stack AI/ML Engineering — end-to-end pipelines from raw data to deployable applications
2. Generative AI & Agentic Systems — modular agentic workflows with memory-integrated generative AI
3. Model Fine-Tuning & Optimisation — LLMs fine-tuned with LoRA, QLoRA, PEFT, quantisation
4. Autonomous & Tool-Augmented Reasoning — multi-agent planning with tools and memory
5. Supervised / Unsupervised Deep Learning — structured and unstructured dataset modelling
6. Model Deployment & MLOps — Streamlit, FastAPI, Docker, CI/CD pipeline deployment
""",

    # ── Blog Posts ────────────────────────────────────────────────────────────
    """
BLOG POSTS — Md. Hasan Imon (published on Medium: medium.com/@emon.mlengineer)
1. "TrueWealth-AI: Building an Agentic Financial Strategist" — August 10, 2025
   About: Designing a multi-agent system (Planner, Tool, Memory) with LangGraph for portfolio
   analysis, market data retrieval via tools, and explainable goal-aware recommendations.

2. "MediGenius: Tool-Augmented Clinical Reasoning" — July 22, 2025
   About: Architecture of MediGenius — symptom triage agent, RAG grounding on medical guidelines,
   citation fidelity checks, and safety fallback policies.

3. "InformaTruth: Verifying News with Fine-Tuned LLMs" — June 30, 2025
   About: Pipeline for claim parsing, fine-tuning, reranking, and structured evidence scoring —
   plus AgentOps traces and reliability evaluation with fine-tuned LLMs.
""",

    # ── Stats ─────────────────────────────────────────────────────────────────
    """
STATS & HIGHLIGHTS — Md. Hasan Imon
- 31 projects completed to date
- 30+ projects delivered for clients and open-source
- 5 clients served
- 4 partners collaborated with
- 192 cups of coffee consumed (a testament to dedication!)
- Currently open to: freelance projects, full-time roles, research collaborations
- Resume: available on the portfolio website
""",

]
