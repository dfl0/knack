import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()
    const otherMembers = body.members
    const memberIds = [
      currentUser.id,
      ...otherMembers.map((member) => member.value),
    ].sort()

    if (!currentUser)
      return new NextResponse("Could not get current user", { status: 401 })

    const existingChat = await prisma.chat.findFirst({
      where: {
        memberIds: {
          equals: memberIds,
        },
      },
      include: { messages: true },
    })

    if (existingChat)
      return NextResponse.json(existingChat)

    const newChat = await prisma.chat.create({
      data: {
        isGroup: otherMembers.length > 1,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: true,
        messages: true,
      },
    })

    for (const member of newChat.members)
      await pusherServer.trigger(member.email, "chat:update", newChat)

    return NextResponse.json(newChat, { status: 201 })
  } catch (error) {
    return new NextResponse(`Internal Error: ${error}`, { status: 500 })
  }
}
