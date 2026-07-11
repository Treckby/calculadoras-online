import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CalcCardProps {
  title:       string
  description: string
  href:        string
  icon:        LucideIcon
  color:       string
  bgColor:     string
  nuevo?:      boolean
}

export function CalcCard({
  title, description, href, icon: Icon, color, bgColor, nuevo
}: CalcCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">

        {/* Badge nuevo */}
        {nuevo && (
          <span className="absolute top-3 right-3 text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            Nuevo
          </span>
        )}

        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110', bgColor)}>
          <Icon className={cn('w-6 h-6', color)} />
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>

        {/* Flecha animada */}
        <div className="mt-4 flex items-center text-xs font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
          Abrir calculadora →
        </div>
      </div>
    </Link>
  )
}