"use client"

import { useRouter } from "next/navigation"
import { isSameDay, isYesterday, isSameWeek, format } from "date-fns"

import Image from "next/image"

import { cn } from "@/lib/utils"

import ProfilePicture from "@components/profilepicture"

const Listing = ({ id, author, image, description, price, postedAt, className, ...props }) => {
  const router = useRouter()

  const formattedPrice = (price / 100).toFixed(2).toString()

  const timestamp = isSameDay(postedAt, new Date())
    ? format(postedAt, "p")
    : isYesterday(postedAt, new Date())
      ? format(postedAt, "'Yesterday at' p")
      : isSameWeek(postedAt, new Date())
        ? format(postedAt, "cccc 'at' p")
        : format(postedAt, "M/d/y p")

  return (
    <div
      onClick={() => router.push(`/knacks/${id}`)}
      className={cn(
        "flex w-96 flex-col rounded-lg border hover:cursor-pointer hover:bg-zinc-50",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4 border-b px-2 py-2">
        <div className="flex shrink-0 items-center gap-2">
          <ProfilePicture
            src={author?.pfp}
            alt={author?.name}
            className="h-7 w-7"
          />

          <span className="text-sm font-medium">{author.name}</span>
        </div>
        <span className="text-xs text-zinc-500">{timestamp}</span>
      </div>

      <div className="relative h-72">
        <Image
          src={image}
          alt={`${author.name}'s listing`}
          fill={true}
          sizes="100vw, 50vw, 33vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-baseline justify-between gap-4 border-t px-2 py-2">
        <span className="truncate text-sm">{description}</span>
        <div className="text-sm font-medium">
          <span className="pr-0.5">$</span>
          <span>{formattedPrice}</span>
        </div>
      </div>
    </div>
  )
}

export default Listing
