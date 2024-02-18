export default function Preview() {
  let username = "student1";
  return (
    <>
      <div className="w-80 py-2">
        <div className="w-80 h-96 bg-gray-200 rounded-md"></div>
        <div className="mt-2">
          <span className="font-bold text-sm pr-2">{username}</span>
          <span className="text-sm">This is a product with some sample text that I have created to fill the space.</span>
        </div>
        <div className="flex mt-2">
          <div className="text-lg grow">$50</div>
          <button className="bg-emerald-400 font-bold text-lg text-white rounded-lg px-2">+</button>
        </div>
      </div>
    </>
  )
}