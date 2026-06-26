import { cn } from '../../lib/utils'

interface ResultCardProps {
  label: string
  value: string
  highlight?: boolean
  sublabel?: string
}

export function ResultCard({ label, value, highlight, sublabel }: ResultCardProps) {
  return (
    <div className={cn(
      'rounded-xl p-4 border',
      highlight
        ? 'bg-blue-600 border-blue-600 text-white'
        : 'bg-white border-slate-200 text-slate-800'
    )}>
      <p className={cn('text-xs font-medium mb-1', highlight ? 'text-blue-100' : 'text-slate-500')}>
        {label}
      </p>
      <p className={cn('text-2xl font-bold', highlight ? 'text-white' : 'text-slate-800')}>
        {value}
      </p>
      {sublabel && (
        <p className={cn('text-xs mt-1', highlight ? 'text-blue-100' : 'text-slate-400')}>
          {sublabel}
        </p>
      )}
    </div>
  )
}