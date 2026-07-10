'use client'

import { useState } from 'react'
import { CalendarDays, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularFechas, hoy } from '../../lib/calculadoras/fechas'
import { FechasResultado } from '../../types'
import { cn } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'

const FECHAS_RAPIDAS = [
  { label: 'Año nuevo',       fecha: `${new Date().getFullYear() + 1}-01-01` },
  { label: 'Navidad',         fecha: `${new Date().getFullYear()}-12-25` },
  { label: 'Día del trabajo', fecha: `${new Date().getFullYear()}-05-01` },
  { label: 'Independencia',   fecha: `${new Date().getFullYear()}-09-16` },
]

export function CalculadoraFechas() {
  const [inicio, setInicio]       = useState(hoy())
  const [fin, setFin]             = useState('')
  const [resultado, setResultado] = useState<FechasResultado | null>(null)
  const [error, setError]         = useState('')

  function calcular() {
    if (!inicio || !fin) { setError('Selecciona ambas fechas'); return }
    setError('')
    setResultado(calcularFechas({ fechaInicio: inicio, fechaFin: fin }))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Inputs de fecha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Fecha de inicio</label>
            <input
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Fecha de fin</label>
            <input
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
            />
          </div>
        </div>

        {/* Fechas rápidas */}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Fechas especiales</p>
          <div className="flex flex-wrap gap-2">
            {FECHAS_RAPIDAS.map((f) => (
              <button
                key={f.label}
                onClick={() => setFin(f.fecha)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-full hover:border-teal-400 hover:bg-teal-50 transition-all text-slate-600"
              >
                <CalendarDays className="w-3 h-3 text-teal-500" />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          onClick={calcular}
          size="lg"
          className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600"
        >
          Calcular diferencia
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
          {/* Banner */}
          <div className={cn(
            'rounded-2xl p-6 text-center text-white',
            resultado.esFuturo ? 'bg-teal-500' : 'bg-slate-600'
          )}>
            <p className={cn('text-sm mb-1', resultado.esFuturo ? 'text-teal-100' : 'text-slate-300')}>
              {resultado.esFuturo ? '⏳ Faltan' : '⏪ Hace'}
            </p>
            <p className="text-5xl font-bold">{resultado.dias}</p>
            <p className={cn('mt-1', resultado.esFuturo ? 'text-teal-100' : 'text-slate-300')}>
              días
            </p>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResultCard label="Semanas"      value={`${resultado.semanas}`}    sublabel="semanas" />
            <ResultCard label="Meses"        value={`${resultado.meses}`}      sublabel="meses aprox." />
            <ResultCard label="Años"         value={`${resultado.anios}`}      sublabel="años aprox." />
            <ResultCard label="Días hábiles" value={`${resultado.diasHabiles}`} sublabel="lunes a viernes" />
          </div>

          {/* Desglose */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Desglose</h3>
            <div className="space-y-3">
              {[
                { label: 'Días hábiles',  value: resultado.diasHabiles, color: 'bg-teal-500' },
                { label: 'Fines de semana', value: resultado.fines,     color: 'bg-slate-300' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-700">{item.value} días</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', item.color)}
                      style={{ width: `${(item.value / resultado.dias) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ResultadoExportable>
        </>
      )}
    </div>
  )
}