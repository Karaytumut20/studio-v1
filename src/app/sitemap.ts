import { MetadataRoute } from 'next';
import { WORKS } from '@/data/works';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studio-v1.com'; // Replace with actual domain

  // Static routes
  const routes = [
    '',
    '/work',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (Projects)
  const projectRoutes = WORKS.map((work) => ({
    url: `${baseUrl}/work/${work.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...projectRoutes];
}