"use server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

const getUserListings = async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser)
      return []

    const listings = prisma.listing.findMany({
      where: { authorId: currentUser.id },
      include: { author: true },
    })

    return listings
  } catch (error) {
    console.log(error)
    return[]
  }
}

export default getUserListings
