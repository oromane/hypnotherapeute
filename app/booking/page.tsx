"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

export default function BookingPage() {
  useEffect(() => {
    const medoucineUrl = "https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
    const newWindow = window.open(medoucineUrl, "_blank")
    
    // Facultatif : Si le navigateur bloque l'ouverture automatique, 
    // l'utilisateur devra cliquer sur le lien ci-dessous.
    if (newWindow) {
      newWindow.focus()
    }

    // Définir un timer pour rediriger l'utilisateur après 5 secondes
    const timer = setTimeout(() => {
      // Redirige vers la page précédente dans l'historique du navigateur
      window.history.back() 
    }, 5000) // 5000 millisecondes = 5 secondes

    // Nettoyage : toujours effacer le timer si le composant est démonté
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