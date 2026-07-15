'use client'

import { useState }        from 'react'
import { RegistrarVisita } from '@/app/components/seo/RegistrarVisita'
import { Breadcrumbs }     from '@/app/components/layout/Breadcrumbs'
import { Copy }            from 'lucide-react'
import { cn }              from '@/app/lib/utils'

const TRANSFORMACIONES = [
  { id: 'mayusculas',   label: 'MAYÚSCULAS',   fn: (t: string) => t.toUpperCase()                                                              },
  { id: 'minusculas',   label: 'minúsculas',   fn: (t: string) => t.toLowerCase()                                                              },
  { id: 'titulo',       label: 'Título',       fn: (t: string) => t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { id: 'oracion',      label: 'Oración',      fn: (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()                         },
  { id: 'camelCase',    label: 'camelCase',    fn: (t: string) => t.toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_, c) => c.toUpperCase())         },
  { id: 'PascalCase',   label: 'PascalCase',   fn: (t: string) => t.toLowerCase().replace(/(^|[^a-z0-9]+)(.)/gi, (_, __, c) => c.toUpperCase()) },
  { id: 'snake_case',   label: 'snake_case',   fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')               },
  { id: 'kebab-case',   label: 'kebab-case',   fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')               },
  { id: 'invertido',    label: 'ɪnʌǝɹʇᴉpO',  fn: (t: string) => t.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'sin_acentos',  label: 'Sin acentos',  fn: (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')                           },
]

export default function ConversorTextoPage() {
  const [texto, setTexto]         = useState('')
  const [activo, setActivo]       = useState('mayusculas')
  const [copiado, setCopiado]     = useState(false)

  const transformacion = TRANSFORMACIONES.find((t) => t.id === activo)!
  const resultado      = texto ? transformacion.fn(texto) : ''

  async function copiar() {
    if (!resultado) return
    await navigator.clipboard.writeText(resultado)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <>
      <RegistrarVisita pagina="herramienta-conversor-texto" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Conversor de Texto" categoria="Herramientas" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🔤</div>
          <h1 className="text-2xl font-bold text-slate-800">Conversor de Texto</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Convierte tu texto entre diferentes formatos al instante.
        </p>

        <div className="space-y-6">
          {/* Botones de transformación */}
          <div className="flex flex-wrap gap-2">
            {TRANSFORMACIONES.map((t) => (
              <button
                key={t.id}
                onClick={() => setActivo(t.id)}
                className={cn(
                  'px-3 py-2 rounded-lg border-2 text-sm font-mono font-medium transition-all',
                  activo === t.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-blue-300'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Editor dos columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="text-sm font-medium text-slate-600">Texto original</p>
              </div>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escribe o pega tu texto aquí..."
                rows={12}
                className="w-full px-4 py-4 text-sm text-slate-800 outline-none resize-none placeholder:text-slate-400"
              />
            </div>

            <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-blue-100 bg-blue-50 flex items-center justify-between">
                <p className="text-sm font-medium text-blue-700">{transformacion.label}</p>
                <button
                  onClick={copiar}
                  disabled={!resultado}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-blue-200 rounded-lg hover:bg-blue-100 text-blue-600 transition-all disabled:opacity-40"
                >
                  <Copy className="w-3 h-3" />
                  {copiado ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
              <div className="px-4 py-4 text-sm text-slate-800 min-h-[200px] font-mono whitespace-pre-wrap break-all">
                {resultado || <span className="text-slate-400">El resultado aparecerá aquí...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}