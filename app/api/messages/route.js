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
          orderBy: { sentAt: "desc" },
          include: { sender: true },
          take: 1, // only include latest message needs to be passed to the chat update event
        },
      },
    })

    for (const member of updatedChat.members) {
      if (member.id !== currentUser.id) {
        await prisma.user.update({
          where: { id: member.id },
          data: {
            updatedChatIds: member.updatedChatIds?.includes(updatedChat.id)
              ? member.updatedChatIds
              : [updatedChat.id, ...member.updatedChatIds],
          },
        })
      }

      await pusherServer.trigger(member.email, "chat:update", updatedChat)
    }

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error)
    return new NextResponse(error, { status: 500 })
  }
}
