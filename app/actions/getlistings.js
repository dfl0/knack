import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

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
