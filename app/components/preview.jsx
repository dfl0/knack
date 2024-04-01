export default function Preview(props) {
  return (
    <>
      <div className="w-80 py-2">
        <div className="h-96 w-80 rounded-md bg-gray-200">
          <img
            src={props.photo}
            className="h-full w-full overflow-hidden rounded-md"
          />
        </div>
        <div className="mt-2">
          <span className="pr-2 text-sm font-bold">{props.username}</span>
          <span className="text-sm">{props.description}</span>
        </div>
        <div className="mt-2 flex">
          <div className="grow text-lg">${props.price}</div>
          <button className="rounded-lg bg-emerald-400 px-2 text-lg font-bold text-white">
            +
          </button>
        </div>
      </div>
    </>
  )
}
