import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/",
  },
})

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|static|public).*)", // regex that matches any route starting with "api", "_next", "static", or "public"
  ],
}
