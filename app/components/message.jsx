import { isSameDay, isYesterday, isSameWeek, format } from "date-fns"

import ProfilePicture from "@components/profilepicture"

const Message = ({ sender, body, sentAt, consecutive }) => {
  // format timestamp differently for messages sent the same day, yesterday, same week, or before
  const timestamp = isSameDay(sentAt, new Date())
    ? format(sentAt, "p")
    : isYesterday(sentAt, new Date())
      ? format(sentAt, "'Yesterday at' p")
      : isSameWeek(sentAt, new Date())
        ? format(sentAt, "cccc 'at' p")
        : format(sentAt, "M/d/y p")

  return (
    <div className="text-sm text-zinc-950">
      {!consecutive ? (
        <div className="mt-2 flex flex-col py-0.5 pl-4 pr-10 hover:bg-zinc-100/50">
          <div className="flex items-baseline">
            <ProfilePicture
              src={sender?.pfp}
              alt={sender?.name}
              className="relative top-5 -mt-4 mr-2 h-8 w-8"
            />

            <div className="flex items-baseline gap-1.5 font-medium">
              <span>{sender.name}</span>
              <span className="text-xs text-zinc-500">{timestamp}</span>
            </div>
          </div>

          <div className="ml-10">{body}</div>
        </div>
      ) : (
        <div className="px-4 py-0.5 hover:bg-zinc-100/50">
          <div className="ml-10">{body}</div>
        </div>
      )}
    </div>
  )
}

export default Message
