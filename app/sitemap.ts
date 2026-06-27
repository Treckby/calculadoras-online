import { MetadataRoute } from 'next'

const BASE_URL = 'https://tudominio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const calculadoras = [
    'prestamos', 'ahorro', 'calorias', 'electricidad', 'gasolina',
  ]

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...calculadoras.map((slug) => ({
      url: `${BASE_URL}/calculadoras/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}