import * as React from "react";

const InputPrompt = React.forwardRef(({...props}, ref) => {
  return (
    <textarea
      className="
        appearance-none
        outline-none
        resize-none
        h-8
        min-h-8
        max-h-36
        px-4
        py-[0.3125rem]
        grow rounded-xl
        text-sm text-zinc-950
        placeholder-zinc-400
        border border-zinc-200
        hover:bg-zinc-100
        focus:bg-zinc-100
        focus:border-zinc-300
        transition-colors
      "
      rows="1"
      autoComplete="off"
      ref={ref}
      {...props}
    >
    </textarea>
  );
})

export default InputPrompt;
