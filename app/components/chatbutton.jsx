import clsx from "clsx";

export default function ChatButton({id, title, sub, photo, active, action}) {
  return (
    <button
      onClick={() => action(id)}
      className={clsx(
        "w-full bg-gray-200 hover:bg-slate-300 px-2 py-4 rounded-xl",
        active === id && "bg-slate-400 hover:bg-slate-400"
      )}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
        <div className="flex flex-col justify-center items-start pl-4">
          <div className="text-sm text-black font-semibold">{title}</div>
          <div className="text-xs text-slate-600 italic">{sub}</div>
        </div>
      </div>
    </button>
  );
}
