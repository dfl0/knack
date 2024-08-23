import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req) {
  try {
    const { body, chatId } = await req.json()
    const currentUser = await getCurrentUser()

    const newMessage = await prisma.message.create({
      data: {
        body,
        sender: {
          connect: { id: currentUser.id },
        },
        chat: {
          connect: { id: chatId },
        },
      },
      include: { sender: true },
    })

    if (!newMessage)
      return new NextResponse("Message could not be sent", { status: 400 })

    await pusherServer.trigger(chatId, "messages:new", newMessage)

    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        updatedAt: new Date(),
      },
      include: {
        members: true,
        messages: {
          orderBy: { sentAt: "asc" },
          include: { sender: true },
        },
      },
    })

    for (const member of updatedChat.members) {
      await pusherServer.trigger(member.email, "chat:update", updatedChat)

      if (member.id !== currentUser.id) {
        await prisma.user.update({
          where: {
            id: member.id,
          },
          data: {
            updatedChatIds: member.updatedChatIds.includes(updatedChat.id)
              ? member.updatedChatids
              : [...member.updatedChatIds, updatedChat.id],
          },
        })
      }
    }

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error)
    return new NextResponse(error, { status: 500 })
  }
}
