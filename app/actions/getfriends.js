import prisma from "@/app/libs/prismadb"

import getCurrentUser from "@/app/actions/getcurrentuser"

const getFriends = async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser)
      return null

    const friends = await prisma.user.findMany({
      where: {
        friendIds: {
          has: currentUser.id,
        },
      },
    })

    if (!friends)
      return null

    return friends
  } catch (error) {
    return null
  }
}

export default getFriends
