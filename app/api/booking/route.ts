import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { service, date, time, firstName, lastName, email, phone, notes } = body

    // Validate required fields
    if (!service || !date || !time || !firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically save to a database
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

    // Generate booking confirmation
    const bookingId = `BK-${Date.now()}`

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to calendar
    // 4. Check for conflicts

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
