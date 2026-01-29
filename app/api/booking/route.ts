import { type NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, date, time, firstName, lastName, email, phone, notes } = body
    if (!service || !date || !time || !firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    console.log("Booking submission:", {
      service,
      date,
      time,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      notes,
      timestamp: new Date().toISOString(),
    })
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
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
