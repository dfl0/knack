import * as React from "react"

const InputPrompt = React.forwardRef(({ ...props }, ref) => {
  return (
    <textarea
      className="
        h-8
        max-h-36
        min-h-8
        grow
        resize-none
        appearance-none
        rounded-xl
        border
        border-zinc-200 px-4
        py-[0.3125rem] text-sm
        text-zinc-950
        placeholder-zinc-400 outline-none
        transition-colors
        hover:bg-zinc-100
        focus:border-zinc-300
        focus:bg-zinc-100
      "
      rows="1"
      autoComplete="off"
      ref={ref}
      {...props}
    ></textarea>
  )
})

export default InputPrompt
