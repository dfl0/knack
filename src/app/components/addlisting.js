import { redirect } from 'next/navigation'

export default function AddListing() {

  return (
      <>
      <div className="w-80 py-2">
        <a href="newlisting">
          <button className="w-80 h-96 bg-gray-200 rounded-md flex justify-center items-center text-9xl text-gray-300">
            ＋
          </button>
        </a>
        <div className="mt-2">
          <span className="text-sm italic text-gray-400">Create new listing...</span>
        </div>
      </div>
    </>
  )
}