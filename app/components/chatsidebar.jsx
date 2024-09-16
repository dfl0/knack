"use client"

import { useState, useMemo, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SquarePen } from "lucide-react"

import { cn } from "@/lib/utils"
import useChat from "@/app/hooks/useChat"
import { pusherClient } from "@/app/libs/pusher"

import Button from "@components/button"
import ChatButton from "@components/chatbutton"

const ChatSidebar = ({ initialChats, updatedChatIds, friends, className, ...props }) => {
  const session = useSession()
  const router = useRouter()
  const { chatId } = useChat()

  const [chats, setChats] = useState(initialChats)

  const currentUserEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  useEffect(() => {
    if (!currentUserEmail) return

    pusherClient.subscribe(currentUserEmail)

    const updateChatHandler = (updatedChat) => {
      setChats((current) => {
        const oldChats = current.filter((chat) => chat.id !== updatedChat.id)
        return [updatedChat, ...oldChats]
      })
    }

    const newChatHandler = (newChat) => {
      setChats((current) => [newChat, ...current])
    }

    pusherClient.bind("chat:update", updateChatHandler)
    pusherClient.bind("chat:new", newChatHandler)

    return () => {
      pusherClient.unsubscribe(currentUserEmail)
      pusherClient.unbind("chat:update", updateChatHandler)
      pusherClient.unbind("chat:new", newChatHandler)
    }
  }, [currentUserEmail])

  const handleDeleteChat = (chat) => {
    const updatedChats = chats.filter(
      (item) => item.id !== chat.id
    )
    setChats(updatedChats)
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
      {chats.map((chat) => (
        <ChatButton
          key={chat.id}
          chat={chat}
          hasNewMessage={updatedChatIds?.includes(chat.id)}
          selected={chat.id === chatId}
          onDelete={handleDeleteChat}
        />
      ))}
    </div>
  )
}

export default ChatSidebar
