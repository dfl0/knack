export default function Preview(props) {
  return (
    <>
      <div className="w-80 py-2">
        <div className="w-80 h-96 bg-gray-200 rounded-md">
          <img src={props.photo} className="w-full h-full overflow-hidden rounded-md" />
        </div>
        <div className="mt-2">
          <span className="font-bold text-sm pr-2">{props.username}</span>
          <span className="text-sm">{props.description}</span>
        </div>
        <div className="flex mt-2">
          <div className="text-lg grow">${props.price}</div>
          <button className="bg-emerald-400 font-bold text-lg text-white rounded-lg px-2">+</button>
        </div>
      </div>
    </>
  )
}
