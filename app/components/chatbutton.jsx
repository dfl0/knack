import clsx from "clsx"

export default function ChatButton({ id, title, sub, photo, active, action }) {
  return (
    <button
      onClick={() => action(id)}
      className={clsx(
        "w-full rounded-xl p-2 text-zinc-950 hover:bg-zinc-100",
        active === id && "bg-zinc-100"
      )}
    >
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-xl bg-zinc-300"></div>
        <div className="ml-2 flex flex-col items-start justify-center">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-zinc-500">{sub}</div>
        </div>
      </div>
    </button>
  )
}
