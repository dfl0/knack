import { useState } from "react"

import axios from "axios"
import Image from "next/image"
import toast from "react-hot-toast"

import getSignedURL from "@/app/actions/getsignedurl"

import Button from "@components/button"

const PFPEditor = ({ current, onComplete }) => {
  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState(current)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0]

    if (uploadedFile) {
      if (fileURL)
        URL.revokeObjectURL(fileURL)

      setFile(uploadedFile)
      setFileURL(URL.createObjectURL(uploadedFile))
    }
  }

  const handleUpdatePFP = async () => {
    if (file) {
      try {
        setIsLoading(true)

        const signedURL = await getSignedURL()

        await axios.post("/api/pfp", {
          image: signedURL.split("?")[0],
        })

        await axios.put(signedURL, file, {
          "headers": {
            "Content-Type": file.type
          },
        })

        onComplete(signedURL.split("?")[0])
        toast.success("Your profile picture has been updated!")
      } catch (error) {
        toast.error("Profile picture could not be updated, please try again")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast("Please upload a new image")
    }
  }

  const handleRemovePFP = async () => {
    try {
      setIsLoading(true)

      await axios.delete("/api/pfp")

      onComplete(null)
      toast.success("Your profile picture has been removed")
    } catch (error) {
      toast.error("Profile picture could not be deleted, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-semibold">Choose a new profile picture</h1>

      {fileURL &&  (
        <div className="relative w-full aspect-square rounded-[40%] overflow-clip">
          <Image
            src={fileURL}
            alt={fileURL}
            fill={true}
            sizes="256px, 128px, 64px, 32px"
            className="object-cover"
          />
        </div>
      )}

      <input
        id="image"
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        onChange={handleFileChange}
      />

      <div className="flex gap-2">
        {current && (
            <Button
              variant="secondary"
              onClick={handleRemovePFP}
              disabled={isLoading}
              className="w-full"
            >
              Remove
            </Button>
        )}
        <Button
          onClick={handleUpdatePFP}
          disabled={isLoading}
          className="w-full"
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default PFPEditor
