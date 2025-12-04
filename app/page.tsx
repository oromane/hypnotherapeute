import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSeoSettings } from "@/lib/sanity-queries"
import { Hero3D } from "@/components/Hero3D"
import { ServicesSection } from "@/components/ServicesSection"

export async function generateMetadata() {
  const seo = await getSeoSettings()
  return {
    title: seo?.home?.metaTitle || "Elisabeth DUCHESNE - Hypnothérapeute & Sophrologue",
    description: seo?.home?.metaDescription || "Hypnose Ericksonienne, Sophrologie et Coaching à Pomerols (34) et Paris 16e.",
  }
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
          {/* 3D Background */}
          <Hero3D />

          <div className="relative z-10 max-w-4xl text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium text-primary animate-fade-in">
              Cabinet à Pomerols (34) & Paris 16e
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-6 leading-tight tracking-tight drop-shadow-sm">
              Elisabeth <span className="text-primary">DUCHESNE</span>
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-muted-foreground mb-8 font-light">
              Hypnothérapeute & Sophrologue
            </p>

            <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Révélez votre potentiel grâce à l'Hypnose Ericksonienne, la Sophrologie et le Coaching de vie.
              Une approche bienveillante pour votre transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Prendre rendez-vous
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <Link
                href="/prestations"
                className="px-8 py-4 rounded-full font-semibold text-lg border border-border bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 group"
              >
                Découvrir mes prestations
                <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Snippet */}
        <section className="py-20 px-4 bg-card">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Qui suis-je ?</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Je suis Elisabeth DUCHESNE, hypnothérapeute et sophrologue expérimentée, spécialisée en Hypnose
                Ericksonienne et accompagnement personnel. Je propose des consultations dans mes cabinets à Pomerols
                (34) et à Paris 16e.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Mon approche intègre l'hypnose, la sophrologie, le coaching de vie et l'Access Bars® pour vous
                accompagner dans votre transformation personnelle et votre bien-être.
              </p>
              <Link
                href="/profile"
                className="text-primary font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-2"
              >
                En savoir plus
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
              <img
                src="/professional-therapist-portrait.jpg"
                alt="Elisabeth DUCHESNE"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Prestations Preview */}
        <ServicesSection />

        {/* Contact Info */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">Me contacter</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Téléphone",
                  content: "01 86 65 29 44",
                },
                {
                  title: "Cabinet Principal",
                  content: "Pomerols\n34230 Pomerols, France",
                },
                {
                  title: "Cabinet Secondaire",
                  content: "IMSS Stade Jean Bouin\nPARIS 16e",
                },
              ].map((info, idx) => (
                <div key={idx} className="bg-card rounded-lg p-8 text-center">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">{info.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">Prêt pour votre transformation ?</h2>
            <p className="text-lg mb-8 opacity-90">
              Prenez le premier pas vers une vie meilleure. Contactez-moi ou réservez votre consultation dès
              aujourd'hui.
            </p>
            <Link
              href="/booking"
              className="bg-primary-foreground text-primary px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Réserver maintenant
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
