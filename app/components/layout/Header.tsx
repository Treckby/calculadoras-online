import Link from 'next/link'
import { Calculator } from 'lucide-react'
import { Buscador } from './Buscador'
import { MenuMovil } from './MenuMovil'

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Hamburguesa — solo móvil */}
        <MenuMovil />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 text-lg shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline">CalcFácil</span>
        </Link>

        {/* Nav — solo desktop */}
        {/*
       <nav className="hidden lg:flex items-center gap-5 text-sm text-slate-600 flex-1 justify-center">
          <Link href="/calculadoras/prestamos"    className="hover:text-blue-600 transition-colors whitespace-nowrap">Préstamos</Link>
          <Link href="/calculadoras/ahorro"       className="hover:text-blue-600 transition-colors">Ahorro</Link>
          <Link href="/calculadoras/calorias"     className="hover:text-blue-600 transition-colors">Calorías</Link>
          <Link href="/calculadoras/electricidad" className="hover:text-blue-600 transition-colors">Electricidad</Link>
          <Link href="/calculadoras/gasolina"     className="hover:text-blue-600 transition-colors">Gasolina</Link>
          <Link href="/calculadoras/iva"          className="hover:text-blue-600 transition-colors">IVA</Link>
          <Link href="/calculadoras/propina"      className="hover:text-blue-600 transition-colors">Propina</Link>
          <Link href="/calculadoras/descuento"    className="hover:text-blue-600 transition-colors">Descuentos</Link>
        </nav>
        */
     
        }
 

        {/* Buscador */}
        <Buscador />
      </div>
    </header>
  )
}