import React, { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([{ text: "Hi! I'm here to help. Ask me anything!", type: "bot" }]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const generateResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("recycling")) {
      return "Recycling helps reduce waste and protect the planet. Would you like to know more about electronic recycling?";
    } else if (lowerCaseMessage.includes("payment")) {
      return "You can pay using Credit Card, PayPal, Mobile Money, or Bank Transfer.";
    } else {
      return "That's an interesting question! Could you clarify what you'd like to know?";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" };
    const botResponse = { text: generateResponse(input), type: "bot" };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      setMessages([...messages, userMessage, botResponse]);
    }, 800);

    setInput("");
  };

  return (
    <div>
      {/* ✅ Chat Icon for Opening Popup */}
      <div className="chat-icon" onClick={() => setIsChatOpen(!isChatOpen)}>💬</div>

      {/* ✅ Chat Popup */}
      <div className={`chatbot-container ${isChatOpen ? "active" : ""}`}>
        <h2>💬 Recycling Assistant</h2>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <p key={index} className={msg.type}>{msg.text}</p>
          ))}
        </div>

        <div className="chat-controls">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
