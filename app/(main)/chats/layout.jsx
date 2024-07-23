import getCurrentUser from "@/app/actions/getcurrentuser";
import getChats from "@/app/actions/getchats";
import getFriends from "@/app/actions/getfriends";

import ChatSidebar from "@components/chatsidebar";

export default async function ChatsLayout({ children }) {
  const currentUser = await getCurrentUser()
  const chats = await getChats()
  const friends = await getFriends()

  return (
    <main className="h-full w-full flex overflow-scroll">
      <ChatSidebar
        currentUser={currentUser}
        initialChats={chats}
        friends={friends}
        className="w-72"
      />
      {children}
    </main>
  )
}
