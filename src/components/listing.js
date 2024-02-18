export default function Listing() {
  return (
    <>
      <div className="flex items-center">
        <div className="h-8 w-8 bg-gray-400 rounded-xl"></div>
        <h1 className="font-bold text-sm pl-2 grow">username</h1>
      </div>
      <div className="w-80 py-2">
        <div className="w-80 h-96 bg-gray-200 rounded-md"></div>
        <div className="mt-2">
          <p className="font-bold text-sm">username</p>
          <p className="text-sm">This is a product with some sample text that I have created to fill the space.</p>
        </div>
        <div className="flex mt-2">
          <div className="text-lg grow">$50</div>
          <button className="bg-emerald-400 font-bold text-lg text-white rounded-lg px-2">+</button>
        </div>
      </div>
    </>
  )
}