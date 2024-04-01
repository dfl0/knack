export default function Listing() {
  return (
    <>
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-xl bg-gray-400"></div>
        <h1 className="grow pl-2 text-sm font-bold">username</h1>
      </div>
      <div className="w-80 py-2">
        <div className="h-96 w-80 rounded-md bg-gray-200"></div>
        <div className="mt-2">
          <p className="text-sm font-bold">username</p>
          <p className="text-sm">
            This is a product with some sample text that I have created to fill
            the space.
          </p>
        </div>
        <div className="mt-2 flex">
          <div className="grow text-lg">$50</div>
          <button className="rounded-lg bg-emerald-400 px-2 text-lg font-bold text-white">
            +
          </button>
        </div>
      </div>
    </>
  )
}
