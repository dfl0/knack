import getCurrentUser from "@/app/actions/getcurrentuser"
import getFriends from "@/app/actions/getfriends"

import FriendsDashboard from "@/app/components/friendsdashboard"

export default async function Profile() {
  const currentUser = await getCurrentUser()
  const initialFriends = await getFriends()

  return (
    <div className="h-full w-full px-64 py-6">
      <div className="m-auto w-full text-lg font-medium text-zinc-950">
        Profile
      </div>
      <FriendsDashboard
        user={currentUser}
        initialFriends={initialFriends}
      />
    </div>
  )
}
