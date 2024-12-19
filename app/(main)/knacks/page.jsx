"use client"

import { useRouter } from "next/navigation"

import Button from "@components/button"

export default function Knacks() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push("/knacks/new")}
    >
      New listing
    </Button>
  )
}
