import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"
import deleteObjectWithKey from "@/app/actions/deleteobjectwithkey"

async function POST(req) {
  try {
    const { image } = await req.json()
    const currentUser = await getCurrentUser()
    const oldPFPKey = currentUser.pfp?.split("/").pop()

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { pfp: image }
    })

    if (!updatedUser || oldPFPKey && !deleteObjectWithKey(oldPFPKey))
      return new NextResponse("Profile picture could not be updated", { status: 400 })

    return new NextResponse({ status: 200 })
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}

async function DELETE(req) {
  try {
    const currentUser = await getCurrentUser()
    const oldPFPKey = currentUser.pfp.split("/").pop()

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { pfp: null }
    })

    if (!updatedUser && !deleteObjectWithKey(oldPFPKey))
      return new NextResponse("Profile picture could not be deleted", { status: 400 })

    return new NextResponse({ status: 200 })
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}

export { POST, DELETE }
