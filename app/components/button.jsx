"use client"

import { cn } from "@/lib/utils"

const Button = ({ children, variant, uniform, disabled, className, ...props }) => {
  return (
    <button
      className={cn(
        `inline-flex
        h-8
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-zinc-900
        px-3
        py-1
        text-sm
        font-medium
        text-white
        transition-colors
        hover:bg-zinc-800`,
        variant === "secondary" &&
          `bg-zinc-100
          text-zinc-900
          hover:bg-zinc-100/75`,
        variant === "outline" &&
          `bg-transparent
          text-zinc-900
          ring-1
          ring-inset
          ring-zinc-200
          hover:bg-zinc-100`,
        variant === "invisible" &&
          `bg-transparent
          text-zinc-900
          hover:bg-zinc-100`,
        variant === "subtle" &&
          `bg-transparent
          text-zinc-500
          hover:bg-transparent
          hover:text-zinc-900`,
        uniform && "h-auto w-auto shrink-0 p-1",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
