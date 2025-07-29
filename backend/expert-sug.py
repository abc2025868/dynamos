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

# Set Gemini API key directly from user prompt (for demo purposes)
os.environ['GEMINI_API_KEY'] = "AIzaSyCDB0InOnWW34Ec8ess_XP800zByldy6FM"

# Configure Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

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
# Add Azure Translator API key and region from user prompt
os.environ['AZURE_TRANSLATOR_KEY'] = "7b55hs2ooc2j1qKh8ZPIsd8uWZSnmZ7kGmGWoctle7kYjL4dVmoNJQQJ99BGACGhslBXJ3w3AAAbACOG3AST"
os.environ['AZURE_TRANSLATOR_REGION'] = "centralindia"
class AzureTranslator:
    def __init__(self):
        self.key = os.getenv('AZURE_TRANSLATOR_KEY')
        self.region = os.getenv('AZURE_TRANSLATOR_REGION', 'eastus')
        self.endpoint = "https://api.cognitive.microsofttranslator.com"
    
    def detect_language(self, text):
        """Detect the language of input text"""
        if not self.key:
            return 'en'  # Default to English if no key
            
        url = f"{self.endpoint}/detect?api-version=3.0"
        headers = {
            'Ocp-Apim-Subscription-Key': self.key,
            'Ocp-Apim-Subscription-Region': self.region,
            'Content-type': 'application/json'
        }
        body = [{'text': text}]
        
        try:
            response = requests.post(url, headers=headers, json=body, timeout=10)
            result = response.json()
            detected_lang = result[0]['language'] if result else 'en'
            # Map Tamil variants to 'ta'
            if detected_lang in ['ta', 'ta-IN']:
                return 'ta'
            return 'en'
        except Exception as e:
            logging.error(f"Language detection error: {e}")
            return 'en'  # Default to English on error
    
    def translate_text(self, text, target_language):
        """Translate text to target language"""
        if not self.key or target_language == 'en':
            return text  # Return original if no key or target is English
            
        url = f"{self.endpoint}/translate?api-version=3.0&to={target_language}"
        headers = {
            'Ocp-Apim-Subscription-Key': self.key,
            'Ocp-Apim-Subscription-Region': self.region,
            'Content-type': 'application/json'
        }
        body = [{'text': text}]
        
        try:
            response = requests.post(url, headers=headers, json=body, timeout=10)
            result = response.json()
            return result[0]['translations'][0]['text'] if result else text
        except Exception as e:
            logging.error(f"Translation error: {e}")
            return text  # Return original on error

