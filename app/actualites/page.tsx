// Path: hypnotherapeute/app/actualites/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from "framer-motion"
import PageTransition from "@/components/PageTransition"

import { getPaginatedPosts, getFeaturedPosts, getCategories } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity-image"

import { PortableTextBlock } from '@portabletext/react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  categoryImage?: SanityImageSource
  date: string
  author: string
  isPublished: boolean
  isFeatured: boolean
  content: PortableTextBlock[]
  publishedAt: string
}

const ARTICLES_PER_PAGE = 15

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ActualitesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<{ title: string, slug: string }[]>([])
  const [totalArticles, setTotalArticles] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [currentPage, setCurrentPage] = useState(1)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    let ignore = false

    async function loadData() {
      setIsLoading(true)
      try {
        try {
          const cats = await getCategories()
          if (!ignore) setCategories(cats)
        } catch (error) {
          console.error("Erreur chargement catégories:", error)
        }

        let featured: Article[] = []
        try {
          featured = await getFeaturedPosts()
        } catch (error) {
          console.error("Erreur chargement articles en vedette:", error)
        }

        let allPosts: Article[] = []
        try {
          const { getAllPostsForSearch } = await import("@/lib/sanity-queries")
          allPosts = await getAllPostsForSearch()
        } catch (error) {
          console.error("Erreur chargement tous les articles:", error)
        }

        if (!ignore) {
          setFeaturedArticles(featured)
          setArticles(allPosts)
          setTotalArticles(allPosts.length)
        }
      } catch (error) {
        console.error("Erreur globale:", error)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [])

  const normalizeText = (text: string) =>
    text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : ""

  const filteredArticles = articles.filter((article) => {
    // Filtre par catégorie
    if (selectedCategory !== "Tous" && article.category !== selectedCategory) {
      return false
    }

    // Filtre par recherche (Smart Search)
    if (!searchTerm.trim()) return true

    const normalizedSearch = normalizeText(searchTerm)
    const searchTerms = normalizedSearch.split(" ").filter(Boolean)
    const normalizedTitle = normalizeText(article.title)
    const normalizedExcerpt = normalizeText(article.excerpt)
    // On cherche aussi dans le contenu si possible, mais attention à la perf et au format PortableText
    // Pour l'instant Titre + Extrait c'est déjà très bien et rapide.

    return searchTerms.every(term =>
      normalizedTitle.includes(term) || normalizedExcerpt.includes(term)
    )
  })

  // Pagination des résultats filtrés
  const totalFiltered = filteredArticles.length
  const totalPages = Math.ceil(totalFiltered / ARTICLES_PER_PAGE)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )

  // Reset page quand on change de filtre
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])


  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <>
      <Header />
      <PageTransition>
        <main>
          {/* Hero */}
          <section className="bg-muted py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Actualités</h1>
              <p className="text-xl text-muted-foreground">
                Articles, conseils et ressources sur l'hypnothérapie, la sophrologie et le bien-être
              </p>
            </div>
          </section>

          {/* Search Bar */}
          <section className="py-8 px-4 bg-card border-b border-border">
            <div className="max-w-6xl mx-auto relative">
              <input
                type="text"
                placeholder="Recherchez un article..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-6 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground pr-12"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </section>

          {/* Categories */}
          <section className="py-8 px-4 border-b border-border">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCategoryChange("Tous")}
                  className={`px-4 py-2 rounded-full transition-all font-medium ${selectedCategory === "Tous"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                >
                  Tous
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.title)}
                    className={`px-4 py-2 rounded-full transition-all font-medium ${selectedCategory === cat.title
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-border"
                      }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {totalFiltered} article{totalFiltered !== 1 ? "s" : ""} trouvé{totalFiltered !== 1 ? "s" : ""}
              </p>
            </div>
          </section>

          {/* Featured Articles (Carousel or Grid) - HIDDEN WHEN SEARCHING */}
          {!searchTerm && featuredArticles.length > 0 && (
            <section className="py-20 px-4 bg-muted">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-serif font-bold text-foreground">Articles en vedette</h2>
                  {featuredArticles.length > 2 && (
                    <div className="flex gap-2">
                      <button onClick={scrollPrev} className="p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={scrollNext} className="p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {featuredArticles.length > 2 ? (
                  // Carousel Mode
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                      {featuredArticles.map((article) => (
                        <div key={article._id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 pl-8">
                          <Link
                            href={`/actualites/${article.slug}`}
                            className="block group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full"
                          >
                            <div className="h-64 bg-primary/10 flex items-center justify-center overflow-hidden relative">
                              {article.categoryImage ? (
                                <Image
                                  src={urlFor(article.categoryImage).width(800).height(600).url()}
                                  alt={article.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              ) : (
                                <div className="text-center">
                                  <div className="text-primary text-6xl font-serif font-bold opacity-20">
                                    {article.title.charAt(0)}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="p-8">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-primary uppercase">{article.category}</span>
                                <span className="text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
                              </div>
                              <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                              <div className="inline-flex items-center text-primary font-semibold gap-2 group-hover:gap-3 transition-all">
                                Lire la suite
                                <ArrowRight size={18} />
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Grid Mode (<= 2 items)
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredArticles.map((article, idx) => (
                      <motion.div
                        key={article._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link
                          href={`/actualites/${article.slug}`}
                          className="group block bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full"
                        >
                          <div className="h-64 bg-primary/10 flex items-center justify-center overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                            {article.categoryImage ? (
                              <Image
                                src={urlFor(article.categoryImage).width(800).height(600).url()}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="text-center">
                                <div className="text-primary text-6xl font-serif font-bold opacity-20 group-hover:scale-110 transition-transform duration-500">
                                  {article.title.charAt(0)}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-8 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            <div className="flex items-center justify-between mb-4">
                              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                {article.category}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                              {article.excerpt}
                            </p>
                            <div className="inline-flex items-center text-primary font-semibold gap-2 group-hover:gap-3 transition-all">
                              Lire l'article
                              <ArrowRight size={18} />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Articles Grid */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">Chargement des articles...</p>
                </div>
              ) : filteredArticles.length > 0 ? (
                <>
                  <motion.div
                    key={searchTerm + selectedCategory + currentPage}
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                  >
                    {paginatedArticles.map((article) => (
                      <motion.div key={article._id} variants={item} whileHover={{ y: -5 }} className="h-full">
                        <Link
                          href={`/actualites/${article.slug}`}
                          className="group flex flex-col h-full bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                        >
                          <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                            {article.categoryImage ? (
                              <Image
                                src={urlFor(article.categoryImage).width(600).height(400).url()}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="text-primary text-5xl font-serif font-bold opacity-20 group-hover:scale-110 transition-transform duration-500">
                                {article.title.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-grow relative">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold text-primary uppercase tracking-wide">{article.category}</span>
                            </div>
                            <h3 className="text-lg font-serif font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">{article.excerpt}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <span className="text-xs text-muted-foreground font-medium">
                                {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </span>
                              <div className="text-primary group-hover:translate-x-1 transition-transform">
                                <ArrowRight size={18} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 my-12">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "border border-border hover:bg-muted"
                              }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">Aucun article ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </section>



          {/* CTA (inchangé) */}
          <section className="py-16 px-4 bg-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">Besoin d'accompagnement ?</h2>
              <p className="text-lg mb-8 opacity-90">
                Consultez mes articles ou prenez contact pour discuter de votre situation
              </p>
              <Link
                href="/contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Me contacter
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  )
}