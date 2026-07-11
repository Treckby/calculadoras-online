'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Plus, Trash2, Zap } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularElectricidad, APARATOS_COMUNES } from '../../lib/calculadoras/electricidad'
import { Aparato, ElectricidadResultado } from '../../types'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { TooltipProps } from 'recharts';
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado }          from '../../components/ui/AccionesResultado'
import { generarMensajeElectricidad } from '../../lib/whatsapp'
import { Breadcrumbs } from '../../components/layout/Breadcrumbs'

const customFormatter: TooltipProps['formatter'] = (value) => [
  `${formatNumber(Number(value ?? 0))} kWh`,
  'Consumo mensual',
];
const BAR_COLORS = [
  '#3b82f6','#10b981','#f59e0b','#ef4444',
  '#8b5cf6','#06b6d4','#f97316','#84cc16',
]

function generarId() {
  return Math.random().toString(36).slice(2, 9)
}

export function CalculadoraElectricidad() {
  const [aparatos, setAparatos] = useState<Aparato[]>([
    { id: generarId(), nombre: 'Refrigerador',  potencia: 150,  horas: 24 },
    { id: generarId(), nombre: 'Televisor 40"', potencia: 80,   horas: 5 },
    { id: generarId(), nombre: 'Foco LED',       potencia: 10,   horas: 6 },
  ])
  const [tarifaKwh, setTarifaKwh] = useState('1.80')
  const [resultado, setResultado] = useState<ElectricidadResultado | null>(null)
  const [nuevoNombre, setNuevoNombre]   = useState('')
  const [nuevaPotencia, setNuevaPotencia] = useState('')
  const [nuevasHoras, setNuevasHoras]   = useState('')

  // ── Actualizar campo de un aparato existente ──
  function actualizarAparato(id: string, campo: keyof Aparato, valor: string) {
    setAparatos((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, [campo]: campo === 'nombre' ? valor : Number(valor) }
          : a
      )
    )
  }

  // ── Agregar aparato manual ──
  function agregarAparato() {
    if (!nuevoNombre || !nuevaPotencia || !nuevasHoras) return
    setAparatos((prev) => [
      ...prev,
      {
        id: generarId(),
        nombre:   nuevoNombre,
        potencia: Number(nuevaPotencia),
        horas:    Number(nuevasHoras),
      },
    ])
    setNuevoNombre('')
    setNuevaPotencia('')
    setNuevasHoras('')
  }

  // ── Agregar aparato desde lista rápida ──
  function agregarDesdelista(nombre: string, potencia: number) {
    setAparatos((prev) => [
      ...prev,
      { id: generarId(), nombre, potencia, horas: 4 },
    ])
  }

  function eliminarAparato(id: string) {
    setAparatos((prev) => prev.filter((a) => a.id !== id))
  }

  function calcular() {
    if (aparatos.length === 0 || !tarifaKwh) return
    setResultado(calcularElectricidad(aparatos, Number(tarifaKwh)))
  }

  // Aparatos ordenados por consumo para la gráfica
  const datosGrafica = resultado
    ? [...resultado.aparatos]
        .sort((a, b) => b.kwhMes - a.kwhMes)
        .slice(0, 8)
        .map((a) => ({ name: a.nombre, kWh: parseFloat(a.kwhMes.toFixed(2)) }))
    : []

  return (
    <div className="space-y-8">
      <Breadcrumbs pagina='calculadora de electricidad'></Breadcrumbs>
      <RegistrarVisita pagina="calculadora-electricidad" />

      {/* ── Tarifa CFE ── */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-yellow-800 text-sm">Tarifa por kWh (CFE)</p>
          <p className="text-yellow-600 text-xs mt-0.5">
            Tarifa doméstica DAC aprox. $3.80 · Tarifa 1 aprox. $0.80–$1.80 MXN
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Input
            label=""
            type="number"
            placeholder="1.80"
            prefix="$"
            suffix="/ kWh"
            value={tarifaKwh}
            onChange={(e) => setTarifaKwh(e.target.value)}
          />
        </div>
      </div>

      {/* ── Lista de aparatos ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 text-lg mb-4">Tus aparatos eléctricos</h2>

        {/* Encabezados */}
        <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium text-slate-400 mb-2 px-1">
          <span className="col-span-5">Aparato</span>
          <span className="col-span-3">Potencia (W)</span>
          <span className="col-span-3">Horas/día</span>
          <span className="col-span-1"></span>
        </div>

        {/* Filas */}
        <div className="space-y-2">
          {aparatos.map((a) => (
            <div key={a.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-12 sm:col-span-5">
                <input
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                  value={a.nombre}
                  onChange={(e) => actualizarAparato(a.id, 'nombre', e.target.value)}
                  placeholder="Nombre"
                />
              </div>
              <div className="col-span-5 sm:col-span-3">
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                  value={a.potencia}
                  onChange={(e) => actualizarAparato(a.id, 'potencia', e.target.value)}
                  placeholder="Watts"
                />
              </div>
              <div className="col-span-5 sm:col-span-3">
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                  value={a.horas}
                  onChange={(e) => actualizarAparato(a.id, 'horas', e.target.value)}
                  placeholder="Horas"
                />
              </div>
              <div className="col-span-2 sm:col-span-1 flex justify-end">
                <button
                  onClick={() => eliminarAparato(a.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agregar aparato manual */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Agregar aparato</p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 sm:col-span-5">
              <input
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Nombre del aparato"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
            </div>
            <div className="col-span-5 sm:col-span-3">
              <input
                type="number"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Watts"
                value={nuevaPotencia}
                onChange={(e) => setNuevaPotencia(e.target.value)}
              />
            </div>
            <div className="col-span-5 sm:col-span-3">
              <input
                type="number"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Horas/día"
                value={nuevasHoras}
                onChange={(e) => setNuevasHoras(e.target.value)}
              />
            </div>
            <div className="col-span-2 sm:col-span-1 flex justify-end">
              <button
                onClick={agregarAparato}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Aparatos rápidos */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Agregar rápido</p>
          <div className="flex flex-wrap gap-2">
            {APARATOS_COMUNES.map((a) => (
              <button
                key={a.nombre}
                onClick={() => agregarDesdelista(a.nombre, a.potencia)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs border border-slate-200 rounded-full hover:border-yellow-400 hover:bg-yellow-50 transition-all text-slate-600"
              >
                <Zap className="w-3 h-3 text-yellow-500" />
                {a.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={calcular}
            size="lg"
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600"
          >
            Calcular consumo
          </Button>
        </div>
      </div>

      {/* ── Resultados ── */}
      {resultado && (
        <>
            <AccionesResultado
      mensaje={generarMensajeElectricidad({
        totalKwhMes: resultado.totalKwhMes,
        costoMes:    resultado.costoMes,
        costoAnual:  resultado.costoAnual,
        tarifaKwh:   Number(tarifaKwh),
      })}
      elementoId="resultado-electricidad"
      nombreArchivo="consumo-electrico"
    />

<div className='space-y-8' id="resultado-electricidad">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResultCard
              label="Costo mensual"
              value={formatCurrency(resultado.costoMes)}
              highlight
              sublabel="Estimado CFE"
            />
            <ResultCard
              label="Costo anual"
              value={formatCurrency(resultado.costoAnual)}
              sublabel="Proyección 12 meses"
            />
            <ResultCard
              label="Consumo mensual"
              value={`${formatNumber(resultado.totalKwhMes)} kWh`}
              sublabel="Kilowatts hora"
            />
            <ResultCard
              label="Consumo diario"
              value={`${formatNumber(resultado.totalKwhDia)} kWh`}
              sublabel="Promedio por día"
            />
          </div>

          {/* Gráfica */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-1">Consumo por aparato</h3>
            <p className="text-sm text-slate-400 mb-6">kWh mensuales — top 8 aparatos</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={datosGrafica} layout="vertical" barSize={18}>
                <XAxis type="number" tick={{ fontSize: 11 }} unit=" kWh" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={130} />
               <Tooltip formatter={customFormatter} />
                <Bar dataKey="kWh" radius={[0, 6, 6, 0]}>
                  {datosGrafica.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla detalle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Detalle por aparato</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['Aparato', 'Watts', 'Horas/día', 'kWh/mes', 'Costo/mes', '% del total'].map((h) => (
                      <th key={h} className="text-left py-3 px-2 text-slate-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultado.aparatos
                    .sort((a, b) => b.kwhMes - a.kwhMes)
                    .map((a) => (
                      <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-2 px-2 font-medium text-slate-700">{a.nombre}</td>
                        <td className="py-2 px-2 text-slate-500">{a.potencia}W</td>
                        <td className="py-2 px-2 text-slate-500">{a.horas}h</td>
                        <td className="py-2 px-2 text-slate-600">{formatNumber(a.kwhMes)}</td>
                        <td className="py-2 px-2 text-yellow-600 font-medium">{formatCurrency(a.costoMes)}</td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${a.porcentaje}%` }}
                              />
                            </div>
                            <span className="text-slate-500 text-xs w-10">{a.porcentaje}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}