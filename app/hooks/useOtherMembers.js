import { useSession } from "next-auth/react"
import { useMemo } from "react"

const useOtherMembers = (chat) => {
  const session = useSession()

  const otherMembers = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email
    const otherMembers = chat.members.filter(
      (member) => member.email !== currentUserEmail
    )
    return otherMembers
  }, [session?.data?.user?.email, chat.members])

  return otherMembers
}

export default useOtherMembers
