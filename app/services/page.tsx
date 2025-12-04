import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Services | Classe et Nature",
  description: "Découvrez notre gamme complète de services d'hypnothérapie et de coaching",
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Nos services</h1>
            <p className="text-xl text-muted-foreground">
              Une approche personnalisée pour chaque client et chaque situation
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {[
              {
                title: "Hypnothérapie Classique",
                description: "Séances individuelles pour traiter les défis émotionnels et comportementaux",
                benefits: [
                  "Phobies et anxiété",
                  "Arrêt du tabac",
                  "Gestion du stress",
                  "Confiance en soi",
                  "Traumas émotionnels",
                ],
                icon: "🧠",
              },
              {
                title: "Coaching Personnalisé",
                description: "Accompagnement sur mesure pour atteindre vos objectifs de vie et de carrière",
                benefits: [
                  "Clarification des objectifs",
                  "Plans d'action détaillés",
                  "Suivi régulier",
                  "Résolution de problèmes",
                  "Développement personnel",
                ],
                icon: "✨",
              },
              {
                title: "Développement Personnel",
                description: "Travail profond sur la confiance, l'estime de soi et la motivation",
                benefits: [
                  "Augmenter la confiance",
                  "Améliorer l'estime de soi",
                  "Motivation durable",
                  "Leadership personnel",
                  "Équilibre vie-travail",
                ],
                icon: "🚀",
              },
            ].map((service, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                  <Link
                    href="/booking"
                    className="text-primary font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-2"
                  >
                    Réserver une séance
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="font-semibold text-foreground mb-6">Bénéfices inclus :</h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">
              Comment fonctionne le processus
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Consultation initiale",
                  desc: "Rencontre pour discuter de vos objectifs, vos défis et vos attentes",
                },
                {
                  step: 2,
                  title: "Évaluation et planification",
                  desc: "Création d'un plan personnalisé adapté à votre situation",
                },
                {
                  step: 3,
                  title: "Séances de traitement",
                  desc: "Application des techniques d'hypnothérapie et de coaching",
                },
                {
                  step: 4,
                  title: "Suivi et intégration",
                  desc: "Consolidation des résultats et accompagnement sur le long terme",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">Questions fréquentes</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Combien de séances faut-il pour voir des résultats ?",
                  a: "Cela dépend de votre situation et de vos objectifs. Certains clients voient des résultats en 1-2 séances, tandis que d'autres en ont besoin de plus. Nous discuterons d'un plan personnalisé lors de votre consultation.",
                },
                {
                  q: "L'hypnose est-elle dangereuse ?",
                  a: "Non, l'hypnose est un état naturel et sûr. Vous restez toujours conscient et en contrôle. Vous ne pouvez pas être forcé à faire quelque chose contre votre volonté.",
                },
                {
                  q: "Comment se déroule une séance typique ?",
                  a: "La séance commence par une discussion, suivie d'une induction hypnotique, puis du travail thérapeutique. Vous vous sentirez détendu et reposé à la fin.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Prêt à transformer votre vie ?</h2>
            <p className="text-lg mb-8 opacity-90">
              Choisissez le service qui vous convient et réservez votre première séance
            </p>
            <Link
              href="/booking"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Réserver maintenant
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
