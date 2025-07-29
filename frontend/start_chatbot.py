"""
Test script to start the Flask backend and verify functionality
"""
import os
import sys

# Change to the correct directory
chatbot_dir = r"c:\Users\Subas\dynamos\Frontend\AgriChatbot"
os.chdir(chatbot_dir)

# Add the directory to Python path
sys.path.insert(0, chatbot_dir)

# Import and run the Flask app
try:
    # Import the expert-sug module by file path
    import importlib.util
    spec = importlib.util.spec_from_file_location("expert_sug", os.path.join(chatbot_dir, "expert-sug.py"))
    expert_sug = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(expert_sug)
    
    app = expert_sug.app
    print("🌾 Starting Agriculture Chatbot Backend...")
    print("📍 Server will run on: http://localhost:5000")
    print("📖 Expert Suggestions available at: http://localhost:5000/AgriChatbot/AgriChatbot/expert-sug.html")
    print("🔑 Using configured API keys")
    print("\n" + "="*50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure you're running this from the correct directory")
except Exception as e:
    print(f"❌ Error starting server: {e}")
    print("Check your Python environment and dependencies")