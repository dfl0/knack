export default function Input({...props}) {
  return (
    <input
      {...props}
      autoComplete="off"
      className="
        appearance-none
        outline-none
        h-8
        px-4
        py-2
        grow
        rounded-xl
        text-sm
        font-normal
        shadow-none
        text-zinc-950
        placeholder-zinc-500
        border
        border-zinc-200
        hover:bg-zinc-100
        focus:bg-zinc-100
        focus:border-zinc-300
        transition-colors
      "
    />
  );
}
