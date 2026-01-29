import Link from "next/link"
import Image from "next/image"
export const metadata = {
  title: "Page non trouvée - Elisabeth DUCHESNE",
  description: "La page que vous cherchez n'existe pas",
}
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-7xl md:text-8xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">Page non trouvée !</h2>
          <div className="mb-8 flex justify-center">
            <video
              src="/videos/404-error.mp4"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-auto h-auto max-h-[300px]"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            La page que vous recherchez n'existe pas ! Comme une pensée qui s'échappe lors d'une séance d'hypnose, cette page a disparu. Mais ne vous inquiétez pas, nous allons vous aider à retrouver votre chemin.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            RETOURNER À L'ACCUEIL
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
