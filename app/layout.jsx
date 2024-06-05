import { Inter } from "next/font/google"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import ToasterContext from "@/app/context/toastercontext"
import AuthContext from "@/app/context/authcontext"

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "App",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased",
          fontSans.className
        )}
      >
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
