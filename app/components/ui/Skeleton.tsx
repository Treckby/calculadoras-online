import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate-200',
        className
      )}
    />
  )
}

// Skeleton específico para resultado de calculadora
export function ResultadoSkeleton() {
  return (
    <div className="space-y-4">
      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      {/* Gráfica */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-56 w-full" />
      </div>
      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <Skeleton className="h-5 w-40" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  )
}