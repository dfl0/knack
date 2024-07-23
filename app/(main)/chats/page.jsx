"use client"

import ChatPrompt from "@components/chatprompt"

export default function Chats() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grow"></div>
      <ChatPrompt />
    </div>
  )
}
