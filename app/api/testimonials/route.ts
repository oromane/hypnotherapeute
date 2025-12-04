import { type NextRequest, NextResponse } from "next/server"

// Mock database for testimonials
const testimonials = [
  {
    id: 1,
    name: "Marie D.",
    rating: 5,
    text: "Après seulement quelques séances, j'ai pu surmonter ma phobie des avions.",
    approved: true,
  },
  {
    id: 2,
    name: "Jean P.",
    rating: 5,
    text: "Je suis revenu à ma confiance en moi grâce à ce coaching.",
    approved: true,
  },
]

export async function GET() {
  try {
    // Return only approved testimonials
    const approvedTestimonials = testimonials.filter((t) => t.approved)
    return NextResponse.json(approvedTestimonials, { status: 200 })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, rating, text } = body

    if (!name || !email || !rating || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new testimonial (not approved by default)
    const newTestimonial = {
      id: testimonials.length + 1,
      name,
      rating,
      text,
      approved: false,
    }

    // In production, save to database
    testimonials.push(newTestimonial)

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial submitted for review",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
