"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import Button from "@components/button"
import Listing from "@components/listing"

const Feed = ({ listings }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="container flex flex-col mx-auto my-8 gap-8">
      <Button
        onClick={() => {
          setIsLoading(true)
          router.push("/knacks/new")
        }}
        disabled={isLoading}
        className="mx-auto"
      >
        Create a new listing
      </Button>

      <div className="flex flex-wrap justify-center gap-8">
        {listings.map((listing) => (
          <Listing
            key={listing.id}
            author={listing.author}
            image={listing.image}
            description={listing.description}
            price={listing.price}
            postedAt={listing.postedAt}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
