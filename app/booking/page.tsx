"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect } from "react"
export default function BookingPage() {
  useEffect(() => {
    const medoucineUrl = "https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
    const newWindow = window.open(medoucineUrl, "_blank")
    if (newWindow) {
      newWindow.focus()
    }
    const timer = setTimeout(() => {
      window.history.back()
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      <Header />
      <main className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Ouverture de la page de réservation...</h1>
          <p className="text-muted-foreground mb-8">
            La page de réservation Medoucine s'ouvre dans un nouvel onglet. Vous allez être redirigé vers la page précédente dans 5 secondes.
          </p>
          <a
            href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:opacity-80"
          >
            Cliquez ici si la nouvelle page ne s'est pas ouverte
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}