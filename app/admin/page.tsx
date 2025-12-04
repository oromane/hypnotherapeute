// https://github.com/oromane
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  MessageSquare,
  Edit2,
  LogOut,
  Eye,
  Star,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react"

// ==========================================================
// IMPORTATIONS DE FIREBASE (Pour les Messages uniquement)
// ==========================================================
import { db } from "../../lib/firebase"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"

// ==========================================================
// IMPORTATIONS SANITY
// ==========================================================
import { client } from "@/lib/sanity"
import { toggleFeatured, togglePublished, deleteArticle } from "@/app/actions/sanity-actions"

// L'interface doit correspondre à Sanity
export interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  isPublished: boolean
  isFeatured: boolean
  publishedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"articles" | "messages">("articles")

  // État géré par Sanity
  const [articles, setArticles] = useState<Article[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)

  // État pour la modal de suppression
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null)

  const router = useRouter()

  // ... (useEffect auth)

  // Logique de suppression
  const handleDeleteArticle = (article: Article) => {
    setArticleToDelete(article)
  }

  const cancelDelete = () => {
    setArticleToDelete(null)
  }

  const confirmDelete = async () => {
    if (articleToDelete) {
      try {
        // Optimistic update
        setArticles(prev => prev.filter(a => a._id !== articleToDelete._id))

        const result = await deleteArticle(articleToDelete._id)
        if (!result.success) {
          alert("Erreur lors de la suppression.")
          // En cas d'erreur, on pourrait recharger la page
          window.location.reload()
        }
        setArticleToDelete(null)
      } catch (e) {
        console.error("Erreur lors de la suppression:", e)
        alert("Une erreur est survenue.")
        setArticleToDelete(null)
      }
    }
  }

  // Gère l'authentification
  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  // Chargement des articles depuis Sanity
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchArticles = async () => {
      setIsLoadingArticles(true)
      try {
        const data = await client.fetch(`
          *[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            "category": category->title,
            date,
            publishedAt,
            isFeatured,
            isPublished,
            author
          }
        `)
        setArticles(data)
      } catch (error) {
        console.error("Erreur de chargement des articles Sanity:", error)
      } finally {
        setIsLoadingArticles(false)
      }
    }

    fetchArticles()
  }, [isAuthenticated])

  // Chargement des messages depuis Firebase (Inchangé)
  useEffect(() => {
    if (!isAuthenticated || activeTab !== "messages") return

    setIsLoadingMessages(true)
    const messagesQuery = query(collection(db, "messages"), orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMessages(messagesData)
        setIsLoadingMessages(false)
      },
      (error) => {
        console.error("Erreur de chargement des messages:", error)
        setIsLoadingMessages(false)
      },
    )

    return () => unsubscribe()
  }, [isAuthenticated, activeTab])

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    router.push("/")
  }

  // Actions sur les articles (Sanity)
  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    // Optimistic update
    setArticles(prev => prev.map(a => a._id === id ? { ...a, isPublished: !currentStatus } : a))

    const result = await togglePublished(id, currentStatus)
    if (!result.success) {
      // Revert on error
      setArticles(prev => prev.map(a => a._id === id ? { ...a, isPublished: currentStatus } : a))
      alert("Erreur lors de la mise à jour du statut.")
    }
  }

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    // Optimistic update
    setArticles(prev => prev.map(a => a._id === id ? { ...a, isFeatured: !currentStatus } : a))

    const result = await toggleFeatured(id, currentStatus)
    if (!result.success) {
      // Revert on error
      setArticles(prev => prev.map(a => a._id === id ? { ...a, isFeatured: currentStatus } : a))
      alert("Erreur lors de la mise à jour du statut.")
    }
  }

  // Rendu (return)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Administration - Elisabeth DUCHESNE
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex gap-6">
          <button
            onClick={() => setActiveTab("articles")}
            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${activeTab === "articles"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${activeTab === "messages"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            Messages ({messages.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Modal de confirmation de suppression */}
        {articleToDelete && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Confirmer la suppression</h2>
              <p className="text-muted-foreground mb-6">
                Êtes-vous sûr de vouloir supprimer définitivement cet article ? Cette action est irréversible.
              </p>
              <p className="text-foreground font-semibold mb-6 border border-border bg-muted p-4 rounded-lg">
                {articleToDelete.title}
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Supprimer Définitivement
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "articles" && (
          <div>
            {/* Statistiques */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <a
                href="/studio"
                target="_blank"
                className="bg-primary text-primary-foreground rounded-lg p-6 flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Plus size={32} />
                <p className="mt-2 font-semibold">Nouvel Article (Sanity)</p>
              </a>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Articles total</p>
                <p className="text-3xl font-bold text-primary">{articles.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Publiés</p>
                <p className="text-3xl font-bold text-primary">
                  {articles.filter((a) => a.isPublished).length}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">En vedette</p>
                <p className="text-3xl font-bold text-accent">
                  {articles.filter((a) => a.isFeatured).length}
                </p>
              </div>
            </div>

            {/* Articles List */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Titre</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Catégorie</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Statut</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingArticles ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8">
                        <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto" />
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr
                        key={article._id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span
                            className="text-foreground font-medium line-clamp-1"
                            title={article.title}
                          >
                            {article.title}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">
                          {article.category}
                        </td>
                        <td className="px-6 py-4 flex flex-col items-start gap-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${article.isPublished
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {article.isPublished ? "Publié" : "Brouillon"}
                          </span>
                          {article.isFeatured && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                              Vedette
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{article.date}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => handleToggleFeatured(article._id, article.isFeatured)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                            title={
                              article.isFeatured ? "Retirer de la vedette" : "Mettre en vedette"
                            }
                          >
                            <Star
                              size={18}
                              className={
                                article.isFeatured
                                  ? "text-accent fill-accent"
                                  : "text-muted-foreground hover:text-accent"
                              }
                            />
                          </button>

                          {/* Lien d'édition rapide vers Sanity */}
                          <a
                            href={`/studio/structure/post;${article._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                            title="Éditer dans Sanity Studio"
                          >
                            <Edit2 size={18} className="text-orange-500 hover:text-orange-600" />
                          </a>

                          <button
                            onClick={() => handleTogglePublish(article._id, article.isPublished)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                            title={article.isPublished ? "Masquer" : "Publier"}
                          >
                            <Eye
                              size={18}
                              className={
                                article.isPublished ? "text-primary" : "text-muted-foreground"
                              }
                            />
                          </button>

                          {/* Bouton Supprimer */}
                          <button
                            onClick={() => handleDeleteArticle(article)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                            title="Supprimer définitivement"
                          >
                            <Trash2 size={18} className="text-muted-foreground hover:text-destructive" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Onglet Messages */}
        {activeTab === "messages" && (
          <div>
            {isLoadingMessages ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Loader2 className="animate-spin h-6 w-6 mx-auto text-muted-foreground" />
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">Aucun message pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {msg.firstName} {msg.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{msg.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {/* Affiche la date du message si elle existe */}
                        {msg.timestamp?.toDate().toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">{msg.subject}</h4>
                    <p className="text-muted-foreground mb-2">{msg.message}</p>
                    {msg.phone && <p className="text-sm text-muted-foreground">Tél: {msg.phone}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}