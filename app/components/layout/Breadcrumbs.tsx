import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbsProps {
  pagina:     string
  categoria?: string
}

export function Breadcrumbs({ pagina, categoria = 'Calculadoras' }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
      <Link href="/" className="hover:text-blue-500 transition-colors flex items-center gap-1">
        <Home className="w-3 h-3" />
        Inicio
      </Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-slate-500">{categoria}</span>
      <ChevronRight className="w-3 h-3" />
      <span className="text-slate-700 font-medium">{pagina}</span>
    </nav>
  )
}