"use client"

import Select, { components } from "react-select"
import { ChevronDown, X } from "lucide-react"
// import { useState } from "react"

import { cn } from "@/lib/utils"

// import Input from "@components/input"
// import Button from "@components/button"

const SearchSelect = ({ placeholder, disabled, value, onChange, options, errors, className, ...props }) => {
  // const [isOpen, setIsOpen] = useState(false)

  // const toggleOpen = () => {
  //   if (isOpen) {
  //     setIsOpen(false)
  //   } else {
  //     setIsOpen(true)
  //   }
  // }

  // const handleChange = () => {
  //   setIsOpen(true)
  // }

  // const handleMouseDown = (e) => {
  //   e.preventDefault()
  //   toggleOpen()
  // }

  const IndicatorSeparator = () => {
    return <></>
  }

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown absoluteStrokeWidth className="h-4 w-4" />
      </components.DropdownIndicator>
    )
  }

  const MultiValueRemove = (props) => {
    return (
      <components.MultiValueRemove {...props}>
        <X absoluteStrokeWidth className="h-3 w-3 transition-colors" />
      </components.MultiValueRemove>
    )
  }

  return (
    // <div className={cn("relative", className)}>
    //   <Input
    //     className="w-full"
    //     onChange={handleChange}
    //     onBlur={() => setIsOpen(false)}
    //     {...props}
    //   />
    //   {isOpen && (
    //     <div className="absolute top-[100%] h-32 w-full translate-y-1 rounded-xl border border-zinc-200 bg-white"></div>
    //   )}
    // </div>
    <Select
      placeholder={placeholder}
      isDisabled={disabled}
      value={value}
      onChange={onChange}
      isMulti
      options={options}
      closeMenuOnSelect={false}
      hideSelectedOptions={true}
      isClearable={false}
      // menuPortalTarget={document.body}
      unstyled
      styles={{
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
      components={{ IndicatorSeparator, DropdownIndicator, MultiValueRemove }}
      classNames={{
        container: () => className,
        control: ({ isFocused }) =>
          cn(
            "max-h-8 appearance-none rounded-xl border border-zinc-200 text-sm shadow-none outline-none transition-colors hover:bg-zinc-50",
            isFocused && "border-zinc-300 bg-zinc-100 hover:bg-zinc-100",
            errors && "border-rose-500 bg-red-50 hover:bg-red-50",
            errors && isFocused && "border-rose-500 bg-red-50",
            className
          ),
        placeholder: () => cn("bg-transparent pl-3 text-zinc-500"),
        input: () => cn("pl-3 text-sm font-normal", value.length > 0 && "pl-1"),
        valueContainer: () => cn("gap-1 bg-transparent p-1"),
        multiValue: () => cn("items-center gap-1 rounded-lg bg-zinc-200 py-1 pl-2 pr-1.5 ring-1 ring-inset ring-zinc-300"),
        multiValueRemove: () => cn("text-zinc-500 hover:text-zinc-900"),
        indicatorsContainer: () => cn("m-auto max-h-6 p-2"),
        dropdownIndicator: () => cn("p-1 text-gray-500 hover:text-zinc-900"),
        menu: () => cn("mt-1 rounded-xl border border-zinc-300 bg-white p-1 text-sm"),
        option: ({ isFocused, isSelected }) =>
          cn(
            "rounded rounded-lg px-3 py-2 hover:cursor-pointer",
            isFocused && "bg-zinc-100",
            isSelected && "text-zinc-500"
          ),
        noOptionsMessage: () => cn("p-2 text-gray-500"),
      }}
    />
  )
}

export default SearchSelect
