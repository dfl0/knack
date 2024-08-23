import { useParams } from "next/navigation"
import { useMemo } from "react"

const useChat = () => {
  const params = useParams()

  const chatId = useMemo(() => {
    if (!params?.chatId) return ""
    return params?.chatId
  }, [params?.chatId])

  return useMemo(() => ({
    chatId
  }), [chatId])
}

export default useChat
