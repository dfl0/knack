"use server"

import prisma from "@/app/libs/prismadb"

const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        postedAt: "desc",
      },
      include: {
        author: true,
      },
    })

    if (!listings) return []

    return listings
  } catch (error) {
    return []
  }
}

export default getListings
