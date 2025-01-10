import getListingFromId from "@/app/actions/getlistingfromid"

import ListingView from "@components/listingview"

const KnackId = async ({ params }) => {
  const knack = await getListingFromId(params.knackId)

  return <ListingView listing={knack} />
}

export default KnackId
