import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

const getChats = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return []

  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        memberIds: {
          has: currentUser.id,
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: {
            sentAt: "asc",
          },
          include: {
            sender: true,
          },
        },
      },
    })

    if (!chats) return []

    return chats
  } catch (error) {
    return []
  }
}

export default getChats
