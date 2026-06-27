import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://tudominio.com' // ← cambia por tu dominio real

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CalcFácil — Calculadoras Online Gratis en Español',
    template: '%s | CalcFácil',
  },
  description:
    'Calculadoras gratuitas de préstamos, ahorro, calorías, consumo eléctrico y gasolina. Rápidas, precisas y en español.',
  keywords: [
    'calculadora online', 'calculadora prestamos', 'calculadora ahorro',
    'calculadora calorias', 'consumo electrico', 'calculadora gasolina',
    'calculadoras gratis', 'calculadoras en español',
  ],
  authors: [{ name: 'CalcFácil' }],
  creator: 'CalcFácil',
  publisher: 'CalcFácil',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: BASE_URL,
    siteName: 'CalcFácil',
    title: 'CalcFácil — Calculadoras Online Gratis en Español',
    description:
      'Calculadoras gratuitas de préstamos, ahorro, calorías, consumo eléctrico y gasolina.',
    images: [
      {
        url: '/og-image.png',   // crearemos esto en el paso 11.5
        width: 1200,
        height: 630,
        alt: 'CalcFácil — Calculadoras Online Gratis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcFácil — Calculadoras Online Gratis',
    description: 'Calculadoras gratuitas en español: préstamos, ahorro, calorías y más.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        <Header />
        <main>{children}</main>
        <footer className="text-center py-8 text-sm text-slate-400 border-t border-slate-200 mt-16">
          © {new Date().getFullYear()} CalcFácil — Calculadoras gratuitas en español
        </footer>
      </body>
    </html>
  )
}