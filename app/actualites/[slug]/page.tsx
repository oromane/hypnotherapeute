import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/sanity-queries"
import { PortableText } from "@portabletext/react"
import { components } from "@/components/sanity/PortableTextComponents"
import { urlFor } from "@/lib/sanity-image"
import PageTransition from "@/components/PageTransition"
export interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  categoryImage?: any
  date: string
  author: string
  isPublished: boolean
  isFeatured: boolean
  content: any
  publishedAt: string
}
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
) {
  const actualParams = await params 
  const article = await getPost(actualParams.slug) 
  if (!article) {
    return {
      title: "Article non trouvé",
      description: "Cet article n'existe pas ou n'est plus disponible."
    }
  }
  let ogImage = "/images/og-default.jpg" 
  if (article.categoryImage) {
    ogImage = urlFor(article.categoryImage).width(1200).height(630).url()
  }
  return {
    title: `${article.title} | Elisabeth DUCHESNE`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  }
}
export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const actualParams = await params 
  const article = await getPost(actualParams.slug)
  if (!article) {
    notFound()
  }
  const allArticles = await getPosts()
  const currentIndex = allArticles.findIndex((a: Article) => a.slug === actualParams.slug)
  const relatedArticles = allArticles
    .filter((a: Article) => a.category === article.category && a.slug !== actualParams.slug)
    .slice(0, 3)
  return (
    <>
      <Header />
      <PageTransition>
        <main>
          <section className="bg-muted py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/actualites"
                className="text-primary hover:opacity-80 mb-6 inline-flex items-center gap-2 transition-opacity"
              >
                <ArrowLeft size={18} />
                Retour aux actualités
              </Link>
              <h1 className="text-5xl font-serif font-bold text-foreground mb-6">{article.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="inline-block bg-primary/10 text-primary font-semibold uppercase text-sm px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span>{article.date}</span>
                <span>Par {article.author}</span>
              </div>
            </div>
          </section>
          <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                <PortableText value={article.content} components={components} />
              </div>
            </div>
          </section>
          <section className="py-16 px-4 bg-muted">
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Elisabeth DUCHESNE</h3>
              <p className="text-primary font-semibold mb-4">Hypnothérapeute & Sophrologue</p>
              <p className="text-muted-foreground mb-6">
                Spécialiste en hypnose Ericksonienne et sophrologie, Elisabeth DUCHESNE accompagne ses clients vers leurs
                objectifs avec bienveillance et professionnalisme. Consultations à Pomerols (34) et Paris 16e.
              </p>
              <Link
                href="/profile"
                className="text-primary font-semibold hover:opacity-80 inline-flex items-center gap-2 transition-opacity"
              >
                En savoir plus
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
          {relatedArticles.length > 0 && (
            <section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Articles connexes</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedArticles.map((relatedArticle: Article) => (
                    <Link
                      key={relatedArticle._id}
                      href={`/actualites/${relatedArticle.slug}`}
                      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <div className="text-primary text-4xl font-serif font-bold opacity-20">
                          {relatedArticle.title.charAt(0)}
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-semibold text-primary uppercase mb-2">{relatedArticle.category}</p>
                        <h3 className="text-lg font-serif font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{relatedArticle.excerpt}</p>
                        <div className="inline-flex items-center text-primary font-semibold gap-2 group-hover:gap-3 transition-all">
                          Lire
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
          <section className="py-12 px-4 border-t border-border">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              {currentIndex > 0 ? (
                <Link
                  href={`/actualites/${allArticles[currentIndex - 1].slug}`}
                  className="text-primary font-semibold inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <ArrowLeft size={18} />
                  Article précédent
                </Link>
              ) : (
                <div></div>
              )}
              {currentIndex < allArticles.length - 1 ? (
                <Link
                  href={`/actualites/${allArticles[currentIndex + 1].slug}`}
                  className="text-primary font-semibold inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  Article suivant
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  )
}