'use client'

import { useState } from 'react'
import { ResultCard } from '../../components/ui/ResultCard'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { calcularIva } from '../../lib/calculadoras/iva'
import { IvaResultado, OperacionIva } from '../../types'
import { formatCurrency } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado } from '../../components/ui/AccionesResultado'
import { generarMensajeIva } from '../../lib/whatsapp'

const OPERACIONES: { value: OperacionIva; label: string; desc: string }[] = [
  { value: 'agregar',   label: '➕ Agregar IVA',  desc: 'Tengo precio sin IVA' },
  { value: 'quitar',    label: '➖ Quitar IVA',   desc: 'Tengo precio con IVA' },
  { value: 'calcular',  label: '🔢 Solo el IVA',  desc: 'Cuánto es el IVA' },
]

const PORCENTAJES = [8, 16]   // 8% frontera, 16% general México

export function CalculadoraIva() {
  const [form, setForm] = useState({
    monto:       '',
    porcentaje:  '16',
    operacion:   'agregar' as OperacionIva,
  })
  const [resultado, setResultado] = useState<IvaResultado | null>(null)
  const [error, setError]         = useState('')

  function calcular() {
    if (!form.monto || Number(form.monto) <= 0) {
      setError('Ingresa un monto válido')
      return
    }
    setError('')
    setResultado(
      calcularIva({
        monto:      Number(form.monto),
        porcentaje: Number(form.porcentaje),
        operacion:  form.operacion,
      })
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <h2 className="font-bold text-slate-800 text-lg">¿Qué quieres hacer?</h2>

        {/* Operación */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {OPERACIONES.map((o) => (
            <button
              key={o.value}
              onClick={() => { setForm({ ...form, operacion: o.value }); setResultado(null) }}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
                form.operacion === o.value
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'border-slate-200 hover:border-violet-300'
              )}
            >
              <p className={cn('text-sm font-bold', form.operacion === o.value ? 'text-white' : 'text-slate-700')}>
                {o.label}
              </p>
              <p className={cn('text-xs mt-1', form.operacion === o.value ? 'text-violet-200' : 'text-slate-400')}>
                {o.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Porcentaje IVA */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tasa de IVA</p>
          <div className="flex gap-3">
            {PORCENTAJES.map((p) => (
              <button
                key={p}
                onClick={() => setForm({ ...form, porcentaje: String(p) })}
                className={cn(
                  'px-5 py-2 rounded-lg border-2 text-sm font-semibold transition-all',
                  form.porcentaje === String(p)
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-violet-300'
                )}
              >
                {p}%
              </button>
            ))}
            <input
              type="number"
              placeholder="Otro %"
              value={![8, 16].includes(Number(form.porcentaje)) ? form.porcentaje : ''}
              onChange={(e) => setForm({ ...form, porcentaje: e.target.value })}
              className="w-24 px-3 py-2 text-sm border-2 border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>

        {/* Monto */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Input
              label={
                form.operacion === 'agregar' ? 'Precio sin IVA'
                : form.operacion === 'quitar' ? 'Precio con IVA'
                : 'Monto base'
              }
              type="number"
              placeholder="1000"
              prefix="$"
              value={form.monto}
              onChange={(e) => setForm({ ...form, monto: e.target.value })}
              error={error}
            />
          </div>
          <Button onClick={calcular} size="lg" className="bg-violet-600 hover:bg-violet-700 w-full sm:w-auto">
            Calcular
          </Button>
        </div>
      </div>

      {/* Resultado */}
      {resultado && (
        <>
            <AccionesResultado
      mensaje={generarMensajeIva({
        montoOriginal: resultado.montoOriginal,
        montoIva:      resultado.montoIva,
        montoFinal:    resultado.montoFinal,
        porcentaje:    resultado.porcentaje,
      })}
      elementoId="resultado-iva"
      nombreArchivo="calculadora-iva"
    />
<div className='space-y-8' id="resultado-iva">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            label="Precio sin IVA"
            value={formatCurrency(resultado.montoOriginal)}
            sublabel="Base gravable"
          />
          <ResultCard
            label={`IVA (${resultado.porcentaje}%)`}
            value={formatCurrency(resultado.montoIva)}
            sublabel="Impuesto al valor agregado"
          />
          <ResultCard
            label="Precio con IVA"
            value={formatCurrency(resultado.montoFinal)}
            highlight
            sublabel="Total a pagar"
          />
        </div>
        </div>
        </>
      )}
    </div>
  )
}