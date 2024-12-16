import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mabica.vercel.app/',
      lastModified: new Date('2024-12-16T14:29:48+00:00'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://mabica.vercel.app/audiobooks',
      lastModified: new Date('2024-12-16T14:29:48+00:00'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://mabica.vercel.app/sign-in',
      lastModified: new Date('2024-12-16T14:29:48+00:00'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://mabica.vercel.app/audiobooks/occult-of-catalyst-shrouded-soul-teaser',
      lastModified: new Date('2024-12-16T14:29:48+00:00'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://mabica.vercel.app/audiobooks/occult-of-catalyst-shrouded-soul-teaser/occult-of-catalyst-shrouded-soul-teaser-1',
      lastModified: new Date('2024-12-16T14:29:48+00:00'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: 'https://mabica.vercel.app/audiobooks/occult-of-catalyst-shrouded-soul-teaser/occult-of-catalyst-shrouded-soul-teaser-2',
      lastModified: new Date('2024-12-16T14:29:48+00:00'),
      changeFrequency: 'yearly',
      priority: 0.51,
    },
  ]
}
