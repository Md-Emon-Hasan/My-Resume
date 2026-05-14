"""
Flask API entry point — Vercel serverless function and local dev server.
Routes:
  POST /api/chat    → AI assistant response
  GET  /api/health  → service health check
"""

import sys
import os

# Ensure project root is on the path so backend.* imports resolve on Vercel
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from flask import Flask, request, jsonify
from flask_cors import CORS

from backend.config import GROQ_API_KEY
from backend.knowledge import PORTFOLIO_DOCS
from backend.rag import RAGEngine
from backend.chat import ChatEngine

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialise RAG and chat engines once at module load (warm on first request on Vercel)
_rag  = RAGEngine(PORTFOLIO_DOCS)
_chat = ChatEngine(_rag)


@app.route("/api/chat", methods=["POST"])
def chat():
    data    = request.get_json(force=True, silent=True) or {}
    message = (data.get("message") or "").strip()
    history = data.get("history") or []

    if not message:
        return jsonify({"error": "message field is required"}), 400

    if not GROQ_API_KEY:
        return jsonify({
            "error": "GROQ_API_KEY environment variable is not set on the server."
        }), 503

    try:
        reply = _chat.chat(message, history)
        return jsonify({"reply": reply})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model":  "llama-3.3-70b-versatile",
        "docs":   len(PORTFOLIO_DOCS),
    })


if __name__ == "__main__":
    from backend.config import HOST, PORT
    app.run(host=HOST, port=PORT, debug=True)
