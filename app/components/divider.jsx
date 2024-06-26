import { cn } from "@/lib/utils"

const Divider = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full border-b border-b-zinc-100",
        className
      )}
      {...props}
    />
  )
}

export default Divider
