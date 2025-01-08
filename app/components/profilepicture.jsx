"use client"

import { useRef, useEffect, useState } from "react"

import Image from "next/image"

import { cn } from "@/lib/utils"

import Modal from "@components/modal"
import PFPEditor from "@components/pfpeditor"

const ProfilePicture = ({ src, alt, editable, className, ...props }) => {
  const [pfp, setPFP] = useState(src)
  const [showPFPEditor, setShowPFPEditor] = useState(false)
  const placeholderRef = useRef(null)

  useEffect(() => {
    if (pfp) return // placeholder unused if user has uploaded a custom pfp

    // set size of "placeholder" initials for default pfp
    const size = placeholderRef.current.clientWidth
    placeholderRef.current.style.fontSize = `${0.6 * size}px`
    placeholderRef.current.style.lineHeight = `${size}px`
    placeholderRef.current.innerHTML = alt[0]
  }, [pfp, alt])

  return (
    <div
      className={cn(
        "relative aspect-square h-32 w-32 shrink-0 overflow-clip rounded-[40%] bg-zinc-300 outline outline-1 outline-black/20",
        className
      )}
      {...props}
    >
      {pfp ? (
        <Image
          src={pfp}
          alt={`${alt}'s profile picture`}
          fill={true}
          sizes="256px, 128px, 64px, 32px"
          priority={true}
          className="object-cover"
        />
      ) : (
        <div
          id="placeholder"
          ref={placeholderRef}
          className="h-full w-full select-none text-center align-middle font-medium text-zinc-50"
        />
      )}

      {editable && (
        <>
          <div
            onClick={() => setShowPFPEditor(true)}
            className="absolute left-0 top-0 h-full w-full bg-black/40 opacity-0 hover:cursor-pointer hover:opacity-100"
          >
            <div className="relative top-[50%] w-full -translate-y-[50%] select-none text-center text-white">
              Change
            </div>
          </div>
          <Modal isOpen={showPFPEditor} onClose={() => setShowPFPEditor(false)}>
            <PFPEditor
              current={pfp || undefined}
              onComplete={(updatedPFP) => {
                setPFP(updatedPFP)
                setShowPFPEditor(false)
              }}
            />
          </Modal>
        </>
      )}
    </div>
  )
}

export default ProfilePicture
