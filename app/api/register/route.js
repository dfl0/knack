import bcrypt from "bcrypt"

import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!email || !name || !password)
      return new NextResponse("Missing information", { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error, "ERROR: Failed to register user")
    return new NextResponse("Internal Error", { status: 500 })
  }
}
