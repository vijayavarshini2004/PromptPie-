import React, { useState, useEffect } from 'react';
import './chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hi there, how can I help you?', sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Do not send empty messages

    // Append the user's message to the messages list
    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    
    setIsTyping(true);

    // Make the API call to the backend
    try {
      const response = await fetch('http://127.0.0.1:8000/api/chart-data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      let aiMessage = data.error || JSON.stringify(data);
      displayTypingEffect(aiMessage);
    } catch (error) {
      displayTypingEffect('Error fetching response from backend.');
    }
  };

  const displayTypingEffect = (message) => {
    let index = -1;
    const typingSpeed = 50; // Adjust typing speed here
  
    // Add a new empty message for the AI response if not already typing
    if (!isTyping) {
      setMessages(prevMessages => [...prevMessages, { text: '', sender: 'ai' }]);
      setIsTyping(true);
    }
  
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length-1];
        
        if (index < message.length) {
          // Update the last AI message with the next character
          const updatedMessage = lastMessage.text + message[index];
          return [...prevMessages.slice(0, -1), { text: updatedMessage, sender: 'ai' }];
        } else {
          // Clear the typing effect once the full message is displayed
          clearInterval(interval);
          setIsTyping(false);
          return prevMessages;
        }
      });
  
      index++;
    }, typingSpeed);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior of the Enter key
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Profile Header Inside the Chat Box */}
        <div className="chat-profile-header">
          <span className="chat-profile-pic">P</span>
          <span className="chat-username">Prasath JR</span>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-container">
                <img
                  src={message.sender === 'user' ? '/user1.png' : '/AI.png'}
                  alt={message.sender}
                  className="message-icon"
                />
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Area */}
        <div className="chat">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message here..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            <span>➣</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
