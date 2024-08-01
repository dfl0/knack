"use client"

import axios from "axios"
import React, { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"

import { cn } from "@/lib/utils"
import useOtherMembers from "@/app/hooks/useOtherMembers"

import Button from "@components/button"
import InputPrompt from "@components/inputprompt"

const ChatPrompt = ({ chat, className }) => {
  const [message, setMessage] = useState("")

  const messagePromptRef = useRef(null)
  const otherMembers = useOtherMembers(chat)

  const onSubmit = () => {
    if (message.trim()) {
      axios
        .post("/api/messages", {
          body: message,
          chatId: chat.id,
        })
        .catch((error) => console.log(error.response.data))

      setMessage("")
    }
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const chatPlaceholder = !chat.isGroup
    ? otherMembers[0].name
    : chat.name
      ? chat.name
      : "group"

  useEffect(() => {
    messagePromptRef.current.style.height = "auto"
    messagePromptRef.current.style.height = messagePromptRef.current.scrollHeight + "px"
  }, [message])

  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-end gap-2 border-t border-zinc-100 py-6 px-4",
        className
      )}
    >
      <InputPrompt
        id="message"
        ref={messagePromptRef}
        value={message}
        placeholder={`Message ${chatPlaceholder}...`}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        className="grow"
      />
      <Button
        onClick={onSubmit}
        uniform
        className="h-10 w-10"
      >
        <Send size={16} className="shrink-0" />
      </Button>
    </div>
  )
}

export default ChatPrompt
