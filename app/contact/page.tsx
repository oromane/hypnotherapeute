import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin } from "lucide-react"
import { getSeoSettings } from "@/lib/sanity-queries"
import { ContactForm } from "@/components/ContactForm"

export async function generateMetadata() {
  const seo = await getSeoSettings()
  return {
    title: seo?.contact?.metaTitle || "Contact | Elisabeth DUCHESNE - Hypnothérapeute",
    description: seo?.contact?.metaDescription || "Prenez rendez-vous pour une séance d'hypnose ou de sophrologie.",
  }
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Nous contacter</h1>
            <p className="text-xl text-muted-foreground">
              Votre bien-être nous intéresse. N'hésitez pas à nous écrire.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">Téléphone</h3>
              <p className="text-muted-foreground">+33 (0) 1 23 45 67 89</p>
              <p className="text-sm text-muted-foreground mt-1">Lun-Ven: 9h-18h</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">contact@elisabethduchesne.fr</p>
              <p className="text-sm text-muted-foreground mt-1">Réponse en 24h</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">Adresse</h3>
              <p className="text-muted-foreground">Paris, France</p>
              <p className="text-sm text-muted-foreground mt-1">Sur rendez-vous</p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Quel est le meilleur moment pour m'inscrire ?",
                  a: "N'importe quand ! Vous pouvez commencer à tout moment. Nous vous recommandons cependant de contacter avant pour discuter de vos besoins.",
                },
                {
                  q: "Comment puis-je payer mes séances ?",
                  a: "Nous acceptons tous les modes de paiement : carte bancaire, virement et espèces.",
                },
                {
                  q: "Y a-t-il une garantie de confidentialité ?",
                  a: "Absolument. Tous les détails de vos séances sont entièrement confidentiels et protégés par le secret professionnel.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-serif font-bold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
