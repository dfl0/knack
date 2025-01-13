"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { isSameDay, isYesterday, isSameWeek, format } from "date-fns"
import axios from "axios"

import toast from "react-hot-toast"
import Image from "next/image"

import refreshFeed from "@/app/actions/refreshfeed"

import ProfilePicture from "@components/profilepicture"
import Button from "@components/button"
import Modal from "@components/modal"
import DirectMessageForm from "@components/directmessageform"

const ListingView = ({ listing }) => {
  const session = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)

  const timestamp = isSameDay(listing.postedAt, new Date())
    ? format(listing.postedAt, "p")
    : isYesterday(listing.postedAt, new Date())
      ? format(listing.postedAt, "'Yesterday at' p")
      : isSameWeek(listing.postedAt, new Date())
        ? format(listing.postedAt, "cccc 'at' p")
        : format(listing.postedAt, "M/d/y p")

  const handleDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/knacks/${listing.id}`)

      toast.success("Your listing has been deleted")
      router.back()
      refreshFeed()
    } catch (error) {
      console.log(error)
      toast.error("Listing could not be deleted, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  if (session.status === "loading" || !session.data.user)
    return <div>Loading...</div>

  return (
    <div className="mx-auto max-w-2xl px-12 py-8">
      <div className="relative mb-4 w-full overflow-clip rounded-lg border">
        <Image
          src={listing.image}
          alt={`${listing.author.name}'s listing`}
          width={0}
          height={0}
          sizes="100vw, 50vw, 33vw, 25vw"
          className="h-auto w-full"
        />
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex shrink-0 items-center">
          <ProfilePicture
            src={listing.author.pfp}
            alt={listing.author.name}
            className="mr-2 h-8 w-8"
          />

          <div>
            <div className="text-sm">{listing.author.name}</div>
            <div className="text-xs text-zinc-500">{`Posted ${timestamp}`}</div>
          </div>
        </div>

        {listing.author.email !== session.data.user.email ? (
          <>
            <Button
              onClick={() => setShowMessageModal(true)}
              className="ml-4 px-8"
            >
              Message Seller
            </Button>

            <Modal
              isOpen={showMessageModal}
              onClose={() => setShowMessageModal(false)}
            >
              <DirectMessageForm
                recipientId={listing.author.id}
                recipientName={listing.author.name}
                onComplete={() => setShowMessageModal(false)}
              />
            </Modal>
          </>
        ) : (
          <Button
            variant="secondary"
            onClick={handleDelete}
            disabled={isLoading}
            className="ml-4 px-8 hover:bg-rose-50 hover:text-rose-600"
          >
            Delete Listing
          </Button>
        )}
      </div>

      <div className="mb-4 flex items-start justify-between">
        <div className="text-sm">{listing.description}</div>

        <div className="ml-4 rounded-xl border bg-zinc-100 px-2 py-1 text-sm font-semibold">
          <span className="pr-0.5">$</span>
          <span>{(listing.price / 100).toFixed(2).toString()}</span>
        </div>
      </div>

      {listing.author.email !== session.data.user.email && (
        <div className="mt-4 text-xs text-zinc-500">
          * Message the seller to let them know you&apos;re interested!
        </div>
      )}
    </div>
  )
}

export default ListingView
