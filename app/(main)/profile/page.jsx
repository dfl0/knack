import getCurrentUser from "@/app/actions/getcurrentuser"
import getFriends from "@/app/actions/getfriends"

import ProfilePicture from "@/app/components/profilepicture"
import FriendsDashboard from "@/app/components/friendsdashboard"

export default async function Profile() {
  const currentUser = await getCurrentUser()
  const initialFriends = await getFriends()

  return (
    <div className="container mx-auto my-8 flex flex-col gap-8">
      <div className="text-lg font-medium text-zinc-950">
        Profile
      </div>

      <ProfilePicture
        src={currentUser.pfp || null}
        name={currentUser.name}
        editable
      />

      <FriendsDashboard
        user={currentUser}
        initialFriends={initialFriends}
      />
    </div>
  )
}
