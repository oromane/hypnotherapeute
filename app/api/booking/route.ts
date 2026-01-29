import { type NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, date, time, firstName, lastName, email, phone, notes } = body
    if (!service || !date || !time || !firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    // logging removed

    const bookingId = `BK-${Date.now()}`
    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: "Booking confirmed successfully",
        confirmationEmail: email,
      },
      { status: 200 },
    )
  } catch (error) {
    // error logging removed for production
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
