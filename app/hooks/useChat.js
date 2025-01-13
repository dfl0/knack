import { useParams } from "next/navigation"
import { useMemo } from "react"

const useChat = () => {
  const params = useParams()

  const currentChatId = useMemo(() => {
    if (!params?.chatId) return ""
    return params?.chatId
  }, [params?.chatId])

  return useMemo(() => ({
    currentChatId
  }), [currentChatId])
}

export default useChat
