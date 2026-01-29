import { getService, getServices } from "@/lib/sanity-queries"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortableText } from "@portabletext/react"
import { components } from "@/components/sanity/PortableTextComponents"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service: any) => ({
    slug: service.slug,
  }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service: Service = await getService(slug)
  if (!service) {
    return {}
  }
  return {
    title: service.seo?.metaTitle || `${service.title} - Elisabeth DUCHESNE`,
    description: service.seo?.metaDescription || service.excerpt,
  }
}
interface Service {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  content: any
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // logging removed
  const service: Service = await getService(slug)
  // logging removed
  if (!service) {
    // logging removed
    notFound()
  }
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-24 px-4 overflow-hidden bg-primary/5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-background/0 to-background"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Link
              href="/prestations"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux prestations
            </Link>
            <span className="block text-primary font-semibold tracking-wider uppercase mb-4 text-sm md:text-base">
              {service.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {service.excerpt}
            </p>
          </div>
        </section>
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto
              prose-headings:font-serif prose-headings:text-foreground 
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary hover:prose-a:text-primary/80 
              prose-strong:text-foreground prose-strong:font-semibold
              prose-li:text-muted-foreground">
              {service.content ? (
                <PortableText value={service.content} components={components} />
              ) : (
                <p className="text-muted-foreground italic text-center">Contenu à venir...</p>
              )}
            </div>
            <div className="mt-16 pt-8 border-t border-border text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Intéressé(e) par cette séance ?</h3>
              <p className="text-muted-foreground mb-8">
                Prenez rendez-vous dès maintenant pour commencer votre accompagnement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Prendre rendez-vous
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-card border border-input hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
