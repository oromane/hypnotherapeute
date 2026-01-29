import { MetadataRoute } from 'next'
import { getServices, getPosts } from '@/lib/sanity-queries'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elisabethduchesne.fr'
  const routes = [
    '',
    '/prestations',
    '/actualites',
    '/contact',
    '/cabinet-hypnotherapie',
    '/sophrologie',
    '/tarifs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  const services = await getServices()
  const serviceRoutes = services.map((service: any) => ({
    url: `${baseUrl}/prestations/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  const posts = await getPosts()
  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/actualites/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  return [...routes, ...serviceRoutes, ...postRoutes]
}
