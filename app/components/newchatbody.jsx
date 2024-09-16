"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import ChatMemberSelector from "@components/chatmemberselector"
import ChatPrompt from "@components/chatprompt"

const NewChatBody = ({ friends }) => {
  const router = useRouter()
  const [members, setMembers] = useState([])

  const handleNewChat = (message) => {
    if (members.length > 0) {
      axios
        .post("/api/chats", { members })
        .then((res) => {
          axios
            .post("/api/messages", {
              body: message,
              chatId: res.data.id,
            })
            .then((res) => router.push(`/chats/${res.data.chatId}`))
            .catch((error) => toast.error("Failed to send message"))
            .finally(() => router.refresh())
        })
        .catch((error) => toast.error("Failed to create new chat"))
    } else {
      toast.error("Please select at least one friend")
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatMemberSelector
        friends={friends}
        members={members}
        handleChange={setMembers}
        className="w-full"
      />
      <ChatPrompt
        members={members}
        handleNewChat={handleNewChat}
      />
    </div>
  )
}

export default NewChatBody
