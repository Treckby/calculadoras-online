import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 text-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          CalcFácil
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link href="/calculadoras/prestamos" className="hover:text-blue-600 transition-colors">Préstamos</Link>
          <Link href="/calculadoras/ahorro" className="hover:text-blue-600 transition-colors">Ahorro</Link>
          <Link href="/calculadoras/calorias" className="hover:text-blue-600 transition-colors">Calorías</Link>
          <Link href="/calculadoras/electricidad" className="hover:text-blue-600 transition-colors">Electricidad</Link>
          <Link href="/calculadoras/construccion" className="hover:text-blue-600 transition-colors">Construcción</Link>
        </nav>
      </div>
    </header>
  )
}