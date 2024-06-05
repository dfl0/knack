import * as React from "react"

import { cn } from "@/lib/utils"

const InputPrompt = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `h-10
        max-h-36
        min-h-10
        resize-none
        scroll-p-2
        appearance-none
        rounded-xl
        border
        border-zinc-200
        px-4
        py-[0.625rem]
        text-sm
        text-zinc-950
        placeholder-zinc-400
        outline-none
        transition-colors
        hover:bg-zinc-50
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
