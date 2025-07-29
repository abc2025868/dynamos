
import React, { useState, useRef, useEffect } from 'react';
import './AgriChatbot.css';

const AgriChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return;

    const userMessage = {
      id: Date.now(),
      content: inputValue,
      sender: 'user',
      image: selectedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', inputValue);
      formData.append('language', currentLanguage);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        content: data.response || 'Sorry, I encountered an error.',
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        content: 'Sorry, there was an error connecting to the service.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>🌾 Agricultural Expert Assistant</h3>
        <div className="language-toggle">
          <button 
            className={currentLanguage === 'en' ? 'active' : ''}
            onClick={() => setCurrentLanguage('en')}
          >
            EN
          </button>
          <button 
            className={currentLanguage === 'ta' ? 'active' : ''}
            onClick={() => setCurrentLanguage('ta')}
          >
            தமிழ்
          </button>
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.image && (
              <img 
                src={URL.createObjectURL(message.image)} 
                alt="Uploaded" 
                className="message-image"
              />
            )}
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        {selectedImage && (
          <div className="selected-image">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
            <button onClick={removeImage} className="remove-image">×</button>
          </div>
        )}
        
        <div className="input-row">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="image-btn"
            title="Upload Image"
          >
            📷
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={currentLanguage === 'en' ? 'Ask about crops, diseases, farming...' : 'பயிர்கள், நோய்கள், விவசாயம் பற்றி கேளுங்கள்...'}
            className="message-input"
          />
          
          <button 
            onClick={handleSendMessage}
            disabled={(!inputValue.trim() && !selectedImage) || isLoading}
            className="send-btn"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgriChatbot;
