interface Booking {
  id: string
  service: string
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: Date
}
interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: Date
}
interface Testimonial {
  id: string
  name: string
  email: string
  rating: number
  text: string
  approved: boolean
  createdAt: Date
}
export const mockDb = {
  bookings: [] as Booking[],
  contacts: [] as Contact[],
  testimonials: [] as Testimonial[],
}
export function createBooking(data: Omit<Booking, "id" | "createdAt" | "status">) {
  const booking: Booking = {
    ...data,
    id: `BK-${Date.now()}`,
    status: "pending",
    createdAt: new Date(),
  }
  mockDb.bookings.push(booking)
  return booking
}
export function getBookings() {
  return mockDb.bookings
}
export function updateBookingStatus(id: string, status: Booking["status"]) {
  const booking = mockDb.bookings.find((b) => b.id === id)
  if (booking) {
    booking.status = status
  }
  return booking
}
