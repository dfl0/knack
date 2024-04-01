export default function Input({ ...props }) {
  return (
    <input
      {...props}
      autoComplete="off"
      className="
        h-8
        grow
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
        focus:bg-zinc-100
      "
    />
  )
}
