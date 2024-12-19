import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req) {
  try {
    const { description, price } = await req.json()
    const currentUser = await getCurrentUser()

    const newListing = await prisma.listing.create({
      data: {
        description,
        price,
        author: {
          connect: { id: currentUser.id },
        },
      },
      include: {
        author: {
          include: { listings: true },
        },
      },
    })

    if (!newListing)
      return new NextResponse("Listing could not be created", { status: 400 })

    return NextResponse.json(newListing)
  } catch (error) {
    console.log(error)
    return new NextResponse(error, { status: 500 })
  }
}
