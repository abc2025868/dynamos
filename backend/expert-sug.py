"""
Agriculture Chatbot Backend - Complete Flask Application
A specialized agricultural assistant for Tamil Nadu farmers with multi-language support
"""

import os
import json
import base64
import requests
import logging
from datetime import datetime
from flask import Flask, request, jsonify, send_file, render_template_string, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
from PIL import Image
import io

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "agriculture_chatbot_secret_key")
CORS(app)

# Set API keys from environment variables
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
AZURE_TRANSLATOR_KEY = os.environ.get('AZURE_TRANSLATOR_KEY')
AZURE_TRANSLATOR_REGION = os.environ.get('AZURE_TRANSLATOR_REGION', 'centralindia')

# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)

# In-memory storage for chat messages
chat_sessions = {}

# Agricultural expert system prompt
AGRICULTURAL_SYSTEM_PROMPT = """You are an expert agricultural advisor specializing in Tamil Nadu farming practices. You have deep knowledge of:

- Tamil Nadu climate, soil conditions, and seasonal patterns
- Traditional and modern farming techniques used in Tamil Nadu
- Common crops: paddy, sugarcane, cotton, groundnut, millets, pulses
- Pest and disease management specific to Tamil Nadu conditions
- Government schemes and subsidies available to Tamil Nadu farmers
- Weather patterns and monsoon cycles affecting Tamil Nadu agriculture
- Market prices and selling strategies for Tamil Nadu farmers
- Organic farming and sustainable agriculture practices
- Irrigation methods suitable for Tamil Nadu geography

Always provide practical, actionable advice that considers local conditions. When discussing timing, refer to Tamil months and seasons. Be supportive and encouraging while being scientifically accurate. If asked about crop diseases, provide detailed identification tips and treatment options.

Respond in a friendly, knowledgeable manner. If the user asks in Tamil, you may respond in Tamil, but always ensure clarity. Use appropriate agricultural terminology and provide specific guidance relevant to Tamil Nadu farming."""
class AzureTranslator:
    def __init__(self):
        self.key = AZURE_TRANSLATOR_KEY
        self.region = AZURE_TRANSLATOR_REGION
        self
