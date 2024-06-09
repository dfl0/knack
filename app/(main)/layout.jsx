import NavBar from "@components/navbar"

import getCurrentUser from "@/app/actions/getcurrentuser"

export default async function MainLayout({ children }) {
  const currentUser = await getCurrentUser()

  return (
    <div className="flex h-screen min-h-screen w-screen flex-col items-center justify-center">
      <div className="w-full shrink-0">
        <NavBar currentUser={currentUser} />
      </div>
      <main className="h-full w-full overflow-scroll">{children}</main>
    </div>
  )
}
