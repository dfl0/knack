import clsx from "clsx"

export default function ToggleButton({ children, active = false, ...props }) {
  return (
    <>
      <button
        className={clsx(
          "rounded-lg px-3 py-1 text-sm font-medium text-zinc-500 transition-colors",
          active && "bg-white text-zinc-950 shadow transition-colors"
        )}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
