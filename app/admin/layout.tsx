import type React from "react"

export const metadata = {
  title: "Administration | Elisabeth DUCHESNE",
  description: "Espace d'administration sécurisé",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
