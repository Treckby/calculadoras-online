'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularPropina } from '../../lib/calculadoras/propina'
import { PropinaResultado } from '../../types'
import { formatCurrency } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado }    from '../../components/ui/AccionesResultado'
import { generarMensajePropina } from '../../lib/whatsapp'

const PORCENTAJES_RAPIDOS = [10, 15, 18, 20, 25]

export function CalculadoraPropina() {
  const [cuenta, setCuenta]         = useState('')
  const [porcentaje, setPorcentaje] = useState(15)
  const [personas, setPersonas]     = useState(1)
  const [resultado, setResultado]   = useState<PropinaResultado | null>(null)
  const [error, setError]           = useState('')

  function calcular() {
    if (!cuenta || Number(cuenta) <= 0) {
      setError('Ingresa el total de la cuenta')
      return
    }
    setError('')
    setResultado(
      calcularPropina({
        totalCuenta:       Number(cuenta),
        porcentajePropina: porcentaje,
        numPersonas:       personas,
      })
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Total cuenta */}
        <Input
          label="Total de la cuenta"
          type="number"
          placeholder="500"
          prefix="$"
          value={cuenta}
          onChange={(e) => setCuenta(e.target.value)}
          error={error}
        />

        {/* Porcentaje propina */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">
            Propina — <span className="text-pink-600 font-bold">{porcentaje}%</span>
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {PORCENTAJES_RAPIDOS.map((p) => (
              <button
                key={p}
                onClick={() => setPorcentaje(p)}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all',
                  porcentaje === p
                    ? 'bg-pink-500 border-pink-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-pink-300'
                )}
              >
                {p}%
              </button>
            ))}
          </div>
          {/* Slider */}
          <input
            type="range"
            min={0}
            max={30}
            value={porcentaje}
            onChange={(e) => setPorcentaje(Number(e.target.value))}
            className="w-full accent-pink-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0%</span>
            <span>15%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Número de personas */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Número de personas</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPersonas((p) => Math.max(1, p - 1))}
              className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center hover:border-pink-400 transition-all"
            >
              <Minus className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-3xl font-bold text-slate-800 w-12 text-center">
              {personas}
            </span>
            <button
              onClick={() => setPersonas((p) => p + 1)}
              className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center hover:border-pink-400 transition-all"
            >
              <Plus className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-slate-500 text-sm">
              {personas === 1 ? 'persona' : 'personas'}
            </span>
          </div>
        </div>

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600">
          Calcular propina
        </Button>
      </div>

      {/* Resultados */}
      {resultado && (
        <>
            <AccionesResultado
      mensaje={generarMensajePropina({
        totalCuenta:     Number(cuenta),
        porcentaje:      porcentaje,
        montoPropina:    resultado.montoPropina,
        totalConPropina: resultado.totalConPropina,
        personas:        personas,
        porPersona:      resultado.porPersona,
      })}
      elementoId="resultado-propina"
      nombreArchivo="calculadora-propina"
    />
<div className='space-y-8' id='resultado-propina'>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              label="Propina"
              value={formatCurrency(resultado.montoPropina)}
              sublabel={`${porcentaje}% de la cuenta`}
            />
            <ResultCard
              label="Total con propina"
              value={formatCurrency(resultado.totalConPropina)}
              highlight
              sublabel="Lo que pagarán en total"
            />
            <ResultCard
              label="Por persona"
              value={formatCurrency(resultado.porPersona)}
              sublabel={`Incluye $${resultado.propinaPersona.toFixed(2)} de propina`}
            />
          </div>

          {/* Desglose por persona */}
          {personas > 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Desglose por persona</h3>
              <div className="space-y-3">
                {[
                  { label: 'Cuenta dividida',  value: resultado.cuentaPersona,  color: 'bg-slate-400' },
                  { label: 'Propina',           value: resultado.propinaPersona, color: 'bg-pink-400' },
                  { label: 'Total por persona', value: resultado.porPersona,     color: 'bg-pink-600' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-3 h-3 rounded-full', item.color)} />
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </>
      )}
    </div>
  )
}