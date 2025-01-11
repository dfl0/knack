"use client"

import { useState, useEffect } from "react"

import getCurrentUser from "@/app/actions/getcurrentuser"

import { cn } from "@/lib/utils"
import Button from "@components/button"
import ProfilePicture from "@components/profilepicture"
import ListingsDashboard from "@components/listingsdashboard"
import FriendsDashboard from "@components/friendsdashboard"

export default function Profile() {
  const [activeView, setActiveView] = useState("listings")
  const [currentUser, setCurrentUser] = useState(null)

  async function fetchData() {
    const fetchedCurrentUser = await getCurrentUser()
    setCurrentUser(fetchedCurrentUser)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!currentUser)
    return <div>Loading...</div>

  return (
    <div className="container mx-auto my-8 flex flex-col gap-8">
      <div className="text-lg font-medium text-zinc-950">Profile</div>

      <ProfilePicture
        src={currentUser.pfp}
        alt={currentUser.name}
        editable
      />

      <div className="flex bg-zinc-200 border border-zinc-300 rounded-xl">
        <Button
          variant={activeView === "listings" ? "primary" : "subtle"}
          onClick={() => setActiveView("listings")}
          className="w-full"
        >
          Listings
        </Button>

        <Button
          variant={activeView === "friends" ? "primary" : "subtle"}
          onClick={() => setActiveView("friends")}
          className="w-full"
        >
          Friends
        </Button>
      </div>

      {activeView === "listings" && <ListingsDashboard />}
      {activeView === "friends" && <FriendsDashboard />}
    </div>
  )
}
