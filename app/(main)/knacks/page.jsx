import getListings from "@/app/actions/getlistings"

import Feed from "@/app/components/feed"

export default async function Knacks() {
  const initialListings = await getListings()
  return (
    <Feed
      listings={initialListings}
    />
  )
}
