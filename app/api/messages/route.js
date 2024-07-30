import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req) {
  try {
    const { body, chatId } = await req.json()
    const currentUser = await getCurrentUser()

    console.log(body)
    console.log(chatId)

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
    })

    if (!newMessage)
      return new NextResponse("Message could not be sent", { status: 400 })

    return NextResponse.json(newMessage)
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}
