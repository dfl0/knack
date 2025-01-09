"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import getFriends from "@/app/actions/getfriends"

import ChatRecipientSelector from "@components/chatrecipientselector"
import ChatPrompt from "@components/chatprompt"

const NewChat = () => {
  const router = useRouter()
  const [friends, setFriends] = useState(null)
  const [recipients, setRecipients] = useState([])

  useEffect(() => {
    const fetchFriends = async () => {
      setFriends(await getFriends())
    }

    fetchFriends()
  }, [])


  const handleNewChat = async () => {
    if (recipients.length > 0) {
      try {
        const { data: newChat } = await axios.post("/api/chats", {
          recipientIds: recipients.map((recipient) => recipient.value),
        })
        router.push(`/chats/${newChat.id}`)
        return newChat.id
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error("Please select at least one friend")
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatRecipientSelector
        friends={friends}
        recipients={recipients}
        handleChange={setRecipients}
        className="w-full"
      />
      <ChatPrompt
        handleNewChat={handleNewChat}
      />
    </div>
  )
}

export default NewChat
