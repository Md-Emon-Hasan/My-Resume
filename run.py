#!/usr/bin/env python3
"""
Local development server runner.
Usage:  python run.py
        (set GROQ_API_KEY in environment first)
"""

import sys
import os
from dotenv import load_dotenv

# Ensure project root is on path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load environment variables from .env file
load_dotenv()

from backend.config import HOST, PORT, GROQ_API_KEY

if not GROQ_API_KEY:
    print("=" * 60)
    print("  WARNING: GROQ_API_KEY is not set!")
    print("  The chatbot will return 503 errors until it is set.")
    print()
    print("  Set it with:")
    print("    Windows PowerShell: $env:GROQ_API_KEY='your_key_here'")
    print("    Linux / macOS:      export GROQ_API_KEY='your_key_here'")
    print()
    print("  Get a free key at: https://console.groq.com/keys")
    print("=" * 60)
    print()

from api.index import app
from flask import send_from_directory

# Serve the static frontend for local development
@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    print(f"Starting AI Assistant API on http://localhost:{PORT}")
    print("Press Ctrl+C to stop.\n")
    app.run(host=HOST, port=PORT, debug=True)
