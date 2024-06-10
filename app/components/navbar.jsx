"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { FiLogOut } from "react-icons/fi"

import Input from "@components/input"
import Button from "@components/button"
import ToggleButton from "@components/togglebutton"

export default function NavBar({ currentUser, ...props }) {
  const pathname = usePathname()

  return (
    <div
      className="flex h-14 w-full items-center overflow-hidden border-b border-zinc-100 px-8"
      {...props}
    >
      <div className="text-md font-bold text-zinc-950">
        <Link href="/knacks">
          <span className="pr-4">/ /</span>
          <span className="text-zinc-950">KNACK</span>
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
          <Image
            src="/images/default_pfp.png"
            alt="Profile Picture"
            width={32}
            height={32}
          />
        </div>
        <Button
          variant="invisible"
          onClick={() => signOut()}
          className="h-8 w-8 p-2"
        >
          <FiLogOut />
        </Button>
      </div>
    </div>
  )
}
