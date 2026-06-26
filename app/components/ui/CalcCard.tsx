import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CalcCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  bgColor: string
}

export function CalcCard({ title, description, href, icon: Icon, color, bgColor }: CalcCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', bgColor)}>
          <Icon className={cn('w-6 h-6', color)} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}