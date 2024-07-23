"use client"

import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import Button from "@components/button"
import SearchSelect from "@components/searchselect"

const CreateChatForm = ({ friends, onCreate }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      members: [],
    },
  })

  const members = watch("members")

  const onSubmit = (data) => {
    setIsLoading(true)

    axios
      .post("/api/chats", data)
      .then((res) => {
        onCreate(res.data, res.status === 201)
        router.push(`/chats/${res.data.id}`)
      })
      .catch((error) => console.log(error.response.data))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-zinc-950">New Chat</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center gap-2">
          <SearchSelect
            placeholder="Select one or more friends..."
            register={{
              ...register("members", {
                required: true,
                validate: (value) => value.length > 0,
              }),
            }}
            disabled={isLoading}
            options={friends.map((friend) => ({
              value: friend.id,
              label: friend.name,
            }))}
            onChange={(value) =>
              setValue("members", value, { shouldValidate: true })
            }
            value={members}
            errors={errors.members}
            className="w-full"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="h-9"
          >
            Chat
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateChatForm
