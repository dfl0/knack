"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

import Input from "@components/input"
import Button from "@components/button"
import ToggleButton from "@components/togglebutton"
import ProfilePicture from "@components/profilepicture"

export default function NavBar({ currentUser, ...props }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div
      className="flex h-14 w-full items-center overflow-hidden border-b border-zinc-100 px-8 text-zinc-950"
      {...props}
    >
      <div className="text-md font-bold">
        <Link href="/knacks">
          <span className="pr-4">/ /</span>
          <span>KNACK</span>
        </Link>
      </div>
      <div className="mx-20 flex grow">
        <Input
          type="text"
          placeholder="Search for Knacks..."
          name="Search Knack"
          className="grow"
        />
      </div>
      <div className="mr-10 flex h-9 shrink-0 items-center rounded-xl bg-zinc-100 p-1">
        <Link href="/knacks">
          <ToggleButton active={/^\/knacks([\/a-zA-Z0-9]*)?$/.test(pathname)}>Knacks</ToggleButton>
        </Link>
        <Link href="/chats">
          <ToggleButton active={/^\/chats([\/a-zA-Z0-9]*)?$/.test(pathname)}>Chats</ToggleButton>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">{currentUser?.name}</div>
        <ProfilePicture
          src={currentUser?.pfp}
          name={currentUser.name}
          onClick={() => router.push("/profile")}
          className="h-8 w-8 hover:cursor-pointer"
        />
        <Button
          variant="invisible"
          onClick={() => signOut()}
          className="h-8 w-8 p-2"
        >
          <LogOut />
        </Button>
      </div>
    </div>
  )
}
