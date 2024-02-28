import Link from 'next/link';

export default function AddListing() {
  return (
      <>
      <div className="w-80 py-2">
        <button className="w-80 h-96 bg-gray-200 rounded-md flex justify-center items-center text-9xl text-gray-300">
          <Link href='/newlisting'>
          ＋
          </ Link>
        </button>
        <div className="mt-2">
          <span className="text-sm italic text-gray-400">Create new listing...</span>
        </div>
      </div>
    </>
  )
}
