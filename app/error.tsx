'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-destructive/10 p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Une erreur est survenue</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                Nous sommes désolés, mais une erreur inattendue s'est produite.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                    Réessayer
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}
