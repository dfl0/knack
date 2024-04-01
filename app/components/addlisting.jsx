import Link from "next/link"

export default function AddListing() {
  return (
    <>
      <div className="w-80 py-2">
        <button className="flex h-96 w-80 items-center justify-center rounded-md bg-gray-200 text-9xl text-gray-300">
          <Link href="/newlisting">＋</Link>
        </button>
        <div className="mt-2">
          <span className="text-sm italic text-gray-400">
            Create new listing...
          </span>
        </div>
      </div>
    </>
  )
}
