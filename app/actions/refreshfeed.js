"use server"

import { revalidatePath } from "next/cache"

const refreshFeed = () => {
  revalidatePath("/knacks")
}

export default refreshFeed
