
#!/usr/bin/env python3
"""
Startup script for Agriculture Expert Backend
"""
import os
import sys
import subprocess

def install_requirements():
    """Install required packages"""
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✅ Requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def start_server():
    """Start the Flask server"""
    try:
        print("🌾 Starting Agriculture Expert Backend...")
        subprocess.run([sys.executable, 'expert-sug.py'])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == '__main__':
    print("🚀 AgriChatbot Backend Initialization")
    print("="*40)
    
    # Change to backend directory
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(backend_dir)
    
    # Install requirements
    if install_requirements():
        # Start server
        start_server()
    else:
        print("❌ Failed to install requirements. Please check your Python environment.")
        sys.exit(1)
