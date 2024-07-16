import React, { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    const userInput = input;
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/chat', { query: userInput });
      const botResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error interacting with the chatbot:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not get a response from the chatbot', sender: 'bot' }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex-grow mb-4">
        <div className="h-full overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md flex">
        <input
          className="border p-2 flex-grow mr-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button className="bg-yellow-500 text-white p-2 rounded" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
