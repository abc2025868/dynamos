/**
 * Agriculture Chatbot Frontend JavaScript
 * Complete functionality for chat, image upload, and voice input
 */

// Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const SESSION_ID = 'chatbot_session_' + Date.now();

// Global variables
let currentLanguage = 'auto';
let selectedImageData = null;
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌾 Agriculture Chatbot Initialized');
    loadChatHistory();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Auto-resize textarea
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('dropdownMenu');
        const menuBtn = document.querySelector('.menu-btn');
        
        if (!menuBtn.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.remove('show');
        }
    });

    // Enable send button only when there's content
    messageInput.addEventListener('input', function() {
        const sendBtn = document.getElementById('sendBtn');
        const hasContent = this.value.trim() || selectedImageData;
        sendBtn.disabled = !hasContent;
    });

    // Voice button event listener
    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if (!isRecognizing) {
                startVoiceRecognition();
            } else {
                stopVoiceRecognition();
            }
        });
    }
}

// Navigation functions
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Language toggle with voice recognition update
function toggleLanguage() {
    const languages = ['auto', 'en', 'ta'];
    const currentIndex = languages.indexOf(currentLanguage);
    currentLanguage = languages[(currentIndex + 1) % languages.length];
    
    // Update display text
    const languageText = document.getElementById('languageText');
    switch (currentLanguage) {
        case 'auto':
            languageText.textContent = 'AUTO';
            console.log('🌐 Language set to AUTO - will detect English/Tamil automatically');
            break;
        case 'en':
            languageText.textContent = 'EN';
            console.log('🇺🇸 Language set to English');
            break;
        case 'ta':
            languageText.textContent = 'தமிழ்';
            console.log('🇮🇳 Language set to Tamil');
            break;
    }
    
    // If currently recording, stop and restart with new language
    if (isRecognizing) {
        console.log('🔄 Restarting voice recognition with new language...');
        stopVoiceRecognition();
        setTimeout(() => {
            startVoiceRecognition();
        }, 500);
    }
}

// Menu functions
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = '';
        
        // Clear from backend
        fetch(`${API_BASE_URL}/chat/${SESSION_ID}`, {
            method: 'DELETE'
        }).catch(console.error);
        
        // Reset UI
        addWelcomeMessage();
        
        // Close menu
        document.getElementById('dropdownMenu').classList.remove('show');
    }
}

function exportChat() {
    const messages = document.querySelectorAll('.message');
    let chatText = 'Agriculture Expert Chat Export\n';
    chatText += '=====================================\n\n';
    
    messages.forEach(message => {
        const isUser = message.classList.contains('user-message');
        const content = message.querySelector('.message-content').textContent;
        const time = message.querySelector('.message-time').textContent;
        
        chatText += `${isUser ? 'You' : 'Agriculture Expert'} (${time}):\n`;
        chatText += `${content}\n\n`;
    });
    
    // Download as text file
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agriculture_chat_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Close menu
    document.getElementById('dropdownMenu').classList.remove('show');
}

// Message handling
function addWelcomeMessage() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = `
        <div class="message assistant-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>வணக்கம்! I'm your Agriculture Expert Assistant. I can help you with:</p>
                <ul>
                    <li>🌾 Crop cultivation advice</li>
                    <li>🌡️ Weather-based farming tips</li>
                    <li>🐛 Pest and disease identification</li>
                    <li>💰 Market price information</li>
                    <li>🏛️ Government scheme guidance</li>
                    <li>📸 Image analysis for crop diseases</li>
                    <li>🎤 Voice input support</li>
                </ul>
                <p><strong>How can I assist you today?</strong></p>
            </div>
            <div class="message-time">Just now</div>
        </div>
    `;
}

