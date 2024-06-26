import { useState } from "react"
import { UserPlus } from "lucide-react"

import { cn } from "@/lib/utils"

import Button from "@components/button"
import ChatButton from "@components/chatbutton"
import Modal from "@components/modal"
import AddFriendForm from "@components/addfriendform"

const ChatSidebar = ({ groups, current, setCurrent, className, ...props }) => {
  const handleGroupClick = (groupId) => {
    setCurrent(groupId)
  }

  const [showAddFriend, setShowAddFriend] = useState(false)

  const toggleAddFriend = () => {
    if (showAddFriend) {
      setShowAddFriend(false)
    } else {
      setShowAddFriend(true)
    }
  }

  return (
    <div
      className={cn(
        `flex
        shrink-0
        flex-col
        items-center
        justify-start
        gap-2
        border-r
        border-zinc-100
        px-4
        pt-2`,
        className
      )}
      {...props}
    >
      <div className="flex w-full justify-start px-2 pt-4">
        <span className="text-xs font-medium text-zinc-400">
          Current Classes
        </span>
      </div>
      {groups.map((group) => (
        <ChatButton
          key={group.id}
          id={group.id}
          title={group.name}
          sub="Most recent message..."
          active={current}
          action={handleGroupClick}
        />
      ))}
      <div className="flex w-full justify-start px-2 pt-4">
        <span className="text-xs font-medium text-zinc-400">Friends</span>
      </div>
      <Button
        variant="invisible"
        onClick={toggleAddFriend}
        className="h-9 w-full text-sm text-zinc-500"
      >
        Add Friend
        <UserPlus absoluteStrokeWidth className="h-4 w-4" />
      </Button>
      <Modal
        isOpen={showAddFriend}
        onClose={toggleAddFriend}
      >
        <AddFriendForm />
      </Modal>
    </div>
  )
}

export default ChatSidebar
