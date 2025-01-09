"use client"

import SearchSelect from "@components/searchselect"

const ChatRecipientSelector = ({ friends, recipients, handleChange }) => {
  return (
    <div className="border-b border-zinc-100">
      <div className="flex items-center justify-center px-4">
        <span className="text-sm hover:cursor-default text-zinc-900">To:</span>
        <SearchSelect
          placeholder="Select one or more friends..."
          options={friends?.map((friend) => ({
            value: friend.id,
            label: friend.name,
          }))}
          onChange={(value) => {
            handleChange(value)
          }}
          value={recipients}
          className="w-full border-none rounded-none bg-transparent hover:bg-transparent"
        />
      </div>
    </div>
  )
}

export default ChatRecipientSelector
