import * as React from "react"

import { cn } from "@/lib/utils"

const InputPrompt = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `h-8
        max-h-36
        min-h-8
        resize-none
        appearance-none
        rounded-xl
        border
        border-zinc-200
        px-4
        py-[0.3125rem]
        text-sm
        text-zinc-950
        placeholder-zinc-400
        outline-none
        transition-colors
        hover:bg-zinc-100
        focus:border-zinc-300
        focus:bg-zinc-100`,
        className
      )}
      rows="1"
      autoComplete="off"
      ref={ref}
      {...props}
    ></textarea>
  )
})

export default InputPrompt
