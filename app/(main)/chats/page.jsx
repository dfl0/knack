"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatButton from "@components/chatbutton";
import InputPrompt from "@components/inputprompt";

const groupChats = [
  { id: "group1", name: "MATH 463 Diff Geom." },
  { id: "group2", name: "CS 310 Data Struct." },
  { id: "group3", name: "CHEM 231 Organic Chem." },
  { id: "group4", name: "MUS 111 Music Cultures" },
  // Add more groups as needed
];

export default function Chats() {
  const [activeGroup, setActiveGroup] = useState(groupChats[0].id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);
  const messagePromptRef = useRef(null);

  const handleGroupClick = (groupId) => {
    setActiveGroup(groupId);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    messagePromptRef.current.style.height = "auto";
    messagePromptRef.current.style.height = messagePromptRef.current.scrollHeight + "px";
  }, [message])

  const handleMessageSend = (e) => {
    console.log("sent");

    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        content: message,
        group: activeGroup,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleMessageSend(e);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex">
      <div className="w-72 border-r border-zinc-100 shrink-0 flex flex-col items-center justify-start gap-2 px-4 pt-2">
        <div className="w-full flex justify-start px-2 pt-4">
          <span className="text-xs font-medium text-zinc-400">
            Current Classes
          </span>
        </div>
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
        {
          // <div className="h-10 shrink-0 bg-gray-100 flex justify-center items-center">
          //   <div className="font-semibold">
          //     {groupChats.find((group) => group.id === activeGroup).name}
          //   </div>
          // </div>
        }
        <div className="grow overflow-scroll">
          {messages.filter(msg => msg.group === activeGroup).map(msg => (
            <div key={msg.id} className="w-full grow-0 px-4 py-1">
              <span className="text-sm text-zinc-950 break-words whitespace-pre-wrap">{msg.content}</span>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
        <form onSubmit={handleMessageSend}>
          <div className="p-6 shrink-0 flex items-center gap-4 px-4 border-t border-zinc-100">
            <InputPrompt
              name="Message"
              placeholder={"Message " + groupChats.find((group) => group.id === activeGroup).name}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              ref={messagePromptRef}
            />
            <button
              type="submit"
              className="text-xs font-medium px-3 py-1 h-8 text-white rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
