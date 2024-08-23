"use client"

import axios from "axios"
import { toast } from "react-hot-toast"

import { Check } from "lucide-react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import Button from "@components/button"

const FriendRequest = ({ user, type, onAccept, onReject, onCancel, className, ...props }) => {
  const handleAccept = () => {
    axios
      .post("/api/friend/accept", user)
      .catch((error) => toast.error(error.response.data))

    onAccept(user)
  }

  const handleReject = () => {
    axios
      .post("/api/friend/reject", user)
      .catch((error) => toast.error(error.response.data))

    onReject(user)
  }

  const handleCancel = () => {
    axios
      .post("/api/friend/cancel", user)
      .catch((error) => toast.error(error.response.data))

    onCancel(user)
  }

  return (
    <div
      className={cn(
        "bg flex h-12 items-center justify-between px-2 text-zinc-950",
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
