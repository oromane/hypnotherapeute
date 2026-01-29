import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getLegalPages } from "@/lib/sanity-queries"
import { PortableText } from "@portabletext/react"
import { components } from "@/components/sanity/PortableTextComponents"
export const metadata = {
  title: "Mentions Légales | Elisabeth DUCHESNE",
  description: "Mentions légales du site d'Elisabeth DUCHESNE, hypnothérapeute et sophrologue.",
}
export default async function MentionsLegalesPage() {
  const legal = await getLegalPages()
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1 className="text-4xl font-serif font-bold mb-8">Mentions Légales</h1>
          {legal?.mentionsLegales ? (
            <PortableText value={legal.mentionsLegales} components={components} />
          ) : (
            <p className="text-muted-foreground italic">Contenu en cours de rédaction...</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
