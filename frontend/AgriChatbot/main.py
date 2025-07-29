# Main entry point - imports the Flask app from expert-sug.py
import subprocess
import sys
import os

# Simply execute the expert-sug.py file directly
if __name__ == '__main__':
    # Run expert-sug.py directly
    subprocess.run([sys.executable, 'expert-sug.py'])
else:
    # For Gunicorn, we need to import the app
    import importlib.util
    spec = importlib.util.spec_from_file_location("expert_sug", "expert-sug.py")
    expert_sug = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(expert_sug)
    app = expert_sug.app