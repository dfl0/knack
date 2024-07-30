import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser"

const getChatFromId = async (chatId) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return null

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        members: true,
        messages: {
          include: {
            sender: true
          },
          orderBy: {
            sentAt: "asc",
          },
        },
      },
    })

    return chat
  } catch (error) {
    return null
  }
}

export default getChatFromId
