"use-client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

import { cn } from "@/lib/utils"

const Input = ({ id, options, register, errors, disabled, className, ...props }) => {
  return (
    <input
      autoComplete="off"
      {...register}
      className={cn(
        `h-8
        appearance-none
        rounded-xl
        border
        border-zinc-200
        px-4
        py-2
        text-sm
        font-normal
        text-zinc-950
        placeholder-zinc-500
        shadow-none
        outline-none
        transition-colors
        hover:bg-zinc-50
        focus:border-zinc-300
        focus:bg-zinc-100`,
        errors &&
          "border-rose-500 bg-red-50 hover:bg-red-50 focus:border-rose-500 focus:bg-red-50",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    />
  )
}

export default Input
