"use client"

import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import getSignedURL from "@/app/actions/getsignedurl"

import Image from "next/image"

import Button from "@components/button"
import Input from "@components/input"
import InputPrompt from "@components/inputprompt"

const NewListing = () => {
  const router = useRouter()

  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState(undefined)
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

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0]

    if (uploadedFile) {
      if (fileURL)
        URL.revokeObjectURL(fileURL)

      setFile(uploadedFile)
      setFileURL(URL.createObjectURL(uploadedFile))
    }
  }

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
    if (file) {
      try {
        setIsLoading(true)

        const signedURL = await getSignedURL()

        await axios.post("/api/knacks", {
          image: signedURL.split("?")[0],
          description: data.description,
          price: parseInt(data.price.replace(/[^\d]/g, "")) || 0
        })

        await axios.put(signedURL, file, {
          "headers": {
            "Content-Type": file.type
          },
        })

        toast.success("Your listing has been created!")
        router.push("/knacks")
      } catch (error) {
        toast.error("Listing could not be created, please try again")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast("Please upload an image for your listing")
    }
  }

  return (
    <div className="w-96 mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleFileChange}
          />
          {file && fileURL && (
            <Image
              src={fileURL}
              alt={file.name}
              priority={true}
              width={0}
              height={0}
              className="w-full h-auto"
            />
          )}
          <InputPrompt
            id="description"
            placeholder="Description"
            register={{
              ...register("description", {
                required: true,
              })
            }}
            errors={errors.description}
            className="h-20 mt-4"
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
    </div>
  )
}

export default NewListing
