// Path: hypnotherapeute/app/prestations/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { getServices } from "@/lib/sanity-queries"

interface Service {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
}

export default function PrestationsPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  useEffect(() => {
    async function loadServices() {
      setIsLoading(true)
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error("Erreur chargement prestations:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadServices()
  }, [])

  const categories = ["Tous", ...Array.from(new Set(services.map((p) => p.category).filter(Boolean)))]

  const normalizeText = (text: string) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  const filteredPrestations = services
    .filter((p) => {
      // Filtre par catégorie
      if (selectedCategory !== "Tous" && p.category !== selectedCategory) {
        return false
      }

      // Filtre par recherche (intelligent)
      if (!searchTerm.trim()) return true

      const normalizedSearch = normalizeText(searchTerm)
      const searchTerms = normalizedSearch.split(" ").filter(Boolean)
      const normalizedTitle = normalizeText(p.title)
      const normalizedExcerpt = normalizeText(p.excerpt)

      // Tous les mots de la recherche doivent être présents dans le titre ou l'extrait
      return searchTerms.every(term =>
        normalizedTitle.includes(term) || normalizedExcerpt.includes(term)
      )
    })
    .sort((a, b) => a.title.localeCompare(b.title))

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

        {/* Search and Filter */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Recherchez une prestation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    aria-label="Effacer la recherche"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                      : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-md hover:-translate-y-0.5"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Results count */}
            <p className="text-sm text-muted-foreground mt-4">
              {filteredPrestations.length} prestation{filteredPrestations.length !== 1 ? "s" : ""} trouvée
              {filteredPrestations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des prestations...</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrestations.map((prestation) => (
                    <motion.div
                      key={prestation._id}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Link
                        href={`/prestations/${prestation.slug}`}
                        className="block h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all group flex flex-col"
                      >
                        {prestation.category && (
                          <div className="mb-3">
                            <span className="inline-block text-[10px] font-bold tracking-wider text-primary uppercase bg-primary/5 px-2 py-1 rounded-md">
                              {prestation.category}
                            </span>
                          </div>
                        )}
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {prestation.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                          {prestation.excerpt}
                        </p>
                        <div className="flex items-center text-primary text-sm font-semibold gap-2 mt-auto">
                          En savoir plus
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {filteredPrestations.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">Aucune prestation ne correspond à votre recherche.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

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
