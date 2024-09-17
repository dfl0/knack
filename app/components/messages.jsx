"use client"

import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { find } from "lodash"

import getChatFromId from "@/app/actions/getchatfromid"
import { pusherClient } from "@/app/libs/pusher"

import Message from "@components/message"

const Messages = ({ chatId }) => {
  const [messages, setMessages] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chat = await getChatFromId(chatId)
        setMessages(chat.messages)
      } catch (error) {
        console.error("Failed to fetch messages")
      }
    }

    fetchMessages()
    bottomRef.current?.scrollIntoView({ block: "end" })
    axios.post("/api/chats/seen", { chatId })

    pusherClient.subscribe(chatId)

    const newMessageHandler = (message) => {
      setMessages((current) => {
        if (find(current, { id: message.id }))
          return current

        return current ? [...current, message] : [message]
      })
    }

    pusherClient.bind("messages:new", newMessageHandler)

    return () => {
      pusherClient.unsubscribe(chatId)
      pusherClient.unbind("messages:new", newMessageHandler)
    }
  }, [chatId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages ? (
        messages.map((message, i) => (
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
        ))
      ) : (
        <div>Loading...</div>
      )}
      <div ref={bottomRef} className="pt-6" />
    </div>
  )
}

export default Messages
