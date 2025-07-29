# Agriculture Chatbot - Tamil Nadu

## Overview

This is a specialized agricultural chatbot designed for Tamil Nadu farmers, condensed into exactly 4 files for easy website integration. The application provides farming advice, pest management, crop guidance, and agricultural best practices through an interactive chat interface. The system supports multi-language communication, image analysis for crop issues, and voice input capabilities.

## Recent Changes (July 24, 2025)
- ✅ Condensed entire application into exactly 4 files as requested
- ✅ Removed all unnecessary files and dependencies 
- ✅ Fixed Gemini AI integration with proper google-generativeai library
- ✅ Simplified Flask file serving without templates directory
- ✅ Application successfully running and tested

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology**: Vanilla HTML, CSS, and JavaScript
- **Design**: Single-page application with responsive design
- **UI Framework**: Custom CSS with Poppins font and Font Awesome icons
- **Components**: 
  - Chat interface with message bubbles
  - Image upload functionality
  - Voice input/recording capabilities
  - Language toggle system
  - Export/import chat features

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **API Design**: RESTful endpoints for chat interactions
- **AI Integration**: Google Gemini AI for agricultural expertise
- **File Handling**: Support for image and audio file uploads
- **Session Management**: In-memory chat session storage

### Key Design Decisions

1. **Monolithic Frontend**: Single HTML file with embedded JavaScript for simplicity and easy deployment
2. **Flask Backend**: Chosen for rapid development and Python's excellent AI/ML library ecosystem
3. **In-Memory Storage**: Chat sessions stored in memory for quick access (data is not persistent across server restarts)
4. **Direct AI Integration**: Direct integration with Google Gemini AI without additional abstraction layers

## Key Components

### Frontend Components
- **Chat Interface**: Real-time messaging with typing indicators and message status
- **Image Upload**: Drag-and-drop and click-to-upload image functionality
- **Voice Input**: Audio recording and speech-to-text conversion
- **Language Support**: Multi-language toggle with auto-detection
- **Export Features**: Chat history export functionality

### Backend Components
- **Chat API**: Handles message processing and AI responses
- **File Upload Handler**: Processes image and audio uploads
- **AI Service**: Integrates with Google Gemini for agricultural expertise
- **Translation Service**: Azure Translator integration (partially implemented)

### Agricultural Expertise System
- **Specialized Prompt**: Custom system prompt focused on Tamil Nadu farming
- **Local Knowledge**: Includes region-specific crops, climate, and practices
- **Government Schemes**: Knowledge of local agricultural subsidies and programs

## Data Flow

1. **User Input**: User types message, uploads image, or records voice
2. **Frontend Processing**: Input validation and formatting
3. **API Request**: Data sent to Flask backend via REST API
4. **AI Processing**: Gemini AI analyzes input and generates agricultural advice
5. **Response Delivery**: AI response formatted and sent back to frontend
6. **UI Update**: Chat interface updated with new messages

### Image Analysis Flow
1. User uploads crop/soil image
2. Image encoded to base64 and sent to backend
3. Gemini AI analyzes image for agricultural insights
4. AI provides diagnosis and recommendations
5. Response displayed in chat interface

## External Dependencies

### AI Services
- **Google Gemini AI**: Primary AI service for agricultural expertise
- **API Key Required**: GEMINI_API_KEY environment variable

### Translation Services
- **Azure Translator**: For multi-language support (optional)
- **Configuration**: AZURE_TRANSLATOR_KEY and AZURE_TRANSLATOR_REGION

### Frontend Dependencies
- **Google Fonts**: Poppins font family
- **Font Awesome**: Icon library for UI elements
- **Browser APIs**: Speech Recognition, Media Recorder for voice features

### Backend Dependencies
- **Flask**: Web framework and CORS support
- **Google GenerativeAI**: Python client for Gemini AI
- **SpeechRecognition**: Audio processing for voice input
- **Pydub**: Audio format conversion
- **Requests**: HTTP client for external API calls

## Deployment Strategy

### Development Setup
- **Frontend**: Served directly from Flask static files
- **Backend**: Flask development server on localhost:5000
- **Configuration**: Environment variables for API keys

### File Structure
- **Static Assets**: CSS, JS, and HTML files in root directory
- **Upload Directory**: Temporary file storage for images/audio
- **Session Storage**: In-memory Python dictionaries

### Environment Variables Required
- `GEMINI_API_KEY`: Google Gemini AI API key
- `AZURE_TRANSLATOR_KEY`: Azure translation service (optional)
- `AZURE_TRANSLATOR_REGION`: Azure service region (optional)
- `SESSION_SECRET`: Flask session secret key

### Scaling Considerations
- **Database Migration**: Current in-memory storage should be replaced with persistent database
- **File Storage**: Upload files should be moved to cloud storage for production
- **Session Management**: Implement proper session persistence for multi-instance deployment
- **Caching**: Add response caching for common agricultural queries

### Security Notes
- **File Upload Validation**: Basic file type and size restrictions implemented
- **CORS Configuration**: Currently allows all origins for development
- **API Key Management**: Keys stored in environment variables
- **Input Sanitization**: Relies on AI service for content filtering