"use server"

import prisma from "@/app/libs/prismadb"

const getListingFromId = async (knackId) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: knackId },
      include: { author: true },
    })

    return listing
  } catch (error) {
    return null
  }
}

export default getListingFromId
