import Link from 'next/link';

export default function NavBar() {
  let username = "student1"
  return (
    <>
      <div className="w-full bg-gray-200">
        <div className="flex items-center px-6 py-3">
          <div className="text-2xl font-bold">KNACK</div>
          <input type="text" placeholder="What are you looking for?" name="Search" className="appearance-none outline-none text-sm bg-gray-300 border px-4 rounded-xl h-8 grow mx-20" />
          <div className="text-sm flex gap-6 mr-20">
            <Link
              href="/knacks"
              className={""}
            >
              <span className="text-gray-500 pr-0.5">KNICK</span><span>KNACKS</span>
            </Link>
            <Link
              href="/chat"
              className={""}
            >
              <span className="text-gray-500 pr-0.5">KNACK</span><span>CHAT</span>
            </Link>
          </div>
          <div className="text-sm">{username}</div>
          <div className="w-8 h-8 rounded-full bg-gray-600 ml-2"></div>
        </div>
      </div>
      <div>
      </div>
    </>
  );
}