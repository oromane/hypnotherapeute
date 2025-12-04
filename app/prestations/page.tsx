import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { getServices, getSeoSettings } from "@/lib/sanity-queries"
import { PrestationsList } from "@/components/PrestationsList"

export async function generateMetadata() {
  const seo = await getSeoSettings()
  return {
    title: seo?.prestations?.metaTitle || "Prestations - Elisabeth DUCHESNE",
    description: seo?.prestations?.metaDescription || "Découvrez mes prestations en hypnose et sophrologie.",
  }
}

export default async function PrestationsPage() {
  const services = await getServices()

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Mes prestations</h1>
            <p className="text-xl text-muted-foreground">
              Un accompagnement complet et personnalisé pour chaque situation
            </p>
          </div>
        </section>

        <PrestationsList initialServices={services} />

        {/* Information sections */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Consultations individuelles</h3>
              <p className="text-muted-foreground mb-4">Séances personnalisées dans mes cabinets ou à domicile.</p>
              <p className="text-primary font-semibold">Durée : 1h</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Ateliers collectifs</h3>
              <p className="text-muted-foreground mb-4">Pour les particuliers et les entreprises.</p>
              <p className="text-primary font-semibold">Durée : 2h à 2h30</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Consultations à domicile</h3>
              <p className="text-muted-foreground mb-4">Dans un rayon de 30 km autour de Pomerols.</p>
              <p className="text-primary font-semibold">Tarifs spécifiques</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Prêt à commencer votre accompagnement ?</h2>
            <p className="text-lg mb-8 opacity-90">Réservez votre première consultation directement sur Medoucine</p>
            <a
              href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 shadow-xl"
            >
              Réserver maintenant
              <ArrowRight size={20} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
