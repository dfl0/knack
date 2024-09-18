"use client"

import { useState, useMemo, useEffect } from "react"
import { useSession } from "next-auth/react"
import { UserPlus } from "lucide-react"

import { pusherClient } from "@/app/libs/pusher"

import Button from "@components/button"
import Friend from "@components/friend"
import FriendRequest from "@components/friendrequest"
import Divider from "@components/divider"
import Modal from "@components/modal"
import AddFriendForm from "@components/addfriendform"

const FriendsDashboard = ({ user, initialFriends }) => {
  const session = useSession()
  const [friends, setFriends] = useState(initialFriends)
  const [incomingRequests, setIncomingRequests] = useState(user?.incomingFriendRequests)
  const [outgoingRequests, setOutgoingRequests] = useState(user?.outgoingFriendRequests)
  const [showAddFriend, setShowAddFriend] = useState(false)

  const currentUserEmail = useMemo(() => {
    return session.data?.user.email
  }, [session])

  useEffect(() => {
    if (!currentUserEmail) return

    pusherClient.subscribe(currentUserEmail)

    const newRequestHandler = (newRequest) => {
      if (currentUserEmail === newRequest.sender.email) {
        setOutgoingRequests([...outgoingRequests, newRequest])
      } else if (currentUserEmail === newRequest.recipient.email) {
        setIncomingRequests([...incomingRequests, newRequest])
      }
    }

    const acceptRequestHandler = (acceptedRequest) => {
      if (currentUserEmail === acceptedRequest.recipient.email) {
        setIncomingRequests(
          incomingRequests.filter(
            (request) => request.sender.id !== acceptedRequest.sender.id
          )
        )

        let i = 0
        while (i < friends.length && acceptedRequest.sender.name > friends[i]?.name) i++
        setFriends([
          ...friends.slice(0, i),
          acceptedRequest.sender,
          ...friends.slice(i)
        ])
      } else if (currentUserEmail === acceptedRequest.sender.email) {
        setOutgoingRequests(
          outgoingRequests.filter(
            (request) => request.recipient.id !== acceptedRequest.recipient.id
          )
        )

        let i = 0
        while (i < friends.length && acceptedRequest.recipient.name > friends[i]?.name) i++
        setFriends([
          ...friends.slice(0, i),
          acceptedRequest.recipient,
          ...friends.slice(i)
        ])
      }
    }

    const rejectRequestHandler = (rejectedRequest) => {
      if (currentUserEmail === rejectedRequest.recipient.email) {
        setIncomingRequests(
          incomingRequests.filter(
            (request) => request.sender.id !== rejectedRequest.sender.id
          )
        )
      } else if (currentUserEmail === rejectedRequest.sender.email) {
        setOutgoingRequests(
          outgoingRequests.filter(
            (request) => request.recipient.id !== rejectedRequest.recipient.id
          )
        )
      }
    }

    const cancelRequestHandler = (cancelledRequest) => {
      if (currentUserEmail === cancelledRequest.sender.email) {
        setOutgoingRequests(
          outgoingRequests.filter(
            (request) => request.recipient.id !== cancelledRequest.recipient.id
          )
        )
      } else if (currentUserEmail === cancelledRequest.recipient.email) {
        setIncomingRequests(
          incomingRequests.filter(
            (request) => request.sender.id !== cancelledRequest.sender.id
          )
        )
      }
    }

    const removeFriendHandler = (user) => {
      setFriends(
        friends.filter(
          (friend) => friend.id !== user.id
        )
      )
    }

    pusherClient.bind("request:new", newRequestHandler)
    pusherClient.bind("request:accept", acceptRequestHandler)
    pusherClient.bind("request:reject", rejectRequestHandler)
    pusherClient.bind("request:cancel",cancelRequestHandler)
    pusherClient.bind("friend:remove", removeFriendHandler)

    return () => {
      pusherClient.unsubscribe(currentUserEmail)
      pusherClient.unbind("request:new", newRequestHandler)
      pusherClient.unbind("request:accept", acceptRequestHandler)
      pusherClient.unbind("request:reject", rejectRequestHandler)
      pusherClient.unbind("request:cancel", cancelRequestHandler)
      pusherClient.unbind("friend:remove", removeFriendHandler)
    }
  }, [currentUserEmail, outgoingRequests, incomingRequests, friends])

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
              <Friend user={friend} />
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
