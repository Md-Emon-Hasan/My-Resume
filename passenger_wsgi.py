"""
cPanel / shared hosting WSGI entry point.

Most shared hosting providers that support Python look for this file when
starting the app through Passenger. It exposes the Flask app as `application`.
"""

import os
import sys

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from run import app as application
