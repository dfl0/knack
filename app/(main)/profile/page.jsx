import getCurrentUser from "@/app/actions/getcurrentuser"
import getFriends from "@/app/actions/getfriends"

import Friend from "@components/friend"
import FriendRequest from "@components/friendrequest"
import Divider from "@components/divider"

export default async function Profile() {
  const currentUser = await getCurrentUser()
  const friends = await getFriends()

  console.log(currentUser.friendIds)

  return (
    <div className="h-full w-full px-64 py-6">
      <div className="m-auto w-full text-lg font-medium text-zinc-950">
        Profile
      </div>
      <div className="flex justify-center gap-16 pt-4">
        <div className="w-full">
          <div className="mb-2 text-xs font-medium text-zinc-400">Friends</div>
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
          <div className="mb-2 text-xs font-medium text-zinc-400">Pending</div>
          <Divider />
          <div className="flex flex-col">
            {currentUser.incomingFriendRequests
              .map((request) => (
                <div key={request.sender.id}>
                  <FriendRequest
                    user={request.sender}
                    type="incoming"
                  />
                  <Divider />
                </div>
              ))}
            {currentUser.outgoingFriendRequests
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
    </div>
  )
}
