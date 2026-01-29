import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { ContactAdminNotification } from "@/components/emails/contact-admin-notification"
const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = "onboarding@resend.dev"
const ADMIN_EMAIL = "romane.raphael.rossignol@gmail.com" 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    console.log("[ELISABETHMAIL] Contact message received:", body)
    const sendAdminEmail = await resend.emails.send({
      from: `Test Sandbox <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL], 
      subject: `[TEST] Nouveau message: ${subject}`,
      react: ContactAdminNotification({
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      }) as React.ReactElement,
    })
    if (sendAdminEmail.error) {
      console.error("Erreur lors de l'envoi de l'email admin:", sendAdminEmail.error)
      throw new Error("Erreur lors de l'envoi de l'e-mail à l'admin")
    }
    console.log("Mode Sandbox: Envoi de l'email au client ignoré.")
    return NextResponse.json(
      { success: true, message: "Message reçu et e-mail admin envoyé (Mode Test)." },
      { status: 200 },
    )
  } catch (error) {
    console.error("[ELISABETHMAIL] Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}