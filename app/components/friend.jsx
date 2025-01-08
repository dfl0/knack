"use client"

import axios from "axios"
import { toast } from "react-hot-toast"

import { cn } from "@/lib/utils"
import Button from "@components/button"
import ProfilePicture from "@components/profilepicture"

const Friend = ({ user, onRemove, className, ...props }) => {
  const handleRemove = () => {
    axios
      .post("/api/friend/remove", user)
      .catch((error) => toast.error(error.response.data))
  }

  return (
    <div
      className={cn(
        "flex h-12 items-center justify-between px-2 text-zinc-950",
        className
      )}
      {...props}
    >

      <div className="flex items-center gap-3">
        <ProfilePicture
          src={user?.pfp}
          name={user?.name}
          className="w-8 h-8"
        />

        <span className="text-sm font-medium">{user.name}</span>
      </div>

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