class AgricultureChatbot:
    def __init__(self):
        self.translator = AzureTranslator()
    
    def get_agriculture_advice(self, query, user_language='auto'):
        """Get agricultural advice from Gemini AI with language detection and translation"""
        try:
            # Detect user's language if not specified
            if user_language == 'auto':
                user_language = self.translator.detect_language(query)
            
            # Always query Gemini in English for better agricultural knowledge
            query_in_english = query
            if user_language == 'ta':
                # Translate Tamil query to English for better Gemini understanding
                query_in_english = self.translator.translate_text(query, 'en')
            
            enhanced_query = f"Agricultural Query: {query_in_english}\n\nPlease provide advice specific to Tamil Nadu farming conditions and practices. Respond in English."
            
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(f"{AGRICULTURAL_SYSTEM_PROMPT}\n\n{enhanced_query}")
            
            ai_response = response.text or "I apologize, but I'm unable to provide advice at the moment. Please try again."
            
            # Translate response back to user's language if needed
            if user_language == 'ta':
                ai_response = self.translator.translate_text(ai_response, 'ta')
            
            return ai_response
        
        except Exception as e:
            logging.error(f"Gemini API error: {e}")
            error_msg = "Unable to get agricultural advice. Please check your connection and try again."
            if user_language == 'ta':
                error_msg = self.translator.translate_text(error_msg, 'ta')
            return error_msg
    
    def analyze_crop_image(self, image_data, query="Analyze this crop image for diseases or issues", user_language='auto'):
        """Analyze crop image for diseases and issues with language support"""
        try:
            logging.info("Starting crop image analysis")
            
            # Configure the model for vision tasks
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            # Decode base64 image
            import base64
            from PIL import Image
            import io
            
            # Convert base64 to image
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Enhanced prompt for better crop analysis
            enhanced_prompt = f"""
            You are an expert agricultural consultant specializing in Tamil Nadu farming. 
            Analyze this crop image and provide detailed, practical advice.
            
            User Query: {query}
            
            Please provide:
            1. **Crop Identification**: What crop is this?
            2. **Health Assessment**: Overall condition of the plant/crop
            3. **Issues Detected**: Any diseases, pests, nutrient deficiencies, or problems
            4. **Specific Diagnosis**: Detailed identification of any issues
            5. **Treatment Recommendations**: Specific solutions with product names if possible
            6. **Prevention Tips**: How to prevent similar issues
            7. **Tamil Nadu Context**: Region-specific advice considering local conditions
            8. **Next Steps**: Immediate actions the farmer should take
            
            Make your response practical, actionable, and suitable for Tamil Nadu farmers.
            If you detect any serious issues, prioritize those in your response.
            """
            
            # Generate response with image
            response = model.generate_content([enhanced_prompt, image])
            
            if response and response.text:
                result_text = response.text.strip()
                
                # Translate if needed
                if user_language == 'ta':
                    try:
                        result_text = self.translator.translate_text(result_text, 'ta')
                    except:
                        logging.warning("Translation failed, returning English response")
                
                logging.info("Image analysis completed successfully")
                return result_text
            else:
                error_msg = "I can see the image but couldn't analyze it properly. Please try uploading a clearer image of the crop."
                if user_language == 'ta':
                    error_msg = "படத்தை பார்க்க முடிகிறது ஆனால் சரியாக பகுப்பாய்வு செய்ய முடியவில்லை. தயவுசெய்து பயிரின் தெளிவான படத்தை பதிவேற்றவும்."
                return error_msg
                
        except Exception as e:
            logging.error(f"Image analysis error: {e}")
            error_msg = "Unable to analyze the crop image. Please ensure the image is clear and try again."
            if user_language == 'ta':
                error_msg = "பயிர் படத்தை பகுப்பாய்வு செய்ய முடியவில்லை. படம் தெளிவாக இருப்பதை உறுதிசெய்து மீண்டும் முயற்சிக்கவும்."
            return error_msg
    
    def get_quick_advice(self, category, user_language='en'):
        """Get quick advice based on category with language support"""
        quick_prompts = {
            'weather': "Provide current weather-based farming advice for Tamil Nadu farmers, including what activities to prioritize based on typical seasonal patterns.",
            'disease': "Explain how to identify common crop diseases in Tamil Nadu and provide a quick identification guide with treatment options.",
            'market': "Give general advice about current market trends for major Tamil Nadu crops and best selling strategies.",
            'schemes': "Summarize the key government schemes and subsidies currently available for Tamil Nadu farmers.",
            'fertilizer': "Provide guidance on appropriate fertilizer use for major crops in Tamil Nadu, considering soil conditions and seasonal requirements."
        }
        
        prompt = quick_prompts.get(category, quick_prompts['weather'])
        return self.get_agriculture_advice(prompt, user_language)

# Initialize chatbot
chatbot = AgricultureChatbot()

@app.route('/api/chat/<session_id>', methods=['GET'])
def get_chat_history(session_id):
    """Get chat history for a session"""
    messages = chat_sessions.get(session_id, [])
    return jsonify(messages)

