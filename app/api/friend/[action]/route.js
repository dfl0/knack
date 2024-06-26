import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

export async function POST(req, { params }) {
  try {
    const { action } = params
    const body = await req.json()

    if (action === "add") {
      const { username } = body

      if (!username)
        return new NextResponse("Missing username", { status: 400 })

      const recipient = await prisma.user.findUnique({
        where: { email: `${username}@binghamton.edu` },
      })

      if (!recipient)
        return new NextResponse(`User ${username} not found`, { status: 400 })

      const currentUser = await getCurrentUser()

      if (recipient.id === currentUser.id)
        return new NextResponse("You can not add yourself as a friend", { status: 400 })

      if (currentUser.outgoingFriendRequests.find((request) => request.recipientId === recipient.id) !== undefined)
        return new NextResponse(`You have already requested to be ${recipient.name}'s friend`, { status: 400 })

      if (currentUser.incomingFriendRequests.find((request) => request.senderId === recipient.id) !== undefined)
        return new NextResponse(`${recipient.name} already sent you a friend request`, { status: 400 })

      const outgoingRequest = await prisma.friendRequest.create({
        data: {
          sender: {
            connect: { id: currentUser.id },
          },
          recipient: {
            connect: { id: recipient.id },
          },
        },
        include: {
          sender: true,
          recipient: true,
        },
      })

      if (!outgoingRequest)
        return new NextResponse("Friend request could not be sent", { status: 400 })

      return NextResponse.json(outgoingRequest)
    } else if (action === "remove") {
      const friend = body
      const currentUser = await getCurrentUser()

      const { friendIds: friendFriendIds } = await prisma.user.findUnique({
        where: { id: friend.id },
        select: { friendIds: true },
      })

      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          friendIds: {
            set: currentUser.friendIds.filter((id) => id !== friend.id),
          },
        },
      })

      await prisma.user.update({
        where: { id: friend.id },
        data: {
          friendIds: {
            set: friendFriendIds.filter((id) => id !== currentUser.id),
          },
        },
      })

      return NextResponse.json(friend)
    } else if (action === "accept") {
      const sender = body

      const currentUser = await getCurrentUser()

      const { friendIds: currentFriendIds } = await prisma.user.findUnique({
        where: { id: currentUser.id },
        select: { friendIds: true },
      })

      if (currentFriendIds.includes(sender.id))
        return new NextResponse(`You are already friends with ${sender.name}`, { status: 400 })

      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          friendIds: {
            push: sender.id,
          },
        },
      })

      const { friendIds: senderFriendIds } = await prisma.user.findUnique({
        where: { id: sender.id },
        select: { friendIds: true },
      })

      if (senderFriendIds.includes(currentUser.id))
        return new NextResponse(`${sender.name} is already friends with you`, { status: 400 })

      await prisma.user.update({
        where: { id: sender.id },
        data: {
          friendIds: {
            push: currentUser.id,
          },
        },
      })

      const acceptedFriendRequest = await prisma.friendRequest.delete({
        where: {
          userIds: {
            senderId: sender.id,
            recipientId: currentUser.id,
          },
        },
      })

      if (!acceptedFriendRequest)
        return new NextResponse("Friend request could not be accepted", { status: 400 })

      return NextResponse.json(acceptedFriendRequest)
    } else if (action === "reject") {
      const userId = body.id

      const currentUser = await getCurrentUser()

      const rejectedRequest = await prisma.friendRequest.delete({
        where: {
          userIds: {
            senderId: userId,
            recipientId: currentUser.id,
          },
        },
        include: {
          sender: true,
          recipient: true,
        },
      })

      if (!rejectedRequest)
        return new NextResponse("Friend request could not be rejected", { status: 400 })

      return NextResponse.json(rejectedRequest)
    } else if (action === "cancel") {
      const userId = body.id

      const currentUser = await getCurrentUser()

      const cancelledRequest = await prisma.friendRequest.delete({
        where: {
          userIds: {
            senderId: currentUser.id,
            recipientId: userId,
          },
        },
        include: {
          sender: true,
          recipient: true,
        },
      })

      if (!cancelledRequest)
        return new NextResponse("Friend request could not be cancelled", { status: 400 })

      return NextResponse.json(cancelledRequest)
    } else {
      return new NextResponse(`${action} is not a valid action`, { status: 500 })
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
