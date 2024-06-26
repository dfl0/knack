"use client"

import axios from "axios"
import { toast } from "react-hot-toast"

import { cn } from "@/lib/utils"
import Button from "@components/button"

const Friend = ({ user, className, ...props }) => {
  const handleRemove = () => {
    axios
      .post("/api/friend/remove", user)
      .catch((error) => toast.error(error.response.data))
  }

  return (
    <div
      className={cn(
        "flex h-12 bg items-center justify-between px-2 text-zinc-950",
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
