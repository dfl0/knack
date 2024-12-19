import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { description, price } = await req.json()
    console.log(description)
    console.log(price)
    return new NextResponse({ status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(error, { status: 500 })
  }
}
