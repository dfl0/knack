"use client"

import React, { useState, useEffect, useRef } from "react"

import ChatSidebar from "@components/chatsidebar"
import ChatPrompt from "@components/chatprompt"

export default function Chats() {
  const groupChats = [
    { id: "group1", name: "MATH 463 Diff Geom." },
    { id: "group2", name: "CS 310 Data Struct." },
    { id: "group3", name: "CHEM 231 Organic Chem." },
    { id: "group4", name: "MUS 111 Music Cultures" },
    // Add more groups as needed
  ]

  const [activeGroup, setActiveGroup] = useState(groupChats[0].id)
  const [messages, setMessages] = useState([])

  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-full w-full">
      <ChatSidebar
        groups={groupChats}
        current={activeGroup}
        setCurrent={setActiveGroup}
        className="w-72"
      />
      <div className="flex grow flex-col">
        <div className="grow overflow-scroll">
          {messages
            .filter((msg) => msg.group === activeGroup)
            .map((msg) => (
              <div key={msg.id} className="w-full grow-0 px-4 py-1">
                <span className="whitespace-pre-wrap break-words text-sm text-zinc-950">
                  {msg.content}
                </span>
              </div>
            ))}
          <div ref={endOfMessagesRef} />
        </div>
        <ChatPrompt
          messages={messages}
          setMessages={setMessages}
          groups={groupChats}
          current={activeGroup}
        />
      </div>
    </div>
  )
}
