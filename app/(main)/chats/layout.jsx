import ChatSidebar from "@components/chatsidebar";

export default async function ChatsLayout({ children }) {
  return (
    <main className="h-full w-full flex overflow-scroll">
      <ChatSidebar className="w-72" />
      {children}
    </main>
  )
}
