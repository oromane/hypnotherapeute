"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface Service {
    _id: string
    title: string
    slug: string
    excerpt: string
    category: string
}

interface PrestationsListProps {
    initialServices: Service[]
}

export function PrestationsList({ initialServices }: PrestationsListProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("Tous")

    const categories = ["Tous", ...Array.from(new Set(initialServices.map((p) => p.category).filter(Boolean)))]

    const normalizeText = (text: string) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    const filteredPrestations = initialServices
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
                </div>
            </section>
        </>
    )
}
