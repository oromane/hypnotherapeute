import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export const metadata = {
  title: "Politique de confidentialité | Elisabeth DUCHESNE",
  description: "Politique de confidentialité et protection des données du site Elisabeth DUCHESNE",
}
export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-muted py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Politique de confidentialité</h1>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Collecte des données</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Nous collectons les données personnelles que vous nous fournissez volontairement via nos formulaires
                  de contact, de réservation ou d'inscription à la newsletter. Ces données incluent :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations de profil personnel</li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Utilisation des données</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Les données collectées sont utilisées pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Traiter vos demandes de contact et de réservation</li>
                  <li>Vous envoyer notre newsletter (si vous avez donné votre consentement)</li>
                  <li>Améliorer nos services</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Protection des données</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Vos données personnelles sont sécurisées par des mesures techniques et organisationnelles appropriées.
                  Nous utilisons des protocoles de sécurité standard de l'industrie pour protéger vos informations
                  contre l'accès, la modification, la divulgation ou la destruction non autorisés.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Partage des données</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Vos données personnelles ne sont jamais partagées avec des tiers sans votre consentement, sauf si la
                  loi l'exige. Nous pouvons utiliser des prestataires de services (hébergement, email) qui doivent
                  respecter cette politique de confidentialité.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Vos droits</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Conformément au RGPD, vous avez le droit de :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accéder à vos données personnelles</li>
                  <li>Rectifier vos données</li>
                  <li>Demander la suppression de vos données</li>
                  <li>Vous opposer au traitement de vos données</li>
                  <li>Demander la portabilité de vos données</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à contact@elisabethduchesne.fr avec la mention "Demande RGPD".
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Cookies</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez accepter ou refuser les
                  cookies à tout moment via les paramètres de votre navigateur.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Modifications de cette politique</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les
                  modifications seront publiées sur cette page avec la date de mise à jour.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Contact</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Pour toute question concernant cette politique de confidentialité, veuillez nous contacter :</p>
                <p>
                  Email : contact@elisabethduchesne.fr
                  <br />
                  Téléphone : 01 86 65 29 44
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 text-sm text-muted-foreground">
              <p>Dernière mise à jour : novembre 2024</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
