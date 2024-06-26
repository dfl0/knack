import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import Button from "@components/button"

const Modal = ({ children, isOpen, onClose, className, ...props }) => {
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  if (isOpen) {
    return (
      <>
        <div
          onClick={onClose}
          className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/75"
        />
        <div
          onClick={handleModalClick}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-96 translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-zinc-300 bg-white p-6 text-zinc-950 shadow-lg",
            className
          )}
          {...props}
        >
          {children}
          <Button
            onClick={onClose}
            variant="subtle"
            className="absolute right-4 top-4 p-1 h-4 w-4"
          >
            <X className="shrink-0 h-4 w-4"/>
          </Button>
        </div>
      </>
    )
  }
}

export default Modal
