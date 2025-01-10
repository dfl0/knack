"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"

import toast from "react-hot-toast"

import InputPrompt from "@components/inputprompt"
import Button from "@components/button"

const DirectMessageForm = ({ recipientId, recipientName, onComplete }) => {
  const [message, setMessage] = useState("")
  const messagePromptRef = useRef(null)

  useEffect(() => {
    messagePromptRef.current.style.height = "auto"
    messagePromptRef.current.style.height = messagePromptRef.current.scrollHeight + "px"
  }, [message])

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const {
          data: { id: chatId },
        } = await axios.post("/api/chats", {
          recipientIds: [recipientId],
        })

        await axios.post("/api/messages", {
          body: message,
          chatId,
        })

        setMessage("")
        onComplete()
        toast.success("Your message has been sent!")
      } catch (error) {
        toast.error("Failed to send direct message")
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Direct Message</h1>

      <InputPrompt
        ref={messagePromptRef}
        value={message}
        placeholder={`Message ${recipientName}...`}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-16 w-full"
      />

      <Button
        onClick={sendMessage}
        className="self-end"
      >
        Send
      </Button>
    </div>
  )
}

export default DirectMessageForm
