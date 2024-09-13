"use client"

import { useState } from "react"

import ChatMemberSelector from "@components/chatmemberselector"
import ChatPrompt from "@components/chatprompt"

const NewChatBody = ({ friends }) => {
  const [members, setMembers] = useState([])

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatMemberSelector
        friends={friends}
        members={members}
        handleChange={setMembers}
        className="w-full"
      />
      <ChatPrompt members={members} />
    </div>
  )
}

export default NewChatBody
