"""
BM25-based RAG engine — lightweight, no GPU.
Uses rank-bm25 for keyword-weighted retrieval over PORTFOLIO_DOCS.
"""

import re
from typing import List
from rank_bm25 import BM25Okapi


class RAGEngine:
    def __init__(self, docs: List[str]):
        self._docs = docs
        tokenized = [self._tokenize(d) for d in docs]
        self._bm25 = BM25Okapi(tokenized)

    def _tokenize(self, text: str) -> List[str]:
        cleaned = re.sub(r'[^a-zA-Z0-9 ]', ' ', text.lower())
        return [t for t in cleaned.split() if len(t) > 1]

    def retrieve(self, query: str, k: int = 4) -> str:
        """Return the top-k most relevant document chunks joined as context."""
        tokens = self._tokenize(query)
        if not tokens:
            return ""

        scores = self._bm25.get_scores(tokens)
        top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:k]

        relevant = [
            self._docs[i].strip()
            for i in top_indices
            if scores[i] > 0.0
        ]
        return "\n\n---\n\n".join(relevant)
