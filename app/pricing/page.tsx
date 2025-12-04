import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { getSeoSettings } from "@/lib/sanity-queries"

export async function generateMetadata() {
  const seo = await getSeoSettings()
  return {
    title: seo?.prices?.metaTitle || "Tarifs | Elisabeth DUCHESNE - Hypnothérapeute",
    description: seo?.prices?.metaDescription || "Consultez les tarifs des consultations d'hypnose et sophrologie",
  }
}

export default function PricingPage() {
  const plans = [
    {
      name: "Consultation Hypnose Ericksonienne",
      price: "60 - 80",
      duration: "1 heure",
      description: "Séance individuelle",
      features: [
        "Consultation approfondie",
        "Hypnose Ericksonienne personnalisée",
        "Suivi hebdomadaire par message ou téléphone",
        "Plan d'action adapté",
      ],
      recommended: false,
    },
    {
      name: "Consultation Sophrologie",
      price: "55 - 80",
      duration: "1 heure",
      description: "Séance de relaxation dynamique",
      features: [
        "Exercices de relaxation dynamique",
        "Temps de sophronisation",
        "Techniques à reproduire chez soi",
        "Adaptée à votre niveau",
      ],
      recommended: true,
    },
    {
      name: "Arrêt du Tabac - Hypnose",
      price: "90",
      duration: "Selon les besoins",
      description: "Programme spécialisé",
      features: [
        "Consultation spécialisée tabac",
        "Approche personnalisée",
        "Suivi intensif",
        "Taux de réussite élevé",
      ],
      recommended: false,
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Tarifs</h1>
            <p className="text-xl text-muted-foreground">Des tarifs transparents et accessibles pour tous</p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border-2 transition-all overflow-hidden ${plan.recommended
                      ? "border-primary bg-card shadow-xl scale-105"
                      : "border-border bg-card hover:shadow-lg"
                    }`}
                >
                  {plan.recommended && (
                    <div className="bg-primary text-primary-foreground py-2 text-center font-semibold">Populaire</div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                    <div className="mb-6">
                      <div className="text-5xl font-bold text-primary">{plan.price}€</div>
                      <p className="text-muted-foreground text-sm mt-2">{plan.duration}</p>
                    </div>

                    <a
                      href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block text-center py-3 rounded-full font-semibold mb-8 transition-all ${plan.recommended
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        }`}
                    >
                      Réserver
                    </a>

                    <div className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation à domicile */}
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Consultations à domicile</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Hypnose à domicile</h4>
                  <p className="text-primary font-bold text-lg mb-2">70€ - 90€</p>
                  <p className="text-muted-foreground text-sm">Rayon de 30 km autour de Pomerols (34)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Sophrologie à domicile</h4>
                  <p className="text-primary font-bold text-lg mb-2">65€ - 90€</p>
                  <p className="text-muted-foreground text-sm">Rayon de 30 km autour de Pomerols (34)</p>
                </div>
              </div>
            </div>

            {/* Ateliers */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Ateliers collectifs</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Pour les particuliers</h4>
                  <p className="text-muted-foreground mb-2">Durée : 2h à 2h30</p>
                  <p className="text-primary font-bold text-lg">25€ - 40€ par personne</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Pour les entreprises</h4>
                  <p className="text-muted-foreground mb-4">Tarifs sur devis</p>
                  <Link href="/contact" className="text-primary font-semibold hover:opacity-80 transition-opacity">
                    Demander un devis →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information importante */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Prise en charge mutuelle</h4>
                <p className="text-muted-foreground">
                  Certaines mutuelles proposent le remboursement de mes consultations. Vérifiez votre contrat pour
                  connaître les conditions de remboursement.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Important</h4>
                <p className="text-muted-foreground text-sm italic">
                  L'hypnothérapie ne remplace en aucun cas un avis ou un traitement médical. Seul un médecin peut poser
                  des diagnostics et prescrire des traitements. Toute question relevant du domaine médical doit être
                  posée à votre médecin traitant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-lg mb-8 opacity-90">Contactez-moi pour réserver votre première consultation</p>
            <a
              href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Réserver maintenant
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
