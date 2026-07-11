'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularInflacion } from '../../lib/calculadoras/inflacion'
import { InflacionResultado } from '../../types'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { TooltipProps } from 'recharts';
import { AccionesResultado } from '../../components/ui/AccionesResultado'
import { generarMensajeInflacion } from '../../lib/whatsapp'
import { Breadcrumbs } from '../layout/Breadcrumbs'


const TASAS_REFERENCIA = [
  { label: 'México 2024', tasa: 4.7 },
  { label: 'México 2023', tasa: 5.5 },
  { label: 'Promedio 10a', tasa: 4.2 },
  { label: 'Alta (2022)', tasa: 8.7 },
]

const anioActual = new Date().getFullYear()

export function CalculadoraInflacion() {
  const [form, setForm] = useState({
    cantidad: '',
    anioInicio: String(anioActual),
    anioFin: String(anioActual + 10),
    tasaAnual: '4.7',
  })
  const [resultado, setResultado] = useState<InflacionResultado | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!form.cantidad || Number(form.cantidad) <= 0) e.cantidad = 'Ingresa una cantidad'
    if (!form.tasaAnual || Number(form.tasaAnual) <= 0) e.tasaAnual = 'Ingresa la tasa'
    if (Number(form.anioInicio) === Number(form.anioFin)) e.anioFin = 'Los años deben ser distintos'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    setResultado(calcularInflacion({
      cantidad: Number(form.cantidad),
      anioInicio: Number(form.anioInicio),
      anioFin: Number(form.anioFin),
      tasaAnual: Number(form.tasaAnual),
    }))
  }
  const customFormatter: TooltipProps['formatter'] = (value, name) => {
    return [formatCurrency(Number(value ?? 0)), name];
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs pagina='calculadora de inflacion'></Breadcrumbs>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Tasas de referencia */}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Tasas de referencia</p>
          <div className="flex flex-wrap gap-2">
            {TASAS_REFERENCIA.map((t) => (
              <button
                key={t.label}
                onClick={() => setForm({ ...form, tasaAnual: String(t.tasa) })}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-full hover:border-amber-400 hover:bg-amber-50 transition-all text-slate-600"
              >
                {t.label} · {t.tasa}%
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Cantidad" type="number" placeholder="10000" prefix="$"
            value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: e.target.value })} error={errors.cantidad} />
          <Input label="Tasa de inflación anual" type="number" placeholder="4.7" suffix="%"
            value={form.tasaAnual} onChange={(e) => setForm({ ...form, tasaAnual: e.target.value })} error={errors.tasaAnual} />
          <Input label="Año de inicio" type="number" placeholder={String(anioActual)}
            value={form.anioInicio} onChange={(e) => setForm({ ...form, anioInicio: e.target.value })} />
          <Input label="Año de fin" type="number" placeholder={String(anioActual + 10)}
            value={form.anioFin} onChange={(e) => setForm({ ...form, anioFin: e.target.value })} error={errors.anioFin} />
        </div>

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600">
          Calcular inflación
        </Button>
      </div>

      {resultado && (
        <>
          <AccionesResultado
            mensaje={generarMensajeInflacion({
              cantidad: Number(form.cantidad),
              anioInicio: Number(form.anioInicio),
              anioFin: Number(form.anioFin),
              tasaAnual: Number(form.tasaAnual),
              valorFuturo: resultado.valorFuturo,
              perdidaPoder: resultado.perdidaPoder,
              porcentajePerdida: resultado.porcentajePerdida,
            })}
            elementoId="resultado-inflacion"
            nombreArchivo="calculadora-inflacion"
          />
          <div className='space-y-8' id='resultado-inflacion'>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard
                label="Necesitarás en el futuro"
                value={formatCurrency(resultado.valorFuturo)}
                highlight
                sublabel="Para mantener el mismo poder adquisitivo"
              />
              <ResultCard
                label="Pérdida de poder adquisitivo"
                value={formatCurrency(resultado.perdidaPoder)}
                sublabel={`${formatNumber(resultado.porcentajePerdida)}% de inflación acumulada`}
              />
              <ResultCard
                label="Hoy equivale a"
                value={formatCurrency(resultado.valorPresente)}
                sublabel={`En ${form.anioInicio}`}
              />
            </div>

            {/* Gráfica */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-1">Evolución del valor</h3>
              <p className="text-sm text-slate-400 mb-6">
                Naranja = lo que necesitas · Gris = poder adquisitivo real
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={resultado.proyeccion}>
                  <defs>
                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="anio" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={customFormatter} />
                  <Legend />
                  <Area type="monotone" dataKey="valor" name="Necesitas" stroke="#f59e0b" fill="url(#colorValor)" strokeWidth={2} />
                  <Area type="monotone" dataKey="podAdquisitivo" name="Poder adquisitivo" stroke="#94a3b8" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}