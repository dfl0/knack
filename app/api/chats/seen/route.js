import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req) {
  try {
    const { chatId } = await req.json()
    const currentUser = await getCurrentUser()

    const { updatedChatIds } = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { updatedChatIds: true },
    })

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { updatedChatIds: updatedChatIds.filter((id) => id !== chatId) },
      select: { updatedChatIds: true },
    })

    return new NextResponse(updatedUser.updatedChatIds, { status: 200 })
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}
