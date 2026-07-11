import { cn } from '../../lib/utils'
import { NumeroAnimado } from './NumeroAnimado'
interface ResultCardProps {
  label: string
  value: number  | string  // acepta número o ReactNode
  sublabel?: string
  highlight?: boolean
  prefix?: string
  suffix?: string
  decimales?: number
  duracion?: number
}

export function ResultCard({
  label,
  value,
  highlight,
  sublabel,
  prefix = '',
  suffix = '',
  decimales = 2,
  duracion = 1000,
}: ResultCardProps) {
  function parseValue(value: string | number) {
  if (typeof value === 'number') {
    return { numero: value, prefijo: '', sufijo: '' }
  }

  // Detectar prefijo (ej. $)
  const prefijoMatch = value.match(/^[^\d]+/)
  const prefijo = prefijoMatch ? prefijoMatch[0] : ''

  // Detectar sufijo (ej. % o "años")
  const sufijoMatch = value.match(/[^\d]+$/)
  const sufijo = sufijoMatch ? sufijoMatch[0] : ''

  // Extraer solo el número
  const numero = Number(value.replace(/[^0-9.-]+/g, ''))

  return { numero, prefijo, sufijo }
}
   const { numero, prefijo, sufijo } = parseValue(value)
    const numericValue =
    typeof value === 'string'
      ? Number(value.replace(/[^0-9.-]+/g, '')) // elimina símbolos como "$" o ","
      : value
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
            <p className={cn('text-xs font-medium mb-1', highlight ? 'text-blue-100' : 'text-slate-500')}>
        {value}
      </p>
    <p
        className={cn(
          'text-2xl font-bold',
          highlight ? 'text-white' : 'text-slate-800'
        )}
      >
        <NumeroAnimado
          valor={numericValue}
          duracion={duracion}
          decimales={decimales}
          prefijo={prefijo}
          sufijo={sufijo}
        />
      </p>
      {sublabel && (
        <p className={cn('text-xs mt-1', highlight ? 'text-blue-100' : 'text-slate-400')}>
          {sublabel}
        </p>
      )}
    </div>
  )
}