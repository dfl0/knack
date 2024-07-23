import axios from "axios"
import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import useOtherMembers from "@/app/hooks/useOtherMembers"

import Button from "@components/button"

export default function ChatButton({ chat, selected, onDelete }) {
  const router = useRouter()
  const otherMembers = useOtherMembers(chat)

  // set the default chat name to list of first names if group and full name if direct5
  const chatName = chat.isGroup
    ? otherMembers
        .map((member) => member.name.split(" ")[0])
        .join(", ")
        .replace(/, ([^,]*)$/, " & $1")
    : otherMembers[0].name

  const handleClick = useCallback(() => {
    router.push(`/chats/${chat.id}`)
  }, [chat.id, router])

  const handleDelete = (e) => {
    e.stopPropagation()

    axios
      .delete(`/api/chats/${chat.id}`)
      .catch((error) => console.log(error.response.data))

    if (selected)
      router.push("/chats")

    onDelete(chat)
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
        "group w-full rounded-xl p-2 text-zinc-950 hover:bg-zinc-100/50 hover:cursor-pointer",
        selected && "bg-zinc-100 hover:bg-zinc-100"
      )}
    >
      <div className="flex items-center">
        <div className="h-8 w-8 shrink-0 rounded-xl bg-zinc-300"></div>
        <div className="ml-2 flex w-full flex-col items-start justify-center overflow-hidden">
          <span className="max-w-full truncate text-sm font-medium">
            {chatName}
          </span>
          <span className="text-xs text-zinc-500">
            {latestActivity}
          </span>
        </div>
        <Button
          variant="subtle"
          onClick={handleDelete}
          uniform
          className="invisible group-hover:visible"
        >
          <X size={16} className="shrink-0"/>
        </Button>
      </div>
    </div>
  )
}
