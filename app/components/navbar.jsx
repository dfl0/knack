'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();
  let username = "student1"
  return (
    <div className="flex items-center w-full h-14 px-6 bg-gray-200 fixed overflow-hidden">
      <div className="text-2xl font-bold">
        <Link href="/knacks">
          KNACK
        </Link>
      </div>
      <input type="text" placeholder="What are you looking for?" name="Search" className="appearance-none outline-none text-sm bg-gray-300 border px-4 rounded-xl h-8 grow mx-20" />
      <div className="text-sm flex gap-6 mr-20 static">
        <Link
          href="/knacks"
          className={ clsx({ 'border-solid border-b-[1px] border-b-gray-400 border-t-1 border-t-transparent': pathname === '/knacks' }) }
        >
          <span className="text-gray-500 pr-0.5">KNICK</span><span>KNACKS</span>
        </Link>
        <Link
          href="/chat"
          className={ clsx({ 'border-solid border-b-[1px] border-b-gray-400 border-t-1 border-t-transparent': pathname === '/chat' }) }
        >
          <span className="text-gray-500 pr-0.5">KNACK</span><span>CHATS</span>
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
