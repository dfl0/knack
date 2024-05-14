import { cn } from "@/lib/utils"

export default function Input({ className, ...props }) {
  return (
    <input
      autoComplete="off"
      className={cn(
        `h-8
        appearance-none
        rounded-xl
        border
        border-zinc-200
        px-4
        py-2
        text-sm
        font-normal
        text-zinc-950
        placeholder-zinc-500
        shadow-none
        outline-none
        transition-colors
        hover:bg-zinc-100
        focus:border-zinc-300
        focus:bg-zinc-100`,
        className
      )}
      {...props}
      />
  )
}
