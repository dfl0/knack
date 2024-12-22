import getListings from "@/app/actions/getlistings"

import Listings from "@components/listings"

export default async function Knacks() {
  const initialListings = await getListings()
  return (
    <Listings
      listings={initialListings}
    />
  )
}
