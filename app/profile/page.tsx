import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getSeoSettings } from "@/lib/sanity-queries"

export async function generateMetadata() {
  const seo = await getSeoSettings()
  return {
    title: seo?.about?.metaTitle || "À Propos | Elisabeth DUCHESNE - Hypnothérapeute",
    description: seo?.about?.metaDescription || "Découvrez le parcours d'Elisabeth DUCHESNE, hypnothérapeute et sophrologue à Roinville et Paris 16",
  }
}

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">À propos d'Elisabeth</h1>
            <p className="text-xl text-muted-foreground">
              Un parcours riche d'expériences au service de votre bien-être et de votre transformation personnelle
            </p>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-8">Elisabeth DUCHESNE</h2>
            <p className="text-xl font-semibold text-primary mb-8">Hypnothérapeute & Sophrologue</p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">À Pomerols</h3>
                <p className="text-muted-foreground text-sm">
                  Cabinet d'hypnothérapie et de sophrologie à Pomerols (34)
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">À Paris 16e</h3>
                <p className="text-muted-foreground text-sm">
                  Cabinet secondaire près de Boulogne-Billancourt et Meudon
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Contact</h3>
                <p className="text-primary font-semibold">01 86 65 29 44</p>
              </div>
            </div>

            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Un accompagnement complet et personnalisé
                </h3>
                <p>
                  À la fois hypnothérapeute, Coach de vie (Coach professionnel et personnel) et praticienne en Access
                  Bars ®Consciousness, j'offre un accompagnement complet aux personnes confrontées à diverses
                  problématiques : arrêt du tabac, gestion du stress, troubles alimentaires, et bien d'autres.
                </p>
                <p className="mt-4">
                  Disponible à mon cabinet d'hypnothérapie et sophrologie à Pomerols, mais aussi dans d'autres instituts
                  situés à Paris 16, je vous invite à me contacter pour bénéficier d'une expertise globale mise au
                  service de votre bien-être.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Parcours de formation et d'expérience
                </h3>
                <p>
                  J'ai effectué ma formation à l'école Xtrema, à Paris, qui s'intéresse tout particulièrement à
                  l'Hypnose Ericksonienne. C'est d'ailleurs cette approche que je mets en pratique aujourd'hui en ma
                  qualité de Maître praticien en Hypnose Ericksonienne sur Paris.
                </p>
                <p className="mt-4">
                  Désireuse d'élargir le champ de mes compétences, je me suis également tournée vers l'apprentissage
                  d'autres méthodes d'accompagnement. J'ai notamment été formée en Sophrologie par la célèbre école de
                  Catherine Aliota à l'Institut de formation à la Sophrologie (en cours d'obtention du certificat RNCP).
                </p>
                <p className="mt-4">
                  Grâce à une formation au sein de la Haute Ecole de Coaching (Paris), je suis également Coach certifiée
                  en développement personnel de niveau II, spécialisée dans le Coaching d'équipe et de manager.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">L'hypnose Ericksonienne</h3>
                <p>
                  L'Hypnose Ericksonienne est un formidable outil au service de votre épanouissement. Elle trouve son
                  utilité dans de nombreuses situations, afin de vous permettre de trouver vos propres chemins de vie et
                  accompagner votre potentiel.
                </p>
                <p className="mt-4">
                  Mon accompagnement se compose d'un certain nombre de consultations (variant selon la problématique)
                  puis nous mettons en place un suivi personnalisé avec un état des lieux hebdomadaire, réalisé par
                  message ou par téléphone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section className="py-20 px-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">Mes qualifications</h2>
            <div className="space-y-4">
              {[
                "Formation en Access Bars (Access Consciousness ®)",
                "Maître Praticien en Hypnose Ericksonienne (Xtrema)",
                "Praticien en Hypnose Ericksonienne (Xtrema)",
                "Coach professionnel et personnel (Haute Ecole de Coaching – certification RNCP Master 2)",
                "Spécialisation Coaching de jeunes Adultes et d'adolescents (Haute Ecole de Coaching – Certification RNCP)",
                "Membre du SNH (Syndicat National des Hypnothérapeutes)",
              ].map((qual, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-6 py-3">
                  <p className="text-foreground font-semibold">{qual}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                L'hypnothérapie permet de travailler sur de nombreux sujets. Cependant, une séance d'hypnothérapie ne
                remplace en aucun cas un avis ou un traitement médical. Seul un médecin peut poser des diagnostics et
                prescrire des traitements.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Besoin de me contacter ?</h2>
            <p className="text-lg mb-8 opacity-90">
              N'hésitez pas à prendre rendez-vous pour une première consultation
            </p>
            {/* Début du changement: Remplacement du composant Link par un tag <a> standard */}
            <a
              href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Réserver maintenant
              <ArrowRight size={18} />
            </a>
            {/* Fin du changement */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
