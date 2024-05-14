import AuthForm from "@components/authform"

export default function Authenticate() {
  return (
    <div className="flex min-h-full items-center">
      <div className="flex flex-col items-center mx-auto w-80 text-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome.
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Sign in to your account
        </p>
        <AuthForm className="mt-6 w-full" />
        <div className="mt-6 flex gap-1">
          <span className="text-sm text-zinc-500">
            Don't have an account?
          </span>
          <span className="text-sm text-zinc-500 underline decoration-zinc-400 hover:text-zinc-700 transition-colors">
            <a href="/chats">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
