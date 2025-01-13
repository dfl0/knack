import { useState, useEffect } from "react"

import getOwnListings from "@/app/actions/getownlistings"

import Listing from "@components/listing"

const ListingsDashboard = () => {
  const [listings, setListings] = useState([])

  async function fetchData() {
    const fetchedListings = await getOwnListings()
    setListings(fetchedListings)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {listings.map((listing) => (
        <Listing
          key={listing.id}
          id={listing.id}
          author={listing.author}
          image={listing.image}
          description={listing.description}
          price={listing.price}
          postedAt={listing.postedAt}
        />
      ))}
    </div>
  )
}

export default ListingsDashboard
