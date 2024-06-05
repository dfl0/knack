import AuthForm from "@components/authform"

export default function Authenticate() {
  return (
    <div className="flex min-h-full items-center">
      <div className="mx-auto flex w-80 flex-col items-center text-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome.
        </h1>
        <AuthForm className="mt-2 w-full" />
      </div>
    </div>
  )
}
