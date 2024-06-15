"use client"

import axios from "axios"
import { useCallback, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import Input from "@components/input"
import Button from "@components/button"

const AuthForm = ({ className, ...props }) => {
  const session = useSession()
  const router = useRouter()
  const [hasAccount, setHasAccount] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/knacks")
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (hasAccount) {
      setHasAccount(false)
    } else {
      setHasAccount(true)
    }
  }, [hasAccount])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data) => {
    setIsLoading(true)

    if (hasAccount) {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) toast.error("Invalid credentials")

          if (callback?.ok) toast.success("Logged in")
        })
        .finally(() => setIsLoading(false))
    } else {
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Failed to register user"))
        .then(() => {
          toast.success("Successfully registered!")
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <div
      className={cn("mx-auto flex flex-col gap-6 text-zinc-950", className)}
      {...props}
    >
      <p className="text-center text-sm text-zinc-500">
        {hasAccount ? "Sign in to your account" : "Sign up with your email"}
      </p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {!hasAccount && (
            <Input
              id="name"
              type="text"
              placeholder="Name"
              register={{
                ...register("name", {
                  required: true,
                }),
              }}
              disabled={isLoading}
              errors={errors.name}
              className="h-10"
            />
          )}
          <Input
            id="email"
            type="email"
            placeholder="Email"
            register={{
              ...register("email", {
                required: true,
              }),
            }}
            disabled={isLoading}
            errors={errors.email}
            className="h-10"
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            register={{
              ...register("password", {
                required: true,
              }),
            }}
            disabled={isLoading}
            errors={errors.password}
            className="h-10"
          />
          <Button type="submit" disabled={isLoading} className="h-10 w-full">
            {hasAccount ? "Sign In" : "Register"}
          </Button>
        </div>
      </form>
      <div className="mx-auto flex gap-1">
        <span className="text-sm text-zinc-500">
          {hasAccount ? "Dont have an account?" : "Already have an account?"}
        </span>
        <span className="text-sm text-zinc-500 underline decoration-zinc-400 transition-colors hover:text-zinc-700">
          <a onClick={toggleVariant} className="cursor-pointer">
            {hasAccount ? "Sign up" : "Sign in"}
          </a>
        </span>
      </div>
    </div>
  )
}

export default AuthForm
