"use client"

import { useRef, useEffect, useState } from "react"

import Image from "next/image"

import Modal from "@components/modal"
import PFPEditor from "@components/pfpeditor"

const ProfilePicture = ({ src, name, editable }) => {
  const placeholderRef = useRef(null)
  const [showPFPEditor, setShowPFPEditor] = useState(false)

  useEffect(() => {
    const size = placeholderRef.current.clientWidth
    placeholderRef.current.style.fontSize = `${0.6 * size}px`
    placeholderRef.current.style.lineHeight = `${size}px`
    placeholderRef.current.innerHTML = name[0]
  }, [name])

  return (
    <div className="relative h-32 w-32 overflow-clip rounded-[40%] bg-zinc-300">
      {src ? (
        <Image
          src={src}
          fill={true}
          sizes="128px, 64px, 32px"
          alt={`${name}'s profile picture`}
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
            <PFPEditor />
          </Modal>
        </>
      )}
    </div>
  )
}

export default ProfilePicture
