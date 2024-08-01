import getChatFromId from "@/app/actions/getchatfromid"

import Messages from "@components/messages"
import ChatPrompt from "@components/chatprompt"

const ChatId = async ({ params }) => {
  const currentChat = await getChatFromId(params.chatId)

  return (
    <div className="flex h-full w-full flex-col">
      <Messages
        chatId={currentChat.id}
        initialMessages={currentChat.messages}
      />
      <ChatPrompt chat={currentChat} />
    </div>
  )
}

export default ChatId
