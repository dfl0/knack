"use client"

import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"

import { Send } from "lucide-react"

import { cn } from "@/lib/utils"
import useOtherMembers from "@/app/hooks/useOtherMembers"

import Button from "@components/button"
import InputPrompt from "@components/inputprompt"

const ChatPrompt = ({ chat, handleNewChat, className }) => {
  const [message, setMessage] = useState("")

  const otherMembers = useOtherMembers(chat ? chat : { members: [] })
  const messagePromptRef = useRef(null)

  const onSubmit = async () => {
    if (message.trim()) {
      // if no chat param is passed, new chat will be created with selected members
      const chatId = chat ? chat.id : await handleNewChat()

      axios
        .post("/api/messages", {
          body: message,
          chatId,
        })
        .catch((error) => toast.error("Failed to send message"))

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

  const chatPlaceholder = chat
    ? !chat.isGroup
      ? otherMembers[0].name
      : chat.name
        ? chat.name
        : "group"
    : "new chat"

  useEffect(() => {
    messagePromptRef.current.style.height = "auto"
    messagePromptRef.current.style.height = messagePromptRef.current.scrollHeight + "px"
  }, [message])

  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-end gap-2 border-t border-zinc-100 px-4 py-6",
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
