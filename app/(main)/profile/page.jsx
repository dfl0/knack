import FriendsList from "@components/friendslist"
import FriendRequestsList from "@components/friendrequestslist"
import Divider from "@components/divider"

export default function Profile() {
  return (
    <div className="h-full w-full px-64 py-6">
      <div className="m-auto w-full text-lg font-medium text-zinc-950">
        Profile
      </div>
      <div className="flex justify-center gap-16 pt-4">
        <div className="w-full">
          <div className="mb-2 text-xs font-medium text-zinc-400">Friends</div>
          <Divider />
          <FriendsList />
        </div>
        <div className="w-full">
          <div className="mb-2 text-xs font-medium text-zinc-400">Pending</div>
          <Divider />
          <FriendRequestsList />
        </div>
      </div>
    </div>
  )
}
