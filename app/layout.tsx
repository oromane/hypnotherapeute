import type React from "react"
import "@/lib/env"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CookieBanner } from "@/components/CookieBanner"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { Signature } from "@/components/Signature"
import { ClientProtection } from "@/components/ClientProtection"
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
export const viewport = {
  themeColor: "#708D79",
  width: "device-width",
  initialScale: 1,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧘</text></svg>"
        />
        <link rel="canonical" href="https://elisabethduchesne.fr" />
        <meta name="google-site-verification" content="" />
        <meta name="author" content="Romane (https://github.com/oromane)" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <CookieBanner />
        <GoogleAnalytics gaId="G-0EZC6VKJ9R" />
        <Signature />
        <ClientProtection />
        <CookieBanner />
      </body>
    </html>
  )
}