@app.route('/api/chat/message', methods=['POST'])
def send_message():
    """Send a message and get AI response with automatic language detection"""
    try:
        data = request.json
        session_id = data.get('sessionId')
        content = data.get('content')
        selected_language = data.get('language', 'auto')
        image_data = data.get('imageData')
        
        if not session_id:
            return jsonify({'error': 'Session ID is required'}), 400
        
        # Initialize session if it doesn't exist
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Handle image analysis
        if image_data:
            logging.info("Processing image analysis request")
            
            # Use the image analysis method from chatbot
            if content and content != 'Please analyze this crop image':
                # User provided specific question about the image
                response = chatbot.analyze_crop_image(image_data, content, selected_language)
            else:
                # General image analysis
                analysis_prompt = """Analyze this crop image and provide detailed information about:
1. Crop identification
2. Overall health assessment
3. Any visible diseases, pests, or issues
4. Recommendations for treatment or care
5. Tamil Nadu specific farming advice if applicable

Please be specific and practical in your recommendations."""
                response = chatbot.analyze_crop_image(image_data, analysis_prompt, selected_language)
        else:
            # Regular text message
            if not content:
                return jsonify({'error': 'Content is required'}), 400
            
            response = chatbot.get_agriculture_advice(content, selected_language)
        
        # Store user message
        user_message = {
            'role': 'user',
            'content': content or 'Image uploaded for analysis',
            'timestamp': datetime.now().isoformat(),
            'imageData': image_data if image_data else None
        }
        chat_sessions[session_id].append(user_message)
        
        # Store assistant response
        assistant_message = {
            'role': 'assistant',
            'content': response,
            'timestamp': datetime.now().isoformat()
        }
        chat_sessions[session_id].append(assistant_message)
        
        return jsonify({
            'success': True,
            'userMessage': user_message,
            'assistantMessage': assistant_message
        })
        
    except Exception as e:
        logging.error(f"Error in send_message: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/chat/quick-advice', methods=['POST'])
def get_quick_advice():
    """Get quick advice based on category with language support"""
    try:
        data = request.json
        category = data.get('category')
        session_id = data.get('sessionId')
        selected_language = data.get('language', 'en')
        
        if not category or not session_id:
            return jsonify({'error': 'Category and sessionId are required'}), 400
        
        # Initialize session if not exists
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Get advice with language support
        advice = chatbot.get_quick_advice(category, selected_language)
        
        # Create assistant message
        assistant_message = {
            'id': len(chat_sessions[session_id]) + 1,
            'sessionId': session_id,
            'role': 'assistant',
            'content': advice,
            'timestamp': datetime.now().isoformat(),
            'language': selected_language
        }
        
        # Save assistant message
        chat_sessions[session_id].append(assistant_message)
        
        return jsonify({
            'message': assistant_message
        })
    
    except Exception as e:
        logging.error(f"Quick advice error: {e}")
        return jsonify({'error': 'Failed to get quick advice'}), 500

@app.route('/api/chat/<session_id>', methods=['DELETE'])
def clear_chat(session_id):
    """Clear chat history for a session"""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    return jsonify({'message': 'Chat history cleared'})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/upload/audio', methods=['POST'])
def upload_audio():
    """Handle audio file upload and transcription"""
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        audio_file = request.files['audio']
        if audio_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # For now, return a mock transcription since we don't have a transcription service
        # In a real implementation, you would use services like Google Speech-to-Text,
        # Azure Speech Services, or other transcription APIs
        
        # Mock transcription based on file type
        mock_transcriptions = [
            "What is the best fertilizer for paddy crops?",
            "How to identify leaf blight disease in rice?",
            "Current weather forecast for farming activities",
            "Government schemes for organic farming",
            "Market prices for groundnut this season"
        ]
        
        import random
        mock_text = random.choice(mock_transcriptions)
        
        return jsonify({
            'success': True,
            'transcribedText': mock_text,
            'message': 'Audio transcribed successfully (mock implementation)'
        })
        
    except Exception as e:
        logging.error(f"Audio upload error: {e}")
        return jsonify({'error': 'Failed to process audio file'}), 500

import requests

@app.route('/api/tts', methods=['POST'])
def azure_tts():
    """Convert text to speech using Azure Speech Service"""
    try:
        data = request.json
        text = data.get('text')
        language = data.get('language', 'en-US')
        if not text:
            return jsonify({'error': 'Text is required'}), 400

        # Azure Speech config
        key = os.environ.get('AZURE_SPEECH_KEY')
        region = os.environ.get('AZURE_SPEECH_REGION', 'eastus')
        endpoint = f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1"

        # Choose voice
        if language == 'ta-IN':
            voice = 'ta-IN-PallaviNeural'
        else:
            voice = 'en-US-JennyNeural'

        headers = {
            'Ocp-Apim-Subscription-Key': key,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
        }
        ssml = f"""
        <speak version='1.0' xml:lang='{language}'>
            <voice xml:lang='{language}' name='{voice}'>{text}</voice>
        </speak>
        """

        response = requests.post(endpoint, headers=headers, data=ssml.encode('utf-8'))
        if response.status_code == 200:
            return send_file(
                io.BytesIO(response.content),
                mimetype='audio/mpeg',
                as_attachment=False,
                download_name='speech.mp3'
            )
        else:
            return jsonify({'error': 'Azure TTS failed', 'details': response.text}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Frontend routes - serve HTML files
@app.route('/expert-suggestions')
def expert_suggestions():
    """Serve the expert suggestions page"""
    try:
        with open('expert-sug.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
        return html_content
    except FileNotFoundError:
        return "Expert suggestions page not found", 404

@app.route('/expert-sug.css')
def expert_css():
    """Serve the expert suggestions CSS"""
    try:
        return send_file('expert-sug.css', mimetype='text/css')
    except FileNotFoundError:
        return "CSS file not found", 404

@app.route('/expert-sug.js')
def expert_js():
    """Serve the expert suggestions JavaScript"""
    try:
        return send_file('expert-sug.js', mimetype='application/javascript')
    except FileNotFoundError:
        return "JavaScript file not found", 404

@app.route('/')
def index():
    """Serve a simple index page with links to available endpoints"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Agriculture Chatbot Backend</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2e7d32; }
            .endpoint { background: #e8f5e9; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .method { background: #4caf50; color: white; padding: 4px 8px; border-radius: 3px; font-size: 12px; }
            a { color: #2e7d32; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌾 Agriculture Chatbot Backend</h1>
            <p>Flask backend server for the Agriculture Chatbot application</p>
            
            <h2>Available Endpoints:</h2>
            
            <div class="endpoint">
                <strong><span class="method">GET</span> <a href="/expert-suggestions">/expert-suggestions</a></strong>
                <p>Expert suggestions chatbot interface</p>
            </div>
            
            <div class="endpoint">
                <strong><span class="method">POST</span> /api/chat/message</strong>
                <p>Send chat messages to the agricultural assistant</p>
            </div>
            
            <div class="endpoint">
                <strong><span class="method">GET</span> /api/chat/&lt;session_id&gt;</strong>
                <p>Get chat history for a session</p>
            </div>
            
            <div class="endpoint">
                <strong><span class="method">POST</span> /api/chat/quick-advice</strong>
                <p>Get quick advice based on category</p>
            </div>
            
            <div class="endpoint">
                <strong><span class="method">GET</span> <a href="/api/health">/api/health</a></strong>
                <p>Health check endpoint</p>
            </div>
            
            <h2>Frontend Integration:</h2>
            <p>To integrate with your frontend, update the URLs to point to:</p>
            <ul>
                <li><strong>Expert Suggestions:</strong> <code>http://localhost:3000/expert-suggestions</code></li>
                <li><strong>API Base URL:</strong> <code>http://localhost:3000/api</code></li>
            </ul>
        </div>
    </body>
    </html>
    """
    return html_content

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    logging.error(f"Internal server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🌾 Agriculture Chatbot Backend Starting...")
    print("📍 Server running on: http://localhost:5000")
    print("📖 Open your browser and visit the URL above")
    print("🔑 Using GEMINI_API_KEY from environment variables")
    
    app.run(host='0.0.0.0', port=3000, debug=True)
