"use client"

import { useRouter } from "next/navigation"

import Image from "next/image"

import Button from "@components/button"

const Listings = ({ listings }) => {
  const router = useRouter()

  console.log(listings)

  return (
    <div className="flex flex-col items-center mt-4 gap-8">
      <Button
        onClick={() => router.push("/knacks/new")}
        className="max-w-40"
      >
        Create a new listing
      </Button>
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="w-96"
        >
          <img
            src={listing.image}
            className="w-full h-auto"
          />
          <span
            className="text-sm font-bold mr-2"
          >
            {listing.author.name}
          </span>
          <span
            className="text-sm"
          >
            {listing.description}
          </span>
          <div
            className="text-sm"
          >
            {`$${listing.price/100}`}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Listings
