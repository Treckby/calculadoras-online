'use client'

import { useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import { exportarPDF } from '../../lib/pdf'
import { cn } from '../../lib/utils'

interface BotonPDFProps {
  elementoId: string
  nombreArchivo: string
  className?: string
}

export function BotonPDF({ elementoId, nombreArchivo, className }: BotonPDFProps) {
  const [loading, setLoading] = useState(false)

  async function handleExportar() {
    setLoading(true)
    await exportarPDF(elementoId, nombreArchivo)
    setLoading(false)
  }

  return (
    <button
      onClick={handleExportar}
      disabled={loading}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all',
        'border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {loading
        ? <><Loader2 className="w-4 h-4 animate-spin" /> Generando PDF...</>
        : <><FileDown className="w-4 h-4" /> Exportar PDF</>
      }
    </button>
  )
}