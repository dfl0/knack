"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import { cn } from "@/lib/utils"
import Button from "@components/button"

const Friend = ({ user, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRemove = () => {
    setIsLoading(true)

    axios
      .post("/api/friend/remove", user)
      .catch((error) => toast.error(error.response.data))
      .finally(() => {
        router.refresh()
        setIsLoading(false)
      })
  }

  return (
    <div
      className={cn(
        "flex h-12 items-center justify-between px-2 text-zinc-950",
        isLoading && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <span className="text-sm">{user.name}</span>
      <div className="w-20 px-1">
        <Button
          onClick={handleRemove}
          variant="secondary"
          className="hover:bg-rose-50 hover:text-rose-600"
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default Friend
