"use server"

import prisma from "@/app/libs/prismadb"

import getCurrentSession from "@/app/actions/getcurrentsession"

const getFriendRequests = async () => {
  try {
    const session = await getCurrentSession()

    if (!session?.user?.email)
      return null

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        outgoingFriendRequests: {
          include: { recipient: true },
        },
        incomingFriendRequests: {
          include: { sender: true },
        },
      },
    })

    if (!currentUser)
      return null

    return {
      outgoing: currentUser.outgoingFriendRequests,
      incoming: currentUser.incomingFriendRequests,
    }
  } catch (error) {
    return null
  }
}

export default getFriendRequests
