"use client";
import React, { useState, useEffect, useRef } from 'react';

const groupChats = [
  { id: 'group1', name: 'Math 463 Diff Geom' },
  { id: 'group2', name: 'CS 310 Data Struc.' },
  { id: 'group3', name: 'Group 3' },
  // Add more groups as needed
];

export default function KnackChat() {
  const [activeGroup, setActiveGroup] = useState(groupChats[0].id);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);

  const handleGroupClick = (groupId) => {
    setActiveGroup(groupId);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        group: activeGroup,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen">
      <div className="w-60 bg-gray-800 text-white overflow-auto">
        {groupChats.map(group => (
          <button
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className={`w-full mt-16 text-left py-4 px-4 hover:bg-gray-700 ${activeGroup === group.id ? 'bg-gray-300' : ''}`}
          >
            {group.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col flex-grow">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-gray-200 shadow-md p-4">
          <h2 className="text-2xl font-semibold">{groupChats.find(group => group.id === activeGroup).name}</h2>
        </div>
        {/* Chat Window */}
        <div className="flex-grow overflow-auto p-4">
          <div className="space-y-24">
            {messages.filter(msg => msg.group === activeGroup).map(msg => (
              <div key={msg.id} className="break-words">{msg.text}</div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        {/* Input Bar */}
        <div className="p-4 bg-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              className="flex-grow p-2 rounded border-gray-300"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