function addMessage(content, isUser = false, imageData = null) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.className = `message ${isUser ? 'user-message' : 'assistant-message'}`;
    
    let imageHtml = '';
    if (imageData && isUser) {
        imageHtml = `
            <div class="message-image">
                <img src="data:image/jpeg;base64,${imageData}" 
                     alt="Uploaded crop image" 
                     style="max-width: 200px; border-radius: 8px; margin: 8px 0; cursor: pointer;"
                     onclick="openImageModal(this.src)">
            </div>
        `;
    }
    
    // Format content for better display
    let formattedContent = content;
    if (!isUser) {
        // Convert markdown-style formatting to HTML
        formattedContent = formattedContent
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/(\d+\.)/g, '<br>$1');
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            ${imageHtml}
<div class="message-text">
    ${formattedContent}
    <button class="speak-btn" onclick="speakText(this)" title="Speak">
        <i class="fas fa-volume-up"></i>
    </button>
</div>

        </div>
        <div class="message-time">${timestamp}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to open image in modal (optional enhancement)
function openImageModal(imageSrc) {
    // Create a simple modal to view the full image
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; justify-content: center;
        align-items: center; z-index: 1000; cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px;';
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.onclick = () => document.body.removeChild(modal);
}

// Add typing indicator functions here
function addTypingIndicator() {
    const messagesContainer = document.getElementById('messagesContainer');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message assistant-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}
let currentUtterance = null;

function speakText(button) {
    const messageText = button.parentElement.textContent.trim();
    let lang = 'en-US';
    if (currentLanguage === 'ta') lang = 'ta-IN';
    playAzureTTS(messageText, lang);
}
let currentAudio = null;

async function playAzureTTS(text, lang = 'en-US') {
    try {
        // Stop current audio if playing
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
            return; // Stop playback on second click
        }

        const response = await fetch(`${API_BASE_URL}/tts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, language: lang })
        });
        if (!response.ok) throw new Error('TTS failed');
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        currentAudio = new Audio(audioUrl);
        currentAudio.play();
        currentAudio.onended = () => {
            currentAudio = null;
        };
    } catch (e) {
        alert('Could not play voice output.');
    }
}
// Core messaging
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    
    if (!content && !selectedImageData) {
        return;
    }
    
    // Disable send button and show loading
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    showLoading(true);
    
    try {
        // Determine the message content
        let userMessageContent = content;
        if (selectedImageData && !content) {
            userMessageContent = 'Please analyze this crop image and provide detailed farming advice';
        } else if (selectedImageData && content) {
            userMessageContent = content; // User asked specific question about the image
        }
        
        // Add user message to UI
        addMessage(userMessageContent, true, selectedImageData);
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        const hasImageData = selectedImageData; // Store before removing
        removeImage();
        
        // Show typing indicator
        addTypingIndicator();
        
        // Prepare request data
        const requestData = {
            sessionId: SESSION_ID,
            role: 'user',
            content: userMessageContent,
            language: currentLanguage
        };
        
        if (hasImageData) {
            requestData.imageData = hasImageData;
        }
        
        // Send to backend
        const response = await fetch(`${API_BASE_URL}/chat/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response
         // Add AI response
         if (data.assistantMessage && data.assistantMessage.content) {
            // Format the response for better readability
            let formattedResponse = data.assistantMessage.content;
            
            // If it's an image analysis, make it more readable
            if (hasImageData) {
                formattedResponse = formatImageAnalysisResponse(formattedResponse);
            }
            
            addMessage(formattedResponse, false);
        } else {
            addMessage('Sorry, I encountered an error processing your request.', false);
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        removeTypingIndicator();
        addMessage('Sorry, there was an error connecting to the service. Please try again.', false);
    } finally {
        showLoading(false);
        sendBtn.disabled = false;
    }
}

// New function to format image analysis responses
function formatImageAnalysisResponse(response) {
    // Add some basic formatting for better readability
    let formatted = response;
    
    // Add emoji indicators for different sections
    formatted = formatted.replace(/(\*\*Crop Identification\*\*|Crop Identification:)/gi, '🌾 **Crop Identification**');
    formatted = formatted.replace(/(\*\*Health Assessment\*\*|Health Assessment:)/gi, '🩺 **Health Assessment**');
    formatted = formatted.replace(/(\*\*Issues Detected\*\*|Issues Detected:)/gi, '⚠️ **Issues Detected**');
    formatted = formatted.replace(/(\*\*Treatment Recommendations\*\*|Treatment Recommendations:)/gi, '💊 **Treatment Recommendations**');
    formatted = formatted.replace(/(\*\*Prevention Tips\*\*|Prevention Tips:)/gi, '🛡️ **Prevention Tips**');
    formatted = formatted.replace(/(\*\*Next Steps\*\*|Next Steps:)/gi, '▶️ **Next Steps**');
    
    return formatted;
}

// Quick advice
async function getQuickAdvice(category) {
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => btn.disabled = true);
    
    showLoading(true);
    addTypingIndicator();
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat/quick-advice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: category,
                sessionId: SESSION_ID,
                language: currentLanguage
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        removeTypingIndicator();
        
        if (data.message) {
            addMessage(data.message.content, false);
        } else {
            addMessage('Sorry, I encountered an error getting advice.', false);
        }
        
    } catch (error) {
        console.error('Error getting quick advice:', error);
        removeTypingIndicator();
        addMessage('Sorry, there was an error getting advice. Please try again.', false);
    } finally {
        showLoading(false);
        actionBtns.forEach(btn => btn.disabled = false);
    }
}

