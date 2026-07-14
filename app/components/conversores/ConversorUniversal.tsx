'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftRight }      from 'lucide-react'
import { CONVERSORES, convertir, CategoriaConversor } from '../../lib/conversores'
import { cn } from '../../lib/utils'

interface Props {
  categoriaId: string
}

export function ConversorUniversal({ categoriaId }: Props) {
  const categoria = CONVERSORES.find((c) => c.id === categoriaId)!
  const unidades  = Object.entries(categoria.unidades)

  const [de, setDe]         = useState(unidades[0][0])
  const [a, setA]           = useState(unidades[1][0])
  const [valor, setValor]   = useState('')
  const [resultado, setResultado] = useState<number | null>(null)

  // Recalcular automáticamente al cambiar cualquier input
  useEffect(() => {
    if (!valor || isNaN(Number(valor))) {
      setResultado(null)
      return
    }
    setResultado(convertir(Number(valor), de, a, categoria))
  }, [valor, de, a, categoria])

  function intercambiar() {
    setDe(a)
    setA(de)
    if (resultado !== null) setValor(String(resultado))
  }

  // Tabla de conversión para el valor actual
  const tablaConversiones = valor && !isNaN(Number(valor))
    ? unidades.map(([key, unidad]) => ({
        key,
        label:  unidad.label,
        valor:  convertir(Number(valor), de, key, categoria),
      }))
    : []

  return (
    <div className="space-y-6">

      {/* Conversor principal */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">

          {/* Columna origen */}
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-slate-700">De</label>
            <select
              value={de}
              onChange={(e) => setDe(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
            >
              {unidades.map(([key, u]) => (
                <option key={key} value={key}>{u.label}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Ingresa un valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-3 py-2.5 text-lg font-semibold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Botón intercambiar */}
          <button
            onClick={intercambiar}
            className="self-center p-3 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-all"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>

          {/* Columna destino */}
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-slate-700">A</label>
            <select
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
            >
              {unidades.map(([key, u]) => (
                <option key={key} value={key}>{u.label}</option>
              ))}
            </select>
            <div className={cn(
              'w-full px-3 py-2.5 text-lg font-bold rounded-lg border-2 min-h-[46px]',
              resultado !== null
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            )}>
              {resultado !== null
                ? Number.isInteger(resultado)
                  ? resultado.toLocaleString('es-MX')
                  : resultado.toLocaleString('es-MX', { maximumFractionDigits: 6 })
                : 'Resultado'
              }
            </div>
          </div>
        </div>

        {/* Resultado en texto */}
        {resultado !== null && valor && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-700 text-center font-medium">
            {valor} {categoria.unidades[de].label} =&nbsp;
            <strong>
              {resultado.toLocaleString('es-MX', { maximumFractionDigits: 6 })}&nbsp;
              {categoria.unidades[a].label}
            </strong>
          </div>
        )}
      </div>

      {/* Tabla de todas las conversiones */}
      {tablaConversiones.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">
            Tabla de conversión para {valor} {categoria.unidades[de].label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tablaConversiones.map((conv) => (
              <button
                key={conv.key}
                onClick={() => { setA(conv.key) }}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left',
                  conv.key === a
                    ? 'bg-blue-50 border-blue-300'
                    : conv.key === de
                    ? 'bg-slate-50 border-slate-200 opacity-50'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                )}
              >
                <span className="text-sm text-slate-600">{conv.label}</span>
                <span className="text-sm font-bold text-slate-800">
                  {conv.valor.toLocaleString('es-MX', { maximumFractionDigits: 6 })}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}