import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Les mythes courants sur l'hypnose",
    excerpt: "Découvrez ce qui est vrai et ce qui ne l'est pas sur l'hypnose. Nous démystifions les idées reçues.",
    date: "15 Novembre 2024",
    category: "Hypnose",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Comment surmonter l'anxiété naturellement",
    excerpt:
      "Des techniques éprouvées pour réduire l'anxiété et retrouver la paix intérieure. Guide complet en 7 étapes.",
    date: "12 Novembre 2024",
    category: "Bien-être",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "La puissance de l'inconscient",
    excerpt: "Explorez comment votre inconscient peut être votre plus grand allié dans la transformation personnelle.",
    date: "8 Novembre 2024",
    category: "Développement personnel",
    readTime: "6 min",
  },
  {
    id: 4,
    title: "5 raisons d'arrêter de fumer avec l'hypnose",
    excerpt: "Pourquoi l'hypnose est une solution efficace pour les fumeurs. Témoignages et chiffres de succès inclus.",
    date: "5 Novembre 2024",
    category: "Hypnose",
    readTime: "7 min",
  },
  {
    id: 5,
    title: "L'auto-hypnose : un outil d'autonomisation",
    excerpt: "Apprenez à pratiquer l'auto-hypnose et à utiliser son pouvoir au quotidien.",
    date: "1 Novembre 2024",
    category: "Hypnose",
    readTime: "9 min",
  },
  {
    id: 6,
    title: "Créer une routine de bien-être quotidienne",
    excerpt: "Des habitudes simples mais puissantes pour transformer votre vie et augmenter votre bien-être général.",
    date: "28 Octobre 2024",
    category: "Bien-être",
    readTime: "6 min",
  },
]
export default function BlogPage() {
  const categories = ["Tous", "Hypnose", "Bien-être", "Développement personnel"]
  return (
    <>
      <Header />
      <main>
        <section className="bg-muted py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Notre Blog</h1>
            <p className="text-xl text-muted-foreground">
              Articles, conseils et ressources sur l'hypnothérapie et le développement personnel
            </p>
          </div>
        </section>
        <section className="py-8 px-4 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-full transition-all ${idx === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <img
                      src="/placeholder.svg?key=blog"
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <Link href={`/blog/${post.id}`} className="text-primary hover:opacity-80 transition-opacity">
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Recevez nos derniers conseils</h2>
            <p className="text-muted-foreground mb-8">
              Inscrivez-vous à notre newsletter pour recevoir des conseils hebdomadaires sur l'hypnothérapie et le
              bien-être.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-border rounded-full bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                S'abonner
              </button>
            </form>
          </div>
        </section>
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Besoin d'aide maintenant ?</h2>
            <p className="text-lg mb-8 opacity-90">
              Consultez nos articles ou contactez-nous directement pour discuter de votre situation
            </p>
            <Link
              href="/contact"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Nous contacter
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
