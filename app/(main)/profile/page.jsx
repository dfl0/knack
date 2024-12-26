import getCurrentUser from "@/app/actions/getcurrentuser"
import getFriends from "@/app/actions/getfriends"

import FriendsDashboard from "@/app/components/friendsdashboard"

export default async function Profile() {
  const currentUser = await getCurrentUser()
  const initialFriends = await getFriends()

  return (
    <div className="container flex flex-col mx-auto my-8 gap-8">
      <div className="text-lg font-medium text-zinc-950">
        Profile
      </div>
      <FriendsDashboard
        user={currentUser}
        initialFriends={initialFriends}
      />
    </div>
  )
}
