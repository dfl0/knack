import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher"

export async function DELETE(req, { params }) {
  try {
    const { chatId } = params

    const existingChat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { members: true },
    })

    if (!existingChat)
      return new NextResponse("Chat could not be deleted", { status: 400 })

    for (const member of existingChat.members)
      await pusherServer.trigger(member.email, "chat:deleted", existingChat)

    await prisma.chat.update({
      where: { id: chatId },
      data: {
        members: { set: [] },
      }
    })

    const deletedChat = await prisma.chat.delete({
      where: { id: chatId },
    })

    return NextResponse.json(deletedChat)
  } catch (error) {}
}
