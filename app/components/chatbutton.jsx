"use client"

import axios from "axios"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import useChat from "@/app/hooks/useChat"
import useOtherMembers from "@/app/hooks/useOtherMembers"
import { pusherClient } from "@/app/libs/pusher"

import Button from "@components/button"
import ProfilePicture from "@components/profilepicture"

export default function ChatButton({ chat, hasNewMessage, selected }) {
  const session = useSession()
  const router = useRouter()
  const otherMembers = useOtherMembers(chat)
  const [showIndicator, setShowIndicator] = useState(hasNewMessage)

  const currentUserEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  const currentChatId = useChat().chatId

  useEffect(() => {
    if (!currentUserEmail) return

    pusherClient.subscribe(currentUserEmail)

    const updateChatIndicator = (updatedChat) => {
      if (updatedChat.id === chat.id && updatedChat.id !== currentChatId)
        setShowIndicator(true)
    }

    pusherClient.bind("chat:update", updateChatIndicator)

    return () => {
      pusherClient.unsubscribe(currentUserEmail)
      pusherClient.unbind("chat:update", updateChatIndicator)
    }
  }, [currentUserEmail, chat, currentChatId])

  // set the default chat name to list of first names if group and full name if direct
  const chatName = chat.isGroup
    ? otherMembers
      .map((member) => member.name.split(" ")[0])
      .join(", ")
      .replace(/, ([^,]*)$/, " & $1")
    : otherMembers[0].name

  const handleClick = useCallback(() => {
    router.push(`/chats/${chat.id}`)
    setShowIndicator(false)
  }, [chat.id, router])

  const handleDelete = (e) => {
    e.stopPropagation()

    axios
      .delete(`/api/chats/${chat.id}`)
      .catch((error) => console.error(error.message))
  }

  const latestMessage = useMemo(() => {
    const messages = chat.messages || []
    return messages[messages.length - 1]
  }, [chat.messages])

  const latestActivity = useMemo(() => {
    if (latestMessage?.body)
      return latestMessage.body

    return "Started a new chat"
  }, [latestMessage])

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group w-full rounded-xl p-2 text-zinc-950 hover:cursor-pointer hover:bg-zinc-100/50",
        selected && "bg-zinc-100 hover:bg-zinc-100"
      )}
    >
      <div className="flex items-center">
        {chat.isGroup ? (
          <div className="mr-3 h-8 w-8 shrink-0 rounded-[40%] bg-zinc-300" /> // temporary blank placeholder for group chat image
        ) : (
          <ProfilePicture
            src={otherMembers[0]?.pfp}
            alt={otherMembers[0]?.name}
            className="mr-3 h-8 w-8"
          />
        )}

        <div className="flex w-full flex-col items-start justify-center overflow-hidden">
          <div className="flex max-w-full items-center gap-2">
            <span className="max-w-full truncate text-sm font-medium">
              {chatName}
            </span>

            {showIndicator && (
              <div className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
            )}
          </div>

          <span className="max-w-full truncate text-xs text-zinc-500">
            {latestActivity}
          </span>
        </div>

        <Button
          variant="subtle"
          onClick={handleDelete}
          uniform
          className="invisible group-hover:visible"
        >
          <X size={16} className="shrink-0" />
        </Button>
      </div>
    </div>
  )
}
