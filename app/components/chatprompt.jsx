"use client"

import React, { useState, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

import Button from "@components/button"
import InputPrompt from "@components/inputprompt"

const ChatPrompt = ({ messages, setMessages, groups, current, className, ...props }) => {
  const [message, setMessage] = useState("")

  const messagePromptRef = useRef(null)

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleMessageSend = (e) => {
    e.preventDefault()

    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        content: message,
        group: current,
      }

      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleMessageSend(e)
    }
    if (e.key === "Enter" && e.shiftKey) {
      console.log(messages)
    }
  }

  useEffect(() => {
    messagePromptRef.current.style.height = "auto"
    messagePromptRef.current.style.height =
      messagePromptRef.current.scrollHeight + "px"
  }, [message])

  return (
    <form
      onSubmit={handleMessageSend}
      {...props}
    >
      <div className={cn(
        "flex shrink-0 items-center gap-4 border-t border-zinc-100 p-6 px-4",
        className
      )}
      >
        <InputPrompt
          ref={messagePromptRef}
          name="Message"
          placeholder={
            "Message " + groups.find((group) => group.id === current).name
          }
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          className="grow"
        />
        <Button
          type="submit"
          className="h-10"
        >
          Send
        </Button>
      </div>
    </form>
  )
}

export default ChatPrompt
