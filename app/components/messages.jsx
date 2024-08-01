"use client"

import { useState, useEffect, useRef } from "react"
import { find } from "lodash"

import { pusherClient } from "@/app/libs/pusher"

import Message from "@components/message"

const Messages = ({ chatId, initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef(null)

  useEffect(() => {
    pusherClient.subscribe(chatId)
    bottomRef?.current?.scrollIntoView({ block: "end" })

    const newMessageHandler = (message) => {
      setMessages((current) => {
        if (find(current, { id: message.id }))
          return current

        return [...current, message]
      })
    }

    pusherClient.bind("messages:new", newMessageHandler)

    return () => {
      pusherClient.unsubscribe(chatId)
      pusherClient.unbind("messages:new", newMessageHandler)
    }
  }, [chatId])

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ block: "end", behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto">
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
      <div ref={bottomRef} className="pt-6" />
    </div>
  )
}

export default Messages
