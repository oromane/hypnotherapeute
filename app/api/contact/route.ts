// app/api/contact/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Importation de nos nouveaux modèles d'e-mails
import { ContactAdminNotification } from "@/components/emails/contact-admin-notification"
// On commente l'email de confirmation utilisateur, car le sandbox ne l'enverra pas
// import { ContactUserConfirmation } from "@/components/emails/contact-user-confirmation"

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY)

// ===================================================================
// ⬇️⬇️⬇️ MODIFICATIONS POUR LE MODE TEST (SANDBOX) ⬇️⬇️⬇️
// ===================================================================

// 1. On utilise l'adresse "sandbox" spéciale de Resend
const FROM_EMAIL = "onboarding@resend.dev"

// 2. Mettez VOTRE e-mail personnel (celui de votre compte Resend)
const ADMIN_EMAIL = "romane.raphael.rossignol@gmail.com" // <-- Mettez l'email de votre compte Resend

// ===================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    // Votre validation est parfaite
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Votre log est parfait
    console.log("[ELISABETHMAIL] Contact message received:", body)

    // TÂCHE 1 : Envoyer l'e-mail de notification à l'administrateur (vous)
    // C'est la SEULE chose qui fonctionnera en mode sandbox.
    const sendAdminEmail = await resend.emails.send({
      from: `Test Sandbox <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL], // <--- Doit être VOTRE email vérifié
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

    // TÂCHE 2 : Email de confirmation utilisateur (DÉSACTIVÉ POUR LE TEST)
    // En mode sandbox, Resend bloque les e-mails
    // à des adresses non vérifiées (comme celle du client).
    console.log("Mode Sandbox: Envoi de l'email au client ignoré.")

    return NextResponse.json(
      { success: true, message: "Message reçu et e-mail admin envoyé (Mode Test)." },
      { status: 200 },
    )
  } catch (error) {
    // Votre gestion d'erreur est parfaite
    console.error("[ELISABETHMAIL] Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}