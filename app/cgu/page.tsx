import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getLegalPages } from "@/lib/sanity-queries"
import { PortableText } from "@portabletext/react"
import { components } from "@/components/sanity/PortableTextComponents"

export const metadata = {
    title: "CGU | Elisabeth DUCHESNE",
    description: "Conditions Générales d'Utilisation du site.",
}

export default async function CGUPage() {
    const legal = await getLegalPages()

    return (
        <>
            <Header />
            <main className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-3xl mx-auto prose dark:prose-invert">
                    <h1 className="text-4xl font-serif font-bold mb-8">Conditions Générales d'Utilisation</h1>
                    {legal?.cgu ? (
                        <PortableText value={legal.cgu} components={components} />
                    ) : (
                        <p className="text-muted-foreground italic">Contenu en cours de rédaction...</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
