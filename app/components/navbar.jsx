"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

import Input from "@components/input"
import Button from "@components/button"
import ToggleButton from "@components/togglebutton"

export default function NavBar({ currentUser, ...props }) {
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
          <ToggleButton active={pathname === "/knacks"}>Knacks</ToggleButton>
        </Link>
        <Link href="/chats">
          <ToggleButton active={pathname === "/chats"}>Chats</ToggleButton>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">{currentUser.name}</div>
        <div className="h-8 w-8 overflow-hidden rounded-xl">
          <Link href="/profile">
            <Image
              src="/images/default_pfp.png"
              alt="Profile Picture"
              width={32}
              height={32}
            />
          </Link>
        </div>
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
