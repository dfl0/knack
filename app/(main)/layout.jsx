import NavBar from "@components/navbar"

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen min-h-screen w-screen flex-col items-center justify-center">
      <div className="w-full shrink-0">
        <NavBar />
      </div>
      <div className="h-full w-full overflow-scroll">{children}</div>
    </div>
  )
}
