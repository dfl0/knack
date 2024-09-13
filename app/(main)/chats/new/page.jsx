import getFriends from "@/app/actions/getfriends"

import NewChatBody from "@components/newchatbody"

const NewChat = async () => {
  const friends = await getFriends()

  return <NewChatBody friends={friends} />
}

export default NewChat
