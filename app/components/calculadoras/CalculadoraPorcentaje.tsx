'use client'

import { useState } from 'react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularPorcentaje } from '../../lib/calculadoras/porcentaje'
import { OperacionPorcentaje, PorcentajeResultado } from '../../types'
import { formatNumber } from '../../lib/utils'
import { cn } from '../../lib/utils'

const OPERACIONES: {
  value: OperacionPorcentaje
  label: string
  labelA: string
  labelB: string
  placeholderA: string
  placeholderB: string
  sufA?: string
  sufB?: string
}[] = [
  {
    value:        'porcentaje_de',
    label:        '¿Cuánto es X% de Y?',
    labelA:       'Porcentaje (X)',
    labelB:       'Valor total (Y)',
    placeholderA: '20',
    placeholderB: '500',
    sufA:         '%',
  },
  {
    value:        'que_porcentaje',
    label:        '¿X es qué % de Y?',
    labelA:       'Valor parcial (X)',
    labelB:       'Valor total (Y)',
    placeholderA: '150',
    placeholderB: '600',
  },
  {
    value:        'aumento',
    label:        'Aumentar valor un X%',
    labelA:       'Porcentaje de aumento',
    labelB:       'Valor original',
    placeholderA: '15',
    placeholderB: '1000',
    sufA:         '%',
  },
  {
    value:        'disminucion',
    label:        'Disminuir valor un X%',
    labelA:       'Porcentaje de disminución',
    labelB:       'Valor original',
    placeholderA: '10',
    placeholderB: '800',
    sufA:         '%',
  },
  {
    value:        'variacion',
    label:        '¿Cuánto cambió de X a Y?',
    labelA:       'Valor inicial (X)',
    labelB:       'Valor final (Y)',
    placeholderA: '200',
    placeholderB: '250',
  },
]

export function CalculadoraPorcentaje() {
  const [operacion, setOperacion] = useState<OperacionPorcentaje>('porcentaje_de')
  const [valorA, setValorA]       = useState('')
  const [valorB, setValorB]       = useState('')
  const [resultado, setResultado] = useState<PorcentajeResultado | null>(null)
  const [errors, setErrors]       = useState<Record<string, string>>({})

  const opActual = OPERACIONES.find((o) => o.value === operacion)!

  function validar() {
    const e: Record<string, string> = {}
    if (!valorA || isNaN(Number(valorA))) e.valorA = 'Ingresa un valor válido'
    if (!valorB || isNaN(Number(valorB))) e.valorB = 'Ingresa un valor válido'
    if (operacion === 'que_porcentaje' && Number(valorB) === 0) e.valorB = 'No puede ser 0'
    if (operacion === 'variacion'      && Number(valorA) === 0) e.valorA = 'No puede ser 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    setResultado(
      calcularPorcentaje({
        operacion,
        valorA: Number(valorA),
        valorB: Number(valorB),
      })
    )
  }

  function cambiarOperacion(op: OperacionPorcentaje) {
    setOperacion(op)
    setValorA('')
    setValorB('')
    setResultado(null)
    setErrors({})
  }

  const esVariacion   = operacion === 'variacion'
  const esPorcentaje  = operacion === 'que_porcentaje' || operacion === 'variacion'

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Selector de operación */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-3">¿Qué quieres calcular?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OPERACIONES.map((op) => (
              <button
                key={op.value}
                onClick={() => cambiarOperacion(op.value)}
                className={cn(
                  'px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all',
                  operacion === op.value
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                )}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs dinámicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={opActual.labelA}
            type="number"
            placeholder={opActual.placeholderA}
            suffix={opActual.sufA}
            value={valorA}
            onChange={(e) => setValorA(e.target.value)}
            error={errors.valorA}
          />
          <Input
            label={opActual.labelB}
            type="number"
            placeholder={opActual.placeholderB}
            suffix={opActual.sufB}
            value={valorB}
            onChange={(e) => setValorB(e.target.value)}
            error={errors.valorB}
          />
        </div>

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
          Calcular
        </Button>
      </div>

      {resultado && (
        <div className="space-y-4">
          <ResultCard
            label={resultado.descripcion}
            value={`${formatNumber(resultado.resultado)}${esPorcentaje ? '%' : ''}`}
            highlight
            sublabel={resultado.formula}
          />
        </div>
      )}
    </div>
  )
}