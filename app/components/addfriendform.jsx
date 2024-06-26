import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import Input from "@components/input"
import Button from "@components/button"

const AddFriendForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = (data) => {
    setIsLoading(true)

    axios
      .post("/api/friend/add", data)
      .then((res) => {
        const request = res.data
        toast.success(`Friend request sent to ${request.recipient.name}`)
      })
      .catch((error) => toast.error(error.response.data))
      .finally(setIsLoading(false))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-zinc-950">Add Friend</h1>
        <p className="text-sm text-zinc-500">
          Send someone a friend request to start chatting.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center gap-2">
            <Input
              id="username"
              type="text"
              placeholder="@binghamton.edu"
              register={{
                ...register("username", {
                  required: true,
                }),
              }}
              disabled={isLoading}
              errors={errors.username}
              className="h-9 w-full placeholder:text-right"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button type="submit" disabled={isLoading} className="h-9">
              Request
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddFriendForm
