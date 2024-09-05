import prisma from "@/app/libs/prismadb"

import getCurrentUser from "@/app/actions/getcurrentuser"

const getFriends = async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser)
      return []

    const friends = await prisma.user.findMany({
      where: {
        friendIds: {
          has: currentUser.id,
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    if (!friends)
      return []

    return friends
  } catch (error) {
    return []
  }
}

export default getFriends
