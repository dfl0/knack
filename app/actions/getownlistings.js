"use server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

const getOwnListings = async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser)
      return []

    const listings = prisma.listing.findMany({
      where: { authorId: currentUser.id },
      include: { author: true },
      orderBy: { postedAt: "desc" },
    })

    return listings
  } catch (error) {
    console.log(error)
    return[]
  }
}

export default getOwnListings
