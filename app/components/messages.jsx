"use client"

import { useState } from "react"

import Message from "@components/message"

const Messages = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)

  return (
    <div className="flex-1">
      {messages.map((message, i) => (
        <Message
          key={message.id}
          sender={message.sender}
          body={message.body}
          sentAt={message.sentAt}
          consecutive={
            i > 0 &&
            messages.slice(i - 1)[0].sender.email === messages.slice(i)[0].sender.email // check if previous message was sent by the same user
          }
        />
      ))}
    </div>
  )
}

export default Messages
