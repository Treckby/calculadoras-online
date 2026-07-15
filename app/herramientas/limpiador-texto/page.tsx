'use client'

import { useState }        from 'react'
import { RegistrarVisita } from '@/app/components/seo/RegistrarVisita'
import { Breadcrumbs }     from '@/app/components/layout/Breadcrumbs'
import { Copy, Trash2 }    from 'lucide-react'
import { cn }              from '@/app/lib/utils'

const OPERACIONES = [
  { id: 'espacios_extra',   label: 'Espacios extra',         desc: 'Elimina espacios dobles o triples',              fn: (t: string) => t.replace(/[ \t]+/g, ' ').trim()                    },
  { id: 'lineas_vacias',    label: 'Líneas vacías',          desc: 'Elimina líneas en blanco',                       fn: (t: string) => t.split('\n').filter((l) => l.trim() !== '').join('\n') },
  { id: 'saltos_extra',     label: 'Saltos extra',           desc: 'Deja máximo un salto de línea',                  fn: (t: string) => t.replace(/\n{3,}/g, '\n\n')                         },
  { id: 'tabs',             label: 'Tabulaciones',           desc: 'Reemplaza tabs por espacios',                    fn: (t: string) => t.replace(/\t/g, ' ')                               },
  { id: 'acentos',          label: 'Acentos y tildes',       desc: 'Elimina diacríticos',                            fn: (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')  },
  { id: 'puntuacion',       label: 'Puntuación extra',       desc: 'Elimina caracteres especiales',                  fn: (t: string) => t.replace(/[^\w\s.,;:!?áéíóúÁÉÍÓÚüÜñÑ-]/g, '')   },
  { id: 'numeros',          label: 'Números',                desc: 'Elimina todos los dígitos',                      fn: (t: string) => t.replace(/[0-9]/g, '')                             },
  { id: 'html',             label: 'Etiquetas HTML',         desc: 'Elimina tags HTML',                              fn: (t: string) => t.replace(/<[^>]*>/g, '')                           },
  { id: 'urls',             label: 'URLs',                   desc: 'Elimina enlaces web',                            fn: (t: string) => t.replace(/https?:\/\/[^\s]+/g, '')                 },
  { id: 'salto_unico',      label: 'Todo en una línea',      desc: 'Une todo el texto en una sola línea',            fn: (t: string) => t.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()  },
]

export default function LimpiadorTextoPage() {
  const [texto, setTexto]         = useState('')
  const [activas, setActivas]     = useState<string[]>(['espacios_extra', 'lineas_vacias'])
  const [copiado, setCopiado]     = useState(false)

  const resultado = activas.reduce((acc, id) => {
    const op = OPERACIONES.find((o) => o.id === id)
    return op ? op.fn(acc) : acc
  }, texto)

  function toggleOp(id: string) {
    setActivas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  async function copiar() {
    if (!resultado) return
    await navigator.clipboard.writeText(resultado)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const cambios = texto.length - resultado.length

  return (
    <>
      <RegistrarVisita pagina="herramienta-limpiador-texto" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Limpiador de Texto" categoria="Herramientas" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">🧹</div>
          <h1 className="text-2xl font-bold text-slate-800">Limpiador de Texto</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Selecciona las operaciones y el texto se limpia automáticamente.
        </p>

        <div className="space-y-6">
          {/* Operaciones */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Operaciones de limpieza</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OPERACIONES.map((op) => (
                <button
                  key={op.id}
                  onClick={() => toggleOp(op.id)}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all',
                    activas.includes(op.id)
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-slate-200 hover:border-amber-300'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center',
                    activas.includes(op.id) ? 'border-white bg-white' : 'border-slate-300'
                  )}>
                    {activas.includes(op.id) && (
                      <div className="w-2 h-2 bg-amber-500 rounded-sm" />
                    )}
                  </div>
                  <div>
                    <p className={cn('text-sm font-semibold', activas.includes(op.id) ? 'text-white' : 'text-slate-700')}>
                      {op.label}
                    </p>
                    <p className={cn('text-xs mt-0.5', activas.includes(op.id) ? 'text-amber-100' : 'text-slate-400')}>
                      {op.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">Texto original</p>
                <button onClick={() => setTexto('')} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Pega tu texto aquí..."
                rows={14}
                className="w-full px-4 py-4 text-sm text-slate-800 outline-none resize-none placeholder:text-slate-400"
              />
              <div className="px-4 py-2 border-t border-slate-100 text-xs text-slate-400">
                {texto.length} caracteres
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-amber-100 bg-amber-50 flex items-center justify-between">
                <p className="text-sm font-medium text-amber-700">
                  Texto limpio
                  {cambios > 0 && (
                    <span className="ml-2 text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
                      -{cambios} chars
                    </span>
                  )}
                </p>
                <button
                  onClick={copiar}
                  disabled={!resultado}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs border border-amber-200 rounded-lg hover:bg-amber-100 text-amber-600 transition-all disabled:opacity-40"
                >
                  <Copy className="w-3 h-3" />
                  {copiado ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
              <div className="px-4 py-4 text-sm text-slate-800 min-h-[200px] whitespace-pre-wrap break-words">
                {resultado || <span className="text-slate-400">El resultado aparecerá aquí...</span>}
              </div>
              <div className="px-4 py-2 border-t border-amber-100 text-xs text-slate-400">
                {resultado.length} caracteres
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}