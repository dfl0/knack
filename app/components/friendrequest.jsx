"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import { Check } from "lucide-react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import Button from "@components/button"

const FriendRequest = ({ user, type, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAccept = () => {
    setIsLoading(true)

    axios
      .post("/api/friend/accept", user)
      .catch((error) => toast.error(error.response.data))
      .finally(() => {
        router.refresh()
        setIsLoading(false)
      })
  }

  const handleReject = () => {
    setIsLoading(true)

    axios
      .post("/api/friend/reject", user)
      .catch((error) => toast.error(error.response.data))
      .finally(() => {
        router.refresh()
        setIsLoading(false)
      })
  }

  const handleCancel = () => {
    setIsLoading(true)

    axios
      .post("/api/friend/cancel", user)
      .catch((error) => toast.error(error.response.data))
      .finally(() => {
        router.refresh()
        setIsLoading(false)
      })
  }

  return (
    <div
      className={cn(
        "flex h-12 bg items-center justify-between px-2 text-zinc-950",
        isLoading && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <span className="text-sm">{user.name}</span>
      <div className="flex items-center gap-4">
        {type === "incoming" && (
          <>
            <span className="text-xs text-zinc-400">Incoming</span>
            <div className="flex w-20 items-center justify-center gap-1">
              <Button
                onClick={handleAccept}
                uniform
                variant="invisible"
                className="shrink-0 rounded-lg text-zinc-400 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleReject}
                uniform
                variant="invisible"
                className="shrink-0 rounded-lg text-zinc-400 hover:bg-rose-50 hover:text-rose-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
        {type === "outgoing" && (
          <>
            <span className="text-xs text-zinc-400">Outgoing</span>
            <div className="w-20 px-1">
              <Button
                onClick={handleCancel}
                variant="secondary"
                className="hover:bg-rose-50 hover:text-rose-600"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FriendRequest
