'use strict';

// This is the single factual source for chatbot answers. Keep it in sync with
// the information displayed in index.html and the downloadable resume.
const PORTFOLIO_DOCS = [
  `
PROFILE & CONTACT — Md. Hasan Imon
Full name: Md. Hasan Imon (also written as Md Emon Hasan).
Professional title: AI/ML Engineer; portfolio focus includes AI engineering, ML engineering, NLP engineering, backend, and MLOps.
Location: Savar, Dhaka, Bangladesh.
Email: emon.mlengineer@gmail.com.
Phone and WhatsApp: +880 1834-363533.
LinkedIn: https://www.linkedin.com/in/md-emon-hasan-695483237/
GitHub: https://github.com/Md-Emon-Hasan
Kaggle: https://www.kaggle.com/mdhasanimon
Medium: https://medium.com/@emon.mlengineer
Facebook: https://www.facebook.com/mdemon.hasan2001/
Instagram: https://www.instagram.com/md_emon_hasan01/
`,
  `
PROFESSIONAL SUMMARY — Md. Hasan Imon
AI/ML Engineer from Bangladesh specialising in Machine Learning, NLP, Deep Learning, Generative AI, LLM fine-tuning (LoRA/QLoRA), Agentic RAG pipelines, and vector databases.
Builds and deploys end-to-end, multi-agent, tool-augmented AI systems. Works with FastAPI, Flask, Docker, CI/CD, and Backend-as-a-Service (BaaS) to create modular, deployable systems.
The portfolio states that he has delivered 30+ projects and is open to collaborations, freelance work, and new opportunities.
`,
  `
WORK EXPERIENCE — AutoMetaHQ
Role: Machine Learning Engineer.
Period shown on the portfolio: April 2026 – Present.
Location: London, UK (Remote).
Company website: https://www.autometahq.com/
Role highlights:
- Engineering high-performance data pipelines and architecting large-scale data-handling systems for production AI environments.
- Optimising end-to-end ML workflows, including the design and training of advanced neural architectures.
- Implementing LLM fine-tuning and training strategies to improve efficiency, accuracy, and latency.
- Streamlining data-centric optimisation and deploying robust inference pipelines with cloud-native infrastructure.
`,
  `
WORK EXPERIENCE — Codixel
Role: Junior Machine Learning Engineer.
Period shown on the portfolio: January 2026 – Present.
Location: Dhaka, Bangladesh.
Company website: https://codixel.tech/
Role highlights:
- Architecting production-grade multi-agent AI systems and agentic workflows with LangGraph and AgentOps orchestration.
- Engineering tool-augmented pipelines for complex data retrieval and integrating memory-driven reasoning systems.
- Working on LLM fine-tuning and optimisation for specialised domains, including intelligent financial advisors and medical assistants.
- Focusing on high-fidelity outputs and efficient training cycles.
`,
  `
WORK EXPERIENCE — Hi-TechParks
Role: Intern Machine Learning Engineer.
Period shown on the portfolio: October 2025 – December 2025.
Location: Dhaka, Bangladesh.
Company website: https://www.hitechparks.com/
Role highlights:
- Designed and deployed backend-centric AI/ML systems focused on scalable data pipelines and RAG workflows.
- Implemented end-to-end inference services and optimised model performance.
- Managed modular AI backends using Python.
- Streamlined data preprocessing and model-serving layers for efficient production execution.
`,
  `
EDUCATION — Md. Hasan Imon
Bachelor of Science in Computer Science and Engineering, City University, Dhaka, Bangladesh.
Academic years shown on the portfolio: 2022 – 2025. Focus: Software Engineering principles and real-world applications; he built AI systems, participated in research, and contributed to open-source AI/ML projects during these years.
Honours shown: four consecutive scholarships for Machine Learning and project performance, plus a Merit Scholarship for academic excellence.
Higher Secondary Certificate: science subjects including Physics, Chemistry, Mathematics, and Biology.
Secondary School Certificate: completed under the Dinajpur Board.
`,
  `
SKILLS — AI, ML & NLP
Agentic AI: LangChain, LangGraph, LangSmith, AgentOps, Agentic RAG, multi-agent systems, agent orchestration, reasoning and planning, tool calling, long-term memory, CrewAI, and AutoGen.
LLM work: PEFT, LoRA, QLoRA, SFT, RLHF, DPO, quantisation, instruction tuning, vLLM optimisation, mixed precision, and model evaluation.
NLP: Transformers, Hugging Face, SentenceTransformers, embeddings, semantic search, BPE tokenisation, attention mechanisms, NER/POS, spaCy, and NLTK.
Machine and deep learning: PyTorch, TensorFlow, Scikit-learn, CNN/RNN, LSTM/GRU, XGBoost, LightGBM, hyperparameter tuning, transfer learning, and neural architectures.
`,
  `
SKILLS — DATA, SOFTWARE & DEPLOYMENT
Data science: NumPy, Pandas, EDA and wrangling, statistical analysis, hypothesis testing, Matplotlib, Seaborn, feature engineering, time-series analysis, and Plotly.
Vector retrieval: FAISS, ChromaDB, Pinecone, Qdrant, Milvus, Weaviate, Redis retrieval, and hybrid search.
Software engineering: Python, C++, TypeScript/JavaScript, FastAPI, Flask, PostgreSQL, NoSQL, REST, WebSockets, React, Vite, Tailwind CSS, OOP, and design patterns.
Deployment and MLOps: Docker/Compose, CI/CD, GitHub Actions, AgentOps, monitoring/logging, MLflow, Weights & Biases, Linux/Nginx, AWS, and GCP.
`,
  `
PROJECT — MediGenius
Category: Artificial Intelligence, Multi-Agent Medical System.
Description: Enterprise-grade medical AI system using LangGraph orchestration, retrieval grounding, tool routing, and doctor-like reasoning pipelines.
Technology stack shown: HumanLoop, VectorDB, RAG, LangGraph, FastAPI, and LLMs.
Repository: https://github.com/Md-Emon-Hasan/MediGenius.git
`,
  `
PROJECT — InformaTruth
Category: Machine Learning, NLP, Fine-Tuning, Fake-News Detection.
Description: Fine-tuned multi-agent fake-news detection system with explainable AI, RAG verification, source validation, and trust-aware reasoning.
Technology stack shown: Fine-Tuned LLM, Multi-Agent, VectorDB, LangGraph, AgentOps, and NLP.
Repository: https://github.com/Md-Emon-Hasan/InformaTruth.git
`,
  `
PROJECT — BookSage AI
Category: Machine Learning, Data Science, Recommendation System.
Description: Hybrid recommendation engine combining collaborative filtering, content-based intelligence, ranking optimisation, and scalable personalisation using TF-IDF and KNN.
Technology stack shown: Collaborative Filtering, KNN, TF-IDF, Scikit-learn, Pandas, and Flask.
Repository: https://github.com/Md-Emon-Hasan/BookSage-AI.git
`,
  `
PROJECT — Translatica
Category: Machine Learning, NLP, Fine-Tuning, Machine Translation.
Description: Fine-tuned English-to-Spanish translation system using Seq2Seq Transformers with LoRA/PEFT optimisation, context-aware generation, and production-ready multilingual inference.
Technology stack shown: Transformers, LoRA, PEFT, Seq2Seq, Hugging Face, and fine-tuning.
Repository: https://github.com/Md-Emon-Hasan/Translatica.git
`,
  `
PROJECT — AutoDocThinker
Category: Artificial Intelligence, Agentic RAG, Enterprise Document System.
Description: Agentic RAG that ingests PDFs, DOCX files, URLs, and raw text into a hybrid-search index using BM25, RRF, and CrossEncoder. It supports four selectable LangGraph workflows: Naive, Advanced, CRAG, and Self-RAG.
Technology stack and concepts shown: BM25, corrective RAG, advanced RAG, self-RAG, Agentic AI, and CRAG.
Repository: https://github.com/Md-Emon-Hasan/AutoDocThinker.git
`,
  `
PROJECT — FraudChurn-Nexus
Category: Data Science, Machine Learning, Classification/Regression.
Description: Multimodal AI system detecting e-commerce fraud and predicting customer churn using machine-learning and data-engineering techniques.
Technology stack shown: EDA, feature engineering, Scikit-learn, Pandas, Matplotlib, and prediction.
Repository: https://github.com/Md-Emon-Hasan/FraudChurn-Nexus
`,
  `
PROJECT — TrueWealth-AI
Category: Artificial Intelligence, Agentic AI, Financial Analysis.
Description: AI-powered financial strategist — a multi-agent system with memory-driven reasoning, portfolio analysis, market analysis, and adaptive decision workflows.
Technology stack shown: Agentic AI, LangGraph, RAG, Vector DB, FastAPI, and memory.
Repository: https://github.com/Md-Emon-Hasan/TrueWealth-AI.git
`,
  `
PROJECT — Factify
Category: Data Science, Deep Learning, Fact-Checking.
Description: Fact-checking and data-verification pipeline with deep-learning models, explainable predictions, statistical analysis, visualisation, and automated insight generation.
Technology stack shown: statistical analysis, data visualisation, Pandas, Seaborn, Plotly, and insights.
Repository: https://github.com/Md-Emon-Hasan/Factify
`,
  `
CERTIFICATIONS — Md. Hasan Imon
1. Machine Learning Specialisation — Stanford University via Coursera; type: Specialisation; domain: AI & ML.
   Verify: https://www.coursera.org/account/accomplishments/specialization/W5FZ8XQJZFP3
2. Programming for Everybody — University of Michigan via Coursera; type: Certificate; domain: Python.
   Verify: https://www.coursera.org/account/accomplishments/verify/YB3ZZTJ8WE7Y
3. Google UX Design Professional Certificate — Google via Coursera; type: Professional Certificate; domain: UX Design.
   Verify: https://www.coursera.org/account/accomplishments/specialization/certificate/BDZVJW5D94HT
4. Google IT Support Professional Certificate — Google via Coursera; type: Professional Certificate; domain: IT Support.
   Verify: https://www.coursera.org/account/accomplishments/specialization/certificate/E5WWVDFEAM6S
`,
  `
PORTFOLIO STATS
The portfolio counter displays: 31 projects, 5 clients, 4 partners, and 192 cups of coffee.
The portfolio introduction also states that 30+ projects have been delivered successfully. Use the exact wording that matches the user's question; do not invent a different count.
`,
];

module.exports = { PORTFOLIO_DOCS };
