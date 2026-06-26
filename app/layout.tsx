import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CalcFácil — Calculadoras Online Gratis',
  description: 'Calculadoras de préstamos, ahorro, calorías, electricidad y construcción.',
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