import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import deleteObjectWithKey from "@/app/actions/deleteobjectwithkey"

export async function DELETE(req, { params }) {
  try {
    const { knackId } = params

    const deletedListing = await prisma.listing.delete({
      where: { id: knackId },
    })

    console.log(deletedListing)

    const listingImageKey = deletedListing.image.split("/").pop()

    console.log(listingImageKey)

    if (!deletedListing && listingImageKey || !deleteObjectWithKey(listingImageKey))
      return new NextResponse("Profile picture could not be deleted", { status: 400 })

    return NextResponse.json(deletedListing)
  } catch (error) {
    console.log(error)
    return new NextResponse(error, { status: 500 })
  }
}
