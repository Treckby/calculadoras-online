'use client'

import { useState, useCallback } from 'react'
import { RegistrarVisita }       from '@/app/components/seo/RegistrarVisita'
import { Breadcrumbs }           from '@/app/components/layout/Breadcrumbs'
import { Copy, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/app/lib/utils'

const CHARS = {
  mayusculas:  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  minusculas:  'abcdefghijklmnopqrstuvwxyz',
  numeros:     '0123456789',
  simbolos:    '!@#$%^&*()_+-=[]{}|;:,.<>?',
  sinAmbiguos: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789',
}

function calcularFortaleza(pass: string): { nivel: number; label: string; color: string } {
  let puntos = 0
  if (pass.length >= 8)  puntos++
  if (pass.length >= 12) puntos++
  if (pass.length >= 16) puntos++
  if (/[A-Z]/.test(pass)) puntos++
  if (/[a-z]/.test(pass)) puntos++
  if (/[0-9]/.test(pass)) puntos++
  if (/[^A-Za-z0-9]/.test(pass)) puntos++

  if (puntos <= 2) return { nivel: 1, label: 'Muy débil',  color: 'bg-red-500'    }
  if (puntos <= 3) return { nivel: 2, label: 'Débil',      color: 'bg-orange-500' }
  if (puntos <= 4) return { nivel: 3, label: 'Regular',    color: 'bg-yellow-500' }
  if (puntos <= 5) return { nivel: 4, label: 'Fuerte',     color: 'bg-blue-500'   }
  return               { nivel: 5, label: 'Muy fuerte', color: 'bg-green-500'  }
}

export default function GeneradorContrasenasPage() {
  const [longitud, setLongitud]     = useState(16)
  const [opciones, setOpciones]     = useState({
    mayusculas:   true,
    minusculas:   true,
    numeros:      true,
    simbolos:     false,
    sinAmbiguos:  false,
  })
  const [contrasenas, setContrasenas] = useState<string[]>([])
  const [copiados, setCopiados]       = useState<Record<number, boolean>>({})
  const [mostrar, setMostrar]         = useState<Record<number, boolean>>({})
  const [cantidad, setCantidad]       = useState(5)

  const generar = useCallback(() => {
    let chars = ''
    if (opciones.sinAmbiguos) {
      chars = CHARS.sinAmbiguos
    } else {
      if (opciones.mayusculas) chars += CHARS.mayusculas
      if (opciones.minusculas) chars += CHARS.minusculas
      if (opciones.numeros)    chars += CHARS.numeros
      if (opciones.simbolos)   chars += CHARS.simbolos
    }
    if (!chars) chars = CHARS.minusculas + CHARS.numeros

    const nuevas = Array.from({ length: cantidad }, () =>
      Array.from(
        { length: longitud },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    )
    setContrasenas(nuevas)
    setCopiados({})
    setMostrar({})
  }, [longitud, opciones, cantidad])

  async function copiar(pass: string, i: number) {
    await navigator.clipboard.writeText(pass)
    setCopiados((prev) => ({ ...prev, [i]: true }))
    setTimeout(() => setCopiados((prev) => ({ ...prev, [i]: false })), 2000)
  }

  return (
    <>
      <RegistrarVisita pagina="herramienta-contrasenas" />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Generador de Contraseñas" categoria="Herramientas" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">🔐</div>
          <h1 className="text-2xl font-bold text-slate-800">Generador de Contraseñas</h1>
        </div>
        <p className="text-slate-500 mb-8">Genera contraseñas seguras y aleatorias al instante.</p>

        <div className="space-y-6">
          {/* Config */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">

            {/* Longitud */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Longitud</label>
                <span className="text-sm font-bold text-green-600">{longitud} caracteres</span>
              </div>
              <input
                type="range" min={6} max={64} value={longitud}
                onChange={(e) => setLongitud(Number(e.target.value))}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>6</span><span>16</span><span>32</span><span>64</span>
              </div>
            </div>

            {/* Opciones */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">Incluir</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'mayusculas',  label: 'ABC Mayúsculas'      },
                  { key: 'minusculas',  label: 'abc Minúsculas'      },
                  { key: 'numeros',     label: '123 Números'         },
                  { key: 'simbolos',    label: '!@# Símbolos'        },
                  { key: 'sinAmbiguos', label: '👁 Sin ambiguos (0,O,l,1)' },
                ].map((op) => (
                  <button
                    key={op.key}
                    onClick={() => setOpciones((prev) => ({ ...prev, [op.key]: !prev[op.key as keyof typeof prev] }))}
                    className={cn(
                      'px-3 py-2.5 rounded-xl border-2 text-sm font-medium text-left transition-all',
                      opciones[op.key as keyof typeof opciones]
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-green-300'
                    )}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700 shrink-0">Cuántas generar</label>
              <div className="flex gap-2">
                {[1, 5, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCantidad(n)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all',
                      cantidad === n
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-green-300'
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generar}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Generar contraseñas
            </button>
          </div>

          {/* Resultados */}
          {contrasenas.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
              {contrasenas.map((pass, i) => {
                const fortaleza = calcularFortaleza(pass)
                return (
                  <div key={i} className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-slate-800 truncate">
                        {mostrar[i] ? pass : '•'.repeat(pass.length)}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full', fortaleza.color)}
                            style={{ width: `${(fortaleza.nivel / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 shrink-0">{fortaleza.label}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setMostrar((prev) => ({ ...prev, [i]: !prev[i] }))}
                      className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {mostrar[i] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copiar(pass, i)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:border-green-400 text-slate-500 hover:text-green-600 transition-all shrink-0"
                    >
                      <Copy className="w-3 h-3" />
                      {copiados[i] ? '✓' : 'Copiar'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}