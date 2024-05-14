import { cn } from "@/lib/utils"
import Input from "@components/input"

const AuthForm = ({ className, ...props }) => {
  return (
    <div
      className={cn("mx-auto flex flex-col items-center text-zinc-950", className)}
      {...props}
    >
      <form className="w-full">
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Email"
            className="h-10"
          />
          <Input
            type="password"
            placeholder="Password"
            className="h-10"
          />
          <button
            type="submit"
            className="h-10 rounded-xl bg-zinc-900 px-3 py-1 text-sm font-medium text-white transition-colors"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
