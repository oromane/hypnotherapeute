"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-primary">
          Elisabeth DUCHESNE
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Accueil
          </Link>
          <Link href="/profile" className="text-foreground hover:text-primary transition-colors">
            À Propos
          </Link>
          <Link href="/prestations" className="text-foreground hover:text-primary transition-colors">
            Prestations
          </Link>
          <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
            Tarifs
          </Link>
          <Link href="/actualites" className="text-foreground hover:text-primary transition-colors">
            Actualités
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/booking"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/profile" className="block text-foreground hover:text-primary transition-colors">
              À Propos
            </Link>
            <Link href="/prestations" className="block text-foreground hover:text-primary transition-colors">
              Prestations
            </Link>
            <Link href="/pricing" className="block text-foreground hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link href="/actualites" className="block text-foreground hover:text-primary transition-colors">
              Actualités
            </Link>
            <Link href="/contact" className="block text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link
              href="/booking"
              className="block bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium text-center hover:opacity-90 transition-opacity"
            >
              Réserver
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
