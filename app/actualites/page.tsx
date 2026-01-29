import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getFeaturedPosts, getCategories, getAllPostsForSearch, getSeoSettings } from "@/lib/sanity-queries"
import { ActualitesList } from "@/components/ActualitesList"
export async function generateMetadata() {
  const seo = await getSeoSettings()
  return {
    title: seo?.blog?.metaTitle || "Actualités - Elisabeth DUCHESNE",
    description: seo?.blog?.metaDescription || "Articles et conseils sur l'hypnose et la sophrologie.",
  }
}
export default async function ActualitesPage() {
  const [categories, featuredArticles, allPosts] = await Promise.all([
    getCategories(),
    getFeaturedPosts(),
    getAllPostsForSearch(),
  ])
  return (
    <>
      <Header />
      <ActualitesList
        initialArticles={allPosts}
        initialFeatured={featuredArticles}
        initialCategories={categories}
      />
      <Footer />
    </>
  )
}