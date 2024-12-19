import { forwardRef } from "react"

import { cn } from "@/lib/utils"

const InputPrompt = forwardRef(({ register, errors, disabled, className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...register}
      rows="1"
      autoComplete="off"
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
        py-[0.57rem]
        text-sm
        text-zinc-950
        placeholder-zinc-400
        outline-none
        transition-colors
        hover:bg-zinc-50
        focus:border-zinc-300
        focus:bg-zinc-100`,
        errors &&
          "border-rose-500 bg-red-50 hover:bg-red-50 focus:border-rose-500 focus:bg-red-50",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    ></textarea>
  )
})

InputPrompt.displayName = "InputPrompt"

export default InputPrompt
