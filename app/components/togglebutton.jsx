import clsx from "clsx";

export default function ToggleButton({children, active = false, ...props}) {
  return (
    <>
      <button
        className={clsx(
          "text-sm font-medium px-3 py-1 text-zinc-500 rounded-lg transition-colors",
          active && "bg-white shadow text-zinc-950 transition-colors"
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
