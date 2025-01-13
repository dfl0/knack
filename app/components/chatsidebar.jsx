"use client"

import { useState, useMemo, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { SquarePen } from "lucide-react"

import getCurrentUser from "@/app/actions/getcurrentuser"
import getChats from "@/app/actions/getchats"
import useChat from "@/app/hooks/useChat"
import { pusherClient } from "@/app/libs/pusher"
import { cn } from "@/lib/utils"

import Button from "@components/button"
import ChatButton from "@components/chatbutton"

const ChatSidebar = ({ className, ...props }) => {
  const session = useSession()
  const router = useRouter()
  const { currentChatId } = useChat()

  const [chats, setChats] = useState(null)

  async function fetchData() {
    const currentUser = await getCurrentUser()
    const fetchedChats = await getChats()
    setChats(
      fetchedChats.map((chat) => ({
        ...chat,
        updated: currentUser.updatedChatIds?.includes(chat.id), // add a field to chat records for tracking update state
      }))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const currentUserEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  useEffect(() => {
    if (!currentUserEmail) return

    pusherClient.subscribe(currentUserEmail)

    const updateChatHandler = (updatedChat) => {
      setChats((current) => {
        const oldChats = current.filter((chat) => chat.id !== updatedChat.id)
        return [
          {
            ...updatedChat,
            updated: updatedChat.id !== currentChatId,
          },
          ...oldChats,
        ]
      })

      if (updatedChat.id === currentChatId) {
        axios.post(`/api/chats/${currentChatId}/seen`)
      }
    }

    const deleteChatHandler = (deletedChat) => {
      const remainingChats = chats.filter((chat) => chat.id !== deletedChat.id)
      setChats(remainingChats)

      if (deletedChat.id === currentChatId)
        router.push("/chats")

      axios.post(`/api/chats/${deletedChat.id}/seen`)
    }

    pusherClient.bind("chat:update", updateChatHandler)
    pusherClient.bind("chat:deleted", deleteChatHandler)

    return () => {
      pusherClient.unsubscribe(currentUserEmail)
      pusherClient.unbind("chat:update", updateChatHandler)
      pusherClient.unbind("chat:deleted", deleteChatHandler)
    }
  }, [currentUserEmail, chats, currentChatId, router])

  const handleSeen = (chatId) => {
    setChats((current) => (
      current.map(
        (chat) => chat.id === chatId ? { ...chat, updated: false } : chat
      )
    ))

    axios.post(`/api/chats/${chatId}/seen`)
  }

  return (
    <div
      className={cn(
        `flex
        shrink-0
        flex-col
        items-center
        justify-start
        border-r
        border-zinc-100
        px-4
        pt-2`,
        className
      )}
      {...props}
    >
      <div className="flex w-full items-end justify-between">
        <span className="text-sm font-medium text-zinc-400">
          Chats
        </span>

        <Button
          variant="subtle"
          onClick={() => router.push("/chats/new")}
          uniform
          className="self-end"
        >
          <SquarePen size={16} className="shrink-0" />
        </Button>
      </div>

      {session.status === "loading" || !chats ? (
        <div>Loading...</div>
      ) : (
        chats.map((chat) => (
          <ChatButton
            key={chat.id}
            chat={chat}
            updated={chat.updated}
            onSeen={handleSeen}
            selected={chat.id === currentChatId}
          />
        ))
      )}
    </div>
  )
}

export default ChatSidebar