// Image handling
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
    }
    
    showLoading(true, 'Processing image...');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Convert to base64 (remove data:image/...;base64, prefix)
        selectedImageData = e.target.result.split(',')[1];
        
        // Show preview
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('sendBtn').disabled = false;
        
        showLoading(false);
    };
    
    reader.onerror = function() {
        showLoading(false);
        alert('Error reading image file.');
    };
    
    reader.readAsDataURL(file);
}

function removeImage() {
    selectedImageData = null;
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imageInput').value = '';
    
    // Update send button state
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = !messageInput.value.trim();
}

// Voice input handling
async function toggleVoiceInput() {
    const voiceBtn = document.getElementById('voiceBtn');
    
    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            } 
        });
        
        // Setup MediaRecorder
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });
        
        audioChunks = [];
        
        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = function() {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            processAudioFile(audioBlob);
            
            // Stop all tracks
            stream.getTracks().forEach(track => track.stop());
        };
        
        // Start recording
        mediaRecorder.start();
        isRecording = true;
        
        // Update UI
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        document.getElementById('voiceRecording').style.display = 'block';
        
    } catch (error) {
        console.error('Error starting recording:', error);
        alert('Could not access microphone. Please check permissions.');
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        // Update UI
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        document.getElementById('voiceRecording').style.display = 'none';
        
        showLoading(true, 'Processing voice...');
    }
}

async function processAudioFile(audioBlob) {
    try {
        // Create form data
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        
        // Upload to backend
        const response = await fetch(`${API_BASE_URL}/upload/audio`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.transcribedText) {
            // Set transcribed text in input
            const messageInput = document.getElementById('messageInput');
            messageInput.value = data.transcribedText;
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            
            // Enable send button
            document.getElementById('sendBtn').disabled = false;
            
            // Focus input for editing
            messageInput.focus();
            
        } else {
            alert('Could not transcribe audio. Please try speaking more clearly.');
        }
        
    } catch (error) {
        console.error('Error processing audio:', error);
        alert('Error processing voice input. Please try again.');
    } finally {
        showLoading(false);
    }
}

function handleAudioUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['audio/wav', 'audio/mp3', 'audio/ogg', 'audio/webm', 'audio/m4a'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid audio file (WAV, MP3, OGG, WebM, M4A).');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('Audio file size should be less than 10MB.');
        return;
    }
    
    showLoading(true, 'Processing audio file...');
    
    const formData = new FormData();
    formData.append('audio', file);
    
    fetch(`${API_BASE_URL}/upload/audio`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.transcribedText) {
            const messageInput = document.getElementById('messageInput');
            messageInput.value = data.transcribedText;
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            document.getElementById('sendBtn').disabled = false;
            messageInput.focus();
        } else {
            alert('Could not transcribe audio file.');
        }
    })
    .catch(error => {
        console.error('Error uploading audio:', error);
        alert('Error processing audio file.');
    })
    .finally(() => {
        showLoading(false);
        event.target.value = '';
    });
}

// Utility functions
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function showLoading(show, message = 'Processing your request...') {
    const overlay = document.getElementById('loadingOverlay');
    const messageElement = overlay.querySelector('p');
    
    if (show) {
        messageElement.textContent = message;
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }
}

async function loadChatHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/${SESSION_ID}`);
        if (response.ok) {
            const messages = await response.json();
            
            if (messages.length === 0) {
                addWelcomeMessage();
            } else {
                const messagesContainer = document.getElementById('messagesContainer');
                messagesContainer.innerHTML = '';
                
                messages.forEach(message => {
                    addMessage(
                        message.content, 
                        message.role === 'user', 
                        message.imageData
                    );
                });
            }
        } else {
            addWelcomeMessage();
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        addWelcomeMessage();
    }
}

// Voice input and transcription using Web Speech API
let recognition;
let isRecognizing = false;

function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported in this browser.');
        return;
    }

    recognition = new webkitSpeechRecognition();
    
    // Set language based on current language selection
    if (currentLanguage === 'en') {
        recognition.lang = 'en-US';
    } else if (currentLanguage === 'ta') {
        recognition.lang = 'ta-IN';
    } else if (currentLanguage === 'auto') {
        // For auto mode, we'll use a different approach
        recognition.lang = 'en-US'; // Start with English
        recognition.continuous = true;
        recognition.interimResults = true;
    } else {
        recognition.lang = 'en-US'; // Default fallback
    }
    
    recognition.continuous = currentLanguage === 'auto' ? true : false;
    recognition.interimResults = currentLanguage === 'auto' ? true : false;

    recognition.onstart = function() {
        isRecognizing = true;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        
        // Add visual indicator for auto mode
        if (currentLanguage === 'auto') {
            console.log('🎤 Auto language detection mode - speak in any language');
        }
    };

    recognition.onresult = function(event) {
        let transcript = '';
        let isFinal = false;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                isFinal = true;
            }
        }
        
        // For auto mode, detect language and retry if needed
        if (currentLanguage === 'auto' && isFinal) {
            detectAndProcessLanguage(transcript);
        } else {
            // For specific language modes, directly set the transcript
            const messageInput = document.getElementById('messageInput');
            messageInput.value = transcript;
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            document.getElementById('sendBtn').disabled = false;
        }
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        
        // For auto mode, try Tamil if English fails
        if (currentLanguage === 'auto' && event.error === 'no-speech' && recognition.lang === 'en-US') {
            console.log('🔄 Trying Tamil language detection...');
            recognition.lang = 'ta-IN';
            recognition.start();
            return;
        }
        
        alert('Error during speech recognition: ' + event.error);
        isRecognizing = false;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.onend = function() {
        isRecognizing = false;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.start();
}

// New function to detect language in auto mode
function detectAndProcessLanguage(transcript) {
    // Simple language detection based on character patterns
    const tamilRegex = /[\u0B80-\u0BFF]/; // Tamil Unicode range
    const englishRegex = /^[a-zA-Z\s.,!?'"()-]+$/; // Basic English pattern
    
    let detectedLanguage = 'unknown';
    
    if (tamilRegex.test(transcript)) {
        detectedLanguage = 'tamil';
        console.log('🔍 Detected Tamil language');
    } else if (englishRegex.test(transcript.trim())) {
        detectedLanguage = 'english';
        console.log('🔍 Detected English language');
    } else {
        // If unclear, check which recognition language was used
        detectedLanguage = recognition.lang === 'ta-IN' ? 'tamil' : 'english';
        console.log('🔍 Using recognition language:', recognition.lang);
    }
    
    // Set the transcript in the input field
    const messageInput = document.getElementById('messageInput');
    messageInput.value = transcript;
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
    document.getElementById('sendBtn').disabled = false;
    
    // Optional: Show detected language to user
    if (currentLanguage === 'auto') {
        console.log(`✅ Text captured in ${detectedLanguage}:`, transcript);
    }
}

// Enhanced auto-mode recognition with language switching
function startAutoLanguageRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported in this browser.');
        return;
    }

    let attempts = 0;
    const maxAttempts = 2;
    const languages = ['en-US', 'ta-IN'];
    
    function tryRecognition(langIndex) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = languages[langIndex];
        recognition.continuous = false;
        recognition.interimResults = false;
        
        console.log(`🎤 Trying ${recognition.lang}...`);
        
        recognition.onstart = function() {
            isRecognizing = true;
            const voiceBtn = document.getElementById('voiceBtn');
            voiceBtn.classList.add('recording');
            voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            const confidence = event.results[0][0].confidence;
            
            console.log(`✅ Recognition successful with ${recognition.lang}:`, transcript, 'Confidence:', confidence);
            
            const messageInput = document.getElementById('messageInput');
            messageInput.value = transcript;
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            document.getElementById('sendBtn').disabled = false;
            
            isRecognizing = false;
            const voiceBtn = document.getElementById('voiceBtn');
            voiceBtn.classList.remove('recording');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onerror = function(event) {
            console.log(`❌ ${recognition.lang} failed:`, event.error);
            
            if (attempts < maxAttempts - 1) {
                attempts++;
                tryRecognition((langIndex + 1) % languages.length);
            } else {
                alert('Could not recognize speech in any language. Please try again.');
                isRecognizing = false;
                const voiceBtn = document.getElementById('voiceBtn');
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        };
        
        recognition.onend = function() {
            // This will be handled by onresult or onerror
        };
        
        recognition.start();
    }
    
    tryRecognition(0); // Start with English
}

// Updated main voice recognition function
function startVoiceRecognition() {
    if (currentLanguage === 'auto') {
        startAutoLanguageRecognition();
    } else {
        startStandardVoiceRecognition();
    }
}

// Separated standard recognition for specific languages
function startStandardVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported in this browser.');
        return;
    }

    recognition = new webkitSpeechRecognition();
    
    // Set language based on current selection
    switch (currentLanguage) {
        case 'en':
            recognition.lang = 'en-US';
            break;
        case 'ta':
            recognition.lang = 'ta-IN';
            break;
        default:
            recognition.lang = 'en-US';
    }
    
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        isRecognizing = true;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const messageInput = document.getElementById('messageInput');
        messageInput.value = transcript;
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
        document.getElementById('sendBtn').disabled = false;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        alert('Error during speech recognition: ' + event.error);
    };

    recognition.onend = function() {
        isRecognizing = false;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.start();
}

function stopVoiceRecognition() {
    if (recognition && isRecognizing) {
        recognition.stop();
    }
}

// Export functions for global access
window.goBack = goBack;
window.toggleLanguage = toggleLanguage;
window.toggleMenu = toggleMenu;
window.clearChat = clearChat;
window.exportChat = exportChat;
window.sendMessage = sendMessage;
window.getQuickAdvice = getQuickAdvice;
window.handleImageUpload = handleImageUpload;
window.removeImage = removeImage;
window.toggleVoiceInput = toggleVoiceInput;
window.stopRecording = stopRecording;
window.handleAudioUpload = handleAudioUpload;
window.handleKeyDown = handleKeyDown;
