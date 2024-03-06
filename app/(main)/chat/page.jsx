"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import ChatButton from "@components/chatbutton";

const groupChats = [
  { id: "group1", name: "MATH 463 Diff Geom." },
  { id: "group2", name: "CS 310 Data Struct." },
  { id: "group3", name: "CHEM 231 Organic Chem." },
  { id: "group4", name: "MUS 111 Music Cultures" },
  // Add more groups as needed
];

export default function KnackChat() {
  const [activeGroup, setActiveGroup] = useState(groupChats[0].id);
  const [message, setMessage] = useState("");
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
      setMessage("");
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex">
      <div className="w-64 bg-gray-100 shrink-0 flex flex-col items-center justify-start gap-1 px-1 pt-1">
        {groupChats.map((group) => (
          <ChatButton
            key={group.id}
            id={group.id}
            title={group.name}
            sub="Most recent message..."
            active={activeGroup}
            action={handleGroupClick}
          />
        ))}
      </div>
      <div className="grow flex flex-col">
        <div className="h-10 shrink-0 bg-gray-100 flex justify-center items-center">
          <div className="font-semibold">
            {groupChats.find((group) => group.id === activeGroup).name}
          </div>
        </div>
        <div className="grow">
          {messages.filter(msg => msg.group === activeGroup).map(msg => (
            <div key={msg.id} className="break-words px-4 py-2">{msg.text}</div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
        <div className="h-20 shrink-0 bg-gray-100 flex items-center gap-4 px-4">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            className="appearance-none outline-none bg-gray-200 px-4 h-10 rounded-xl text-sm grow"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 h-10 rounded-xl hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
