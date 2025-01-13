import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req, { params }) {
  try {
    const { chatId } = params
    const currentUser = await getCurrentUser()

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        updatedChatIds: currentUser.updatedChatIds.filter(
          (id) => id !== chatId
        ),
      },
    })

    return new NextResponse({ status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(error, { status: 500 })
  }
}
