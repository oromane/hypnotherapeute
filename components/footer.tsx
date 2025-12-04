import Link from "next/link"
import { Linkedin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Elisabeth DUCHESNE</h3>
            <p className="text-sm opacity-90">
              Hypnothérapeute & Sophrologue spécialisée en Hypnose Ericksonienne et Sophrologie.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/elisabeth-thobois-duchesne-86998564/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/etdklayce/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/klayce_hypnose/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:opacity-80 transition-opacity">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/prestations" className="hover:opacity-80 transition-opacity">
                  Prestations
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:opacity-80 transition-opacity">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Prestations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prestations/hypnose-ericksonienne" className="hover:opacity-80 transition-opacity">
                  Hypnose Ericksonienne
                </Link>
              </li>
              <li>
                <Link href="/prestations/sophrologie" className="hover:opacity-80 transition-opacity">
                  Sophrologie
                </Link>
              </li>
              <li>
                <Link href="/prestations/coaching-vie" className="hover:opacity-80 transition-opacity">
                  Coaching de vie
                </Link>
              </li>
              <li>
                <Link href="/prestations/access-bars" className="hover:opacity-80 transition-opacity">
                  Access Bars®
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm mb-2">Téléphone: 01 86 65 29 44</p>
            <p className="text-sm mb-4">Pomerols (34) & Paris 16e</p>
            <a
              href="https://www.medoucine.com/consultation/suresnes/elisabeth-duchesne/4142"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-80 transition-opacity underline"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 Elisabeth DUCHESNE. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:opacity-80 transition-opacity">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:opacity-80 transition-opacity">
              Politique de confidentialité
            </Link>
            <Link href="/cgu" className="hover:opacity-80 transition-opacity">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
