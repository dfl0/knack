import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function DELETE(req, { params }) {
  try {
    const { chatId } = params

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        members: {
          set: [],
        },
      },
    })

    if (!updatedChat)
      return new NextResponse("Chat could not be deleted", { status: 400 })

    const deletedChat = await prisma.chat.delete({
      where: {
        id: chatId,
      },
      include: {
        members: true,
      },
    })


    return NextResponse.json(deletedChat)
  } catch (error) {}
}
