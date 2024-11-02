import React, { useState, useEffect } from 'react';
import { realtimeDb } from '../../Firebase/Firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';

const Chat = ({ userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
 
  useEffect(() => {
    const messagesRef = ref(realtimeDb, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.entries(data).map(([id, msg]) => ({ id, ...msg })) : [];
      setMessages(messagesArray);
    });
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messagesRef = ref(realtimeDb, 'messages');
      await push(messagesRef, {
        text: newMessage,
        sender: userName, // Cambia esto por el usuario actual
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="fixed right-4 top-16 w-80 h-[calc(100vh-4rem)] p-4 bg-gray-900 pb-8 mt-8 text-white shadow-lg flex flex-col justify-between rounded-t-3xl">
      <div className="p-4 text-white font-semibold text-center">
        Chat en Vivo
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-800 rounded-t-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${message.sender === 'User' ? 'text-right ml-auto' : 'text-left mr-auto'
              }`}
          >
            <p className={`text-sm font-medium text-gray-400`}>{message.sender.userName || message.sender}</p>
            <p className="text-base">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-700 flex items-center bg-gray-800 rounded-b-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un mensaje..."
        />

        <button
          className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700"
          onClick={handleSendMessage}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;