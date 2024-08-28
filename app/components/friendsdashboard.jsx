"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"

import Button from "@components/button"
import Friend from "@components/friend"
import FriendRequest from "@components/friendrequest"
import Divider from "@components/divider"
import Modal from "@components/modal"
import AddFriendForm from "@components/addfriendform"

const FriendsDashboard = ({ user, initialFriends }) => {
  const [friends, setFriends] = useState(initialFriends)
  const [incomingRequests, setIncomingFriendRequests] = useState(user?.incomingFriendRequests)
  const [outgoingRequests, setOutgoingFriendRequests] = useState(user?.outgoingFriendRequests)
  const [showAddFriend, setShowAddFriend] = useState(false)

  const handleRemove = (user) => {
    const updatedFriends = friends.filter(
      (friend) => friend.id != user.id
    )
    setFriends(updatedFriends)
  }

  const handleAccept = (user) => {
    let i = 0
    while (i < friends.length && user.name > friends[i]?.name) i++
    setFriends([
      ...friends.slice(0, i),
      user,
      ...friends.slice(i)
    ])

    const updatedIncomingRequests = incomingRequests.filter(
      (request) => request.sender.id != user.id
    )
    setIncomingFriendRequests(updatedIncomingRequests)
  }

  const handleReject = (user) => {
    const updatedIncomingRequests = incomingRequests.filter(
      (request) => request.sender.id != user.id
    )
    setIncomingFriendRequests(updatedIncomingRequests)
  }

  const handleCancel = (user) => {
    const updatedOutgoingRequests = outgoingRequests.filter(
      (request) => request.recipient.id != user.id
    )
    setOutgoingFriendRequests(updatedOutgoingRequests)
  }

  if (!user) {
    return (
      <div>Profile page</div>
    )
  }

  return (
    <div className="flex justify-center gap-16 pt-4">
      <div className="w-full">
        <div className="pb-1 flex items-end justify-between">
          <span className="text-sm font-medium text-zinc-500">Friends</span>
          <Button
            variant="subtle"
            onClick={() => setShowAddFriend(true)}
            uniform
            className="self-end"
          >
            <UserPlus size={16} className="shrink-0" />
          </Button>
          <Modal isOpen={showAddFriend} onClose={() => setShowAddFriend(false)}>
            <AddFriendForm />
          </Modal>
        </div>
        <Divider />
        <div className="flex flex-col">
          {friends.map((friend) => (
            <div key={friend.id}>
              <Friend user={friend} onRemove={handleRemove} />
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <span className="pb-1 text-sm font-medium text-zinc-500">Pending</span>
        <Divider />
        <div className="flex flex-col">
          {incomingRequests.map((request) => (
            <div key={request.sender.id}>
              <FriendRequest
                user={request.sender}
                type="incoming"
                onAccept={handleAccept}
                onReject={handleReject}
              />
              <Divider />
            </div>
          ))}
          {outgoingRequests
            .filter((request) => !request.accepted)
            .map((request) => (
              <div key={request.recipient.id}>
                <FriendRequest
                  user={request.recipient}
                  type="outgoing"
                  onCancel={handleCancel}
                />
                <Divider />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FriendsDashboard
