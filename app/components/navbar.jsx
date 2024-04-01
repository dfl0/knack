"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "@components/input";
import ToggleButton from "@components/togglebutton";

export default function NavBar() {
  const pathname = usePathname();
  let username = "student1";
  return (
    <div className="flex items-center w-full h-14 px-8 overflow-hidden border-b border-zinc-100">
      <div className="text-md text-zinc-950 font-bold">
        <Link href="/knacks">
          <span className="pr-4">/ /</span>
          <span className="text-zinc-950">KNACK</span>
        </Link>
      </div>
      <div className="flex grow mx-20">
        <Input
          type="text"
          placeholder="Search documentation..."
          name="Search Knack"
        />
      </div>
      {
        // <div className="text-sm flex gap-6 mr-20 static">
        //   <Link
        //     href="/knacks"
        //     className={clsx({
        //       "border-solid border-b-[1px] border-b-gray-400 border-t-1 border-t-transparent":
        //         pathname === "/knacks",
        //     })}
        //   >
        //     <span className="text-gray-500 pr-0.5">KNICK</span>
        //     <span>KNACKS</span>
        //   </Link>
        //   <Link
        //     href="/chat"
        //     className={clsx({
        //       "border-solid border-b-[1px] border-b-gray-400 border-t-1 border-t-transparent":
        //         pathname === "/chat",
        //     })}
        //   >
        //     <span className="text-gray-500 pr-0.5">KNACK</span>
        //     <span>CHATS</span>
        //   </Link>
        // </div>
      }
      <div className="shrink-0 h-9 bg-zinc-100 mr-10 p-1 flex items-center rounded-xl">
        <Link href="/knacks">
          <ToggleButton active={pathname === "/knacks"}>Knacks</ToggleButton>
        </Link>
        <Link href="/chats">
          <ToggleButton active={pathname === "/chats"}>Chats</ToggleButton>
        </Link>
      </div>
      <div className="text-sm">{username}</div>
      <div className="w-8 h-8 rounded-xl ml-2 overflow-hidden">
        <Image
          src="/images/default_pfp.png"
          alt="Profile Picture"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
}
