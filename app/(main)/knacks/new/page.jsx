"use client"

import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import Button from "@components/button"
import Input from "@components/input"
import InputPrompt from "@components/inputprompt"

const NewListing = () => {
  const router = useRouter()

  const [priceString, setPriceString] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      price: "",
    }
  })

  const formatPrice = (value) => {
    return value > 0 ? `$${(value / 100).toFixed(2).toString()}` : "";
  }

  const handlePriceChange = (e) => {
    const parsedPrice = parseInt(e.target.value.replace(/[^\d]/g, "")) || 0
    const formattedPrice = formatPrice(parsedPrice)
    setPriceString(formattedPrice)
    setValue("price", formattedPrice)
  }

  const moveCaretToEnd = (e) => {
    const input = e.target
    const endpos = input.value.length
    input.setSelectionRange(endpos, endpos)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)

    const priceValue = parseInt(data.price.replace(/[^\d]/g, "")) || 0

    axios
      .post("/api/knacks", {
        description: data.description,
        price: priceValue,
      })
      .then((res) => toast.success("Your listing has been created!"))
      .catch((error) => console.log(error.response.data))
      .finally(() => {
        router.push("/knacks")
        setIsLoading(false)
      })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-auto mt-36 flex flex-col w-80 gap-2">
        <Button
          onClick={() => console.log("Image upload to be implemented")}
          variant="outline"
          className="text-zinc-500 h-9"
        >
          Upload image
        </Button>
        <InputPrompt
          id="description"
          placeholder="Description"
          register={{
            ...register("description", {
              required: true,
            })
          }}
          errors={errors.description}
          className="h-20"
        />
        <Input
          id="price"
          placeholder="$0.00"
          register={{
            ...register("price", {
              required: false,
            })
          }}
          errors={errors.price}
          value={priceString}
          onFocus={moveCaretToEnd}
          onChange={handlePriceChange}
          align="right"
          className="h-9 tabular-nums text-right grow"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="h-9"
        >
          Post listing
        </Button>
      </div>
    </form>
  )
}

export default NewListing
