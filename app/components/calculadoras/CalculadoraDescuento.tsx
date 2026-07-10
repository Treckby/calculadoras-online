'use client'

import { useState } from 'react'
import { Tag } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularDescuento } from '../../lib/calculadoras/descuento'
import { DescuentoResultado } from '../../types'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'

const DESCUENTOS_RAPIDOS = [5, 10, 15, 20, 25, 30, 50, 70]

export function CalculadoraDescuento() {
  const [precio, setPrecio]         = useState('')
  const [descuento, setDescuento]   = useState('')
  const [esPorcentaje, setEsPorcentaje] = useState(true)
  const [resultado, setResultado]   = useState<DescuentoResultado | null>(null)
  const [errors, setErrors]         = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!precio   || Number(precio)   <= 0) e.precio   = 'Ingresa el precio original'
    if (!descuento || Number(descuento) < 0) e.descuento = 'Ingresa el descuento'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    setResultado(
      calcularDescuento({
        precioOriginal: Number(precio),
        descuento:      Number(descuento),
        esProcentaje:   esPorcentaje,
      })
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Tipo de descuento */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tipo de descuento</p>
          <div className="flex gap-3">
            {[
              { label: '% Porcentaje', value: true },
              { label: '$ Cantidad fija', value: false },
            ].map((t) => (
              <button
                key={String(t.value)}
                onClick={() => { setEsPorcentaje(t.value); setDescuento(''); setResultado(null) }}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all',
                  esPorcentaje === t.value
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Descuentos rápidos — solo en modo porcentaje */}
        {esPorcentaje && (
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Descuentos rápidos</p>
            <div className="flex flex-wrap gap-2">
              {DESCUENTOS_RAPIDOS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDescuento(String(d))}
                  className={cn(
                    'px-3 py-1.5 rounded-full border text-xs font-semibold transition-all',
                    descuento === String(d)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-emerald-400'
                  )}
                >
                  -{d}%
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Precio original"
            type="number"
            placeholder="1000"
            prefix="$"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            error={errors.precio}
          />
          <Input
            label={esPorcentaje ? 'Descuento' : 'Cantidad a descontar'}
            type="number"
            placeholder={esPorcentaje ? '20' : '200'}
            suffix={esPorcentaje ? '%' : 'MXN'}
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            error={errors.descuento}
          />
        </div>

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600">
          Calcular descuento
        </Button>
      </div>

      {/* Resultado */}
      {resultado && (
        <>
                  <ResultadoExportable 

            id="resultado-prestamo"
            nombreArchivo="calculadora-prestamos"
            titulo="Calculadora de Préstamos"
            mostrar={!!resultado}

          >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              label="Precio original"
              value={formatCurrency(resultado.precioOriginal)}
              sublabel="Sin descuento"
            />
            <ResultCard
              label="Ahorras"
              value={formatCurrency(resultado.montoDescuento)}
              sublabel={`${formatNumber(resultado.porcentajeAhorro)}% de descuento`}
            />
            <ResultCard
              label="Precio final"
              value={formatCurrency(resultado.precioFinal)}
              highlight
              sublabel="Lo que pagarás"
            />
          </div>

          {/* Barra visual de ahorro */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Porcentaje de ahorro</span>
              <span className="font-bold text-emerald-600">{formatNumber(resultado.porcentajeAhorro)}%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(resultado.porcentajeAhorro, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>{formatCurrency(resultado.precioFinal)} pagas</span>
              <span>{formatCurrency(resultado.montoDescuento)} ahorras</span>
            </div>
          </div>
          </ResultadoExportable>
        </>
      )}
    </div>
  )
}