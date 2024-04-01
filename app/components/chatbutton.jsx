import clsx from "clsx";

export default function ChatButton({ id, title, sub, photo, active, action }) {
  return (
    <button
      onClick={() => action(id)}
      className={clsx(
        "w-full text-zinc-950 hover:bg-zinc-100 p-2 rounded-xl",
        active === id && "bg-zinc-100",
      )}
    >
      <div className="flex items-center">
        <div className="h-8 w-8 bg-zinc-300 rounded-xl"></div>
        <div className="flex flex-col justify-center items-start ml-2">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-zinc-500">{sub}</div>
        </div>
      </div>
    </button>
  );
}
