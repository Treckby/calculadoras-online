'use client'

import { useMemo, useState } from 'react'
import { Copy, Trash2 }      from 'lucide-react'

export function ContadorPalabras() {
  const [texto, setTexto] = useState('')
  const [copiado, setCopiado] = useState(false)
  return (
    <>
      
      <div className="max-w-4xl mx-auto px-4 py-10">
       
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">📝</div>
          <h1 className="text-2xl font-bold text-slate-800">Contador de Palabras</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Pega o escribe tu texto y obtén estadísticas al instante.
        </p>
       
      </div>
    </>
  )
}

