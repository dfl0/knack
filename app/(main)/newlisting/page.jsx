"use client"
import React, { useState, useEffect, useRef } from "react"
import Tesseract from "tesseract.js" // Import Tesseract

export default function NewListing() {
  const [imageURL, setImageURL] = useState(null)
  const [extractedText, setExtractedText] = useState("") // Initialize as an empty string
  const [username, setUsername] = useState("Username") // State for username
  const [circleColor, setCircleColor] = useState("bg-gray-400") // State for circle color
  const [isAnonymous, setIsAnonymous] = useState(false) // State to track anonymous mode
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageURL(e.target.result)
        extractTextFromImage(e.target.result) // Extract text after image is loaded
      }
      reader.readAsDataURL(file)
    }
  }

  const extractTextFromImage = async (imageDataURL) => {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageDataURL, "eng")
      setExtractedText(text.trim()) // Set extracted text, trim to remove any leading/trailing whitespace
    } catch (error) {
      console.error("Error during text extraction:", error)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleTitleChange = (event) => {
    setExtractedText(event.target.value) // Update the extractedText (which is also the title value) when the user types
  }

  const toggleAnonymous = () => {
    if (isAnonymous) {
      // Revert back to original profile
      setUsername("Username")
      setCircleColor("bg-gray-400")
    } else {
      // Switch to anonymous profile
      setUsername("Anonymous")
      setCircleColor("bg-black")
    }
    setIsAnonymous(!isAnonymous) // Toggle the anonymous state
  }

  const postToMarketplace = () => {
    const listingData = {
      title: extractedText, // Title from OCR or manual input
      price: price, // Price input by the user
      description: description, // Description input by the user
      imageURL: imageURL, // The data URL of the uploaded image
      username: isAnonymous ? "Anonymous" : username, // Username, based on anonymous mode
    }

    // This is where you could potentially send the data to a server or another service
    console.log("Formatted Listing Data:", listingData)
  }

  useEffect(() => {
    return () => {
      imageURL && URL.revokeObjectURL(imageURL)
    }
  }, [imageURL])

  return (
    <div className="min-h-screen bg-gray-300">
      {/* "Create a Listing" Title */}
      <div className="ml-20 pt-12">
        <h2 className="text-3xl font-semibold">Create a KnickKnack Listing</h2>
      </div>

      <div className="ml-20 flex justify-between pt-10">
        {/* Image Upload Box */}
        <div
          className="max-h-xl flex h-auto w-full max-w-xl cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-400 px-2 text-6xl text-white"
          onClick={handleClick}
        >
          {imageURL ? (
            <img
              src={imageURL}
              alt="Uploaded"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <span>+</span>
              <span className="mt-2 text-base text-gray-300">
                Upload an Image to Generate a Title
              </span>{" "}
              {/* Text under the plus sign */}
            </div>
          )}
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        {/* Text Input Fields and Profile Placeholder */}
        <div className="mr-36 w-full max-w-xl">
          {/* Existing Fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-xl font-bold">
              Listing Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="h-10 w-full rounded-lg bg-gray-400"
              value={extractedText}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-xl font-bold">
              Price (USD):
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="h-10 w-full rounded-lg bg-gray-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-xl font-bold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="8"
              className="w-full appearance-none rounded-lg border-none bg-gray-400"
            ></textarea>
          </div>

          {/* Profile Photo Placeholder, Username, and Toggle Button */}
          <div className="mt-6 flex items-center">
            <div
              className={`mb-8 ml-4 h-20 w-20 ${circleColor} mr-4 rounded-full`}
            ></div>{" "}
            {/* Circle Placeholder with dynamic color */}
            <span className="mb-8 mr-4 text-2xl">{username}</span>{" "}
            {/* Dynamic Username */}
            <button
              onClick={toggleAnonymous}
              className="mb-8 ml-36 rounded-lg bg-gray-400 px-4 py-2 text-white"
            >
              {isAnonymous ? "Show Profile" : "Go Anonymous"}{" "}
              {/* Toggle Button Text */}
            </button>
          </div>

          <button
            onClick={postToMarketplace}
            className="absolute bottom-4 right-4 rounded-md bg-blue-500 px-6 py-2 text-white"
          >
            Post to Marketplace
          </button>
        </div>
      </div>
    </div>
  )
}
