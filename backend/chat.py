"""
ChatEngine — wraps LangChain + Groq with RAG context injection.
"""

from typing import List, Optional
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from pydantic import SecretStr

from backend.config import GROQ_API_KEY, GROQ_MODEL, SYSTEM_PROMPT, MAX_HISTORY
from backend.rag import RAGEngine


class ChatEngine:
    def __init__(self, rag_engine: RAGEngine):
        self._rag = rag_engine
        self._llm = None  # lazy-initialised on first chat() call

    def _get_llm(self) -> ChatGroq:
        if self._llm is None:
            self._llm = ChatGroq(
                api_key=SecretStr(GROQ_API_KEY) if GROQ_API_KEY else None,  # type: ignore[arg-type]
                model=GROQ_MODEL,
                temperature=0.65,
                max_tokens=200,
            )
        return self._llm

    def chat(self, message: str, history: Optional[List[dict]] = None) -> str:
        """
        Generate a response for `message`, injecting RAG context and conversation history.

        history: list of {'role': 'user'|'assistant', 'content': str}
        """
        context = self._rag.retrieve(message)

        # Build system prompt — append retrieved context when available
        system_content = SYSTEM_PROMPT
        if context:
            system_content += f"\n\n## Retrieved Portfolio Context\n{context}"

        messages: list = [SystemMessage(content=system_content)]

        # Inject recent conversation history
        if history:
            for turn in history[-(MAX_HISTORY):]:
                role    = turn.get("role", "")
                content = turn.get("content", "").strip()
                if not content:
                    continue
                if role == "user":
                    messages.append(HumanMessage(content=content))
                elif role == "assistant":
                    messages.append(AIMessage(content=content))

        messages.append(HumanMessage(content=message))

        response = self._get_llm().invoke(messages)
        content = response.content
        return content.strip() if isinstance(content, str) else str(content)
