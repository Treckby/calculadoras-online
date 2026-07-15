'use client'

import { useState, useMemo } from 'react'
import { RegistrarVisita }   from '@/app/components/seo/RegistrarVisita'
import { Breadcrumbs }       from '@/app/components/layout/Breadcrumbs'
import { Copy, Trash2 }      from 'lucide-react'

const VELOCIDAD_LECTURA = 200   // palabras por minuto promedio

export default function ContadorPalabrasPage() {
  const [texto, setTexto] = useState('')
  const [copiado, setCopiado] = useState(false)

  const stats = useMemo(() => {
    const palabras    = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length
    const caracteres  = texto.length
    const sinEspacios = texto.replace(/\s/g, '').length
    const oraciones   = texto.trim() === '' ? 0 : (texto.match(/[.!?]+/g) ?? []).length
    const parrafos    = texto.trim() === '' ? 0 : texto.split(/\n\s*\n/).filter(Boolean).length
    const minLectura  = Math.ceil(palabras / VELOCIDAD_LECTURA)
    const lineas      = texto === '' ? 0 : texto.split('\n').length

    return { palabras, caracteres, sinEspacios, oraciones, parrafos, minLectura, lineas }
  }, [texto])

  async function copiar() {
    await navigator.clipboard.writeText(texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const STATS_CARDS = [
    { label: 'Palabras',           value: stats.palabras,    color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Caracteres',         value: stats.caracteres,  color: 'text-blue-600',   bg: 'bg-blue-50'   },
    { label: 'Sin espacios',       value: stats.sinEspacios, color: 'text-cyan-600',   bg: 'bg-cyan-50'   },
    { label: 'Oraciones',          value: stats.oraciones,   color: 'text-green-600',  bg: 'bg-green-50'  },
    { label: 'Párrafos',           value: stats.parrafos,    color: 'text-amber-600',  bg: 'bg-amber-50'  },
    { label: 'Líneas',             value: stats.lineas,      color: 'text-rose-600',   bg: 'bg-rose-50'   },
    { label: 'Min. de lectura',    value: stats.minLectura,  color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ]

  return (
    <>
      <RegistrarVisita pagina="herramienta-contador-palabras" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Contador de Palabras" categoria="Herramientas" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-xl">📝</div>
          <h1 className="text-2xl font-bold text-slate-800">Contador de Palabras</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Pega o escribe tu texto para ver el conteo de palabras, caracteres y tiempo de lectura.
        </p>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {STATS_CARDS.map((s) => (
              <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Textarea */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-sm font-medium text-slate-600">Tu texto</p>
              <div className="flex gap-2">
                <button
                  onClick={copiar}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:border-violet-400 text-slate-500 hover:text-violet-600 transition-all"
                >
                  <Copy className="w-3 h-3" />
                  {copiado ? '¡Copiado!' : 'Copiar'}
                </button>
                <button
                  onClick={() => setTexto('')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:border-red-300 text-slate-500 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                  Limpiar
                </button>
              </div>
            </div>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Pega o escribe tu texto aquí..."
              rows={16}
              className="w-full px-4 py-4 text-sm text-slate-800 outline-none resize-none placeholder:text-slate-400"
            />
          </div>

          {/* Barra de progreso de lectura */}
          {stats.palabras > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Tiempo estimado de lectura</span>
                <span className="font-bold text-violet-600">{stats.minLectura} min</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.minLectura / 10) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Basado en velocidad promedio de {VELOCIDAD_LECTURA} palabras por minuto
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}