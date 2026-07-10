'use client'

import { useState } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularFechas, formatearFecha } from '../../lib/calculadoras/fechas'
import { FechasResultado } from '../../types'
import { formatNumber } from '../../lib/utils'

export function CalculadoraFechas() {
  const hoy           = new Date().toISOString().split('T')[0]
  const [inicio, setInicio] = useState(hoy)
  const [fin, setFin]       = useState(hoy)
  const [resultado, setResultado] = useState<FechasResultado | null>(null)
  const [error, setError]         = useState('')

  function calcular() {
    if (!inicio || !fin) { setError('Selecciona ambas fechas'); return }
    if (inicio === fin)  { setError('Las fechas deben ser diferentes'); return }
    setError('')
    setResultado(calcularFechas({ fechaInicio: inicio, fechaFin: fin }))
  }

  function usarHoy(campo: 'inicio' | 'fin') {
    if (campo === 'inicio') setInicio(hoy)
    else setFin(hoy)
    setResultado(null)
  }

  const FECHAS_RAPIDAS = [
    { label: '+ 1 semana',  dias: 7 },
    { label: '+ 1 mes',     dias: 30 },
    { label: '+ 3 meses',   dias: 90 },
    { label: '+ 6 meses',   dias: 180 },
    { label: '+ 1 año',     dias: 365 },
  ]

  function agregarDias(dias: number) {
    const fecha = new Date(inicio)
    fecha.setDate(fecha.getDate() + dias)
    setFin(fecha.toISOString().split('T')[0])
    setResultado(null)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Fechas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Fecha inicio</label>
              <button onClick={() => usarHoy('inicio')} className="text-xs text-blue-500 hover:text-blue-600">
                Hoy
              </button>
            </div>
            <input
              type="date"
              value={inicio}
              onChange={(e) => { setInicio(e.target.value); setResultado(null) }}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
            />
            {inicio && (
              <p className="text-xs text-slate-400 mt-1 capitalize">{formatearFecha(inicio)}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Fecha fin</label>
              <button onClick={() => usarHoy('fin')} className="text-xs text-blue-500 hover:text-blue-600">
                Hoy
              </button>
            </div>
            <input
              type="date"
              value={fin}
              onChange={(e) => { setFin(e.target.value); setResultado(null) }}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
            />
            {fin && (
              <p className="text-xs text-slate-400 mt-1 capitalize">{formatearFecha(fin)}</p>
            )}
          </div>
        </div>

        {/* Fechas rápidas */}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Agregar desde la fecha inicio</p>
          <div className="flex flex-wrap gap-2"></div>