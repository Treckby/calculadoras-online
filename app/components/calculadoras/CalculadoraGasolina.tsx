'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'
import { Fuel, TrendingDown } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularGasolina, PRECIOS_REFERENCIA } from '../../lib/calculadoras/gasolina'
import { GasolinaResultado, TipoGasolina, TipoRuta } from '../../types'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { TooltipProps } from 'recharts';
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado }      from '../../components/ui/AccionesResultado'
import { generarMensajeGasolina } from '../../lib/whatsapp'

const customFormatter: TooltipProps['formatter'] = (value, name) => [
  formatCurrency(Number(value ?? 0)),
  'Costo mensual',
];

const TIPOS_GASOLINA: { value: TipoGasolina; label: string; color: string }[] = [
  { value: 'magna',   label: '⛽ Magna',   color: 'border-green-500 bg-green-50 text-green-700' },
  { value: 'premium', label: '⭐ Premium', color: 'border-red-500 bg-red-50 text-red-700' },
  { value: 'diesel',  label: '🚛 Diésel',  color: 'border-slate-500 bg-slate-100 text-slate-700' },
]

const TIPOS_RUTA: { value: TipoRuta; label: string; desc: string }[] = [
  { value: 'ciudad',    label: '🏙 Ciudad',    desc: 'Tráfico, semáforos' },
  { value: 'mixto',     label: '🔀 Mixto',     desc: 'Ciudad + carretera' },
  { value: 'carretera', label: '🛣 Carretera', desc: 'Velocidad constante' },
]

// Rendimientos típicos por tipo de auto para referencia rápida
const AUTOS_REFERENCIA = [
  { nombre: 'Sedan compacto',   rendimiento: 14 },
  { nombre: 'SUV mediana',      rendimiento: 10 },
  { nombre: 'Pickup',           rendimiento: 8  },
  { nombre: 'Auto eléctrico',   rendimiento: 0  },
  { nombre: 'Moto',             rendimiento: 25 },
  { nombre: 'Taxi / Uber',      rendimiento: 11 },
]

export function CalculadoraGasolina() {
  const [form, setForm] = useState({
    distanciaKm:    '',
    rendimientoKml: '',
    tipoGasolina:   'magna' as TipoGasolina,
    precioLitro:    String(PRECIOS_REFERENCIA.magna),
    tipoRuta:       'mixto' as TipoRuta,
    viajesAlMes:    '',
  })
  const [resultado, setResultado]   = useState<GasolinaResultado | null>(null)
  const [errors, setErrors]         = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!form.distanciaKm    || Number(form.distanciaKm)    <= 0) e.distanciaKm    = 'Ingresa la distancia'
    if (!form.rendimientoKml || Number(form.rendimientoKml) <= 0) e.rendimientoKml = 'Ingresa el rendimiento'
    if (!form.precioLitro    || Number(form.precioLitro)    <= 0) e.precioLitro    = 'Ingresa el precio'
    if (!form.viajesAlMes    || Number(form.viajesAlMes)    <= 0) e.viajesAlMes    = 'Ingresa los viajes al mes'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    setResultado(
      calcularGasolina({
        distanciaKm:    Number(form.distanciaKm),
        rendimientoKml: Number(form.rendimientoKml),
        tipoGasolina:   form.tipoGasolina,
        precioLitro:    Number(form.precioLitro),
        tipoRuta:       form.tipoRuta,
        viajesAlMes:    Number(form.viajesAlMes),
      })
    )
  }

  // Cambiar tipo de gasolina y actualizar precio de referencia
  function cambiarGasolina(tipo: TipoGasolina) {
    setForm({
      ...form,
      tipoGasolina: tipo,
      precioLitro:  String(PRECIOS_REFERENCIA[tipo]),
    })
  }

  // Datos para comparar los 3 meses con distintos rendimientos
  const datosComparativa = resultado
    ? [
        { name: 'Rendimiento -20%', costo: parseFloat(((Number(form.distanciaKm) / (Number(form.rendimientoKml) * 0.8)) * Number(form.precioLitro) * Number(form.viajesAlMes)).toFixed(2)) },
        { name: 'Tu auto',          costo: resultado.costoMes },
        { name: 'Rendimiento +20%', costo: parseFloat(((Number(form.distanciaKm) / (Number(form.rendimientoKml) * 1.2)) * Number(form.precioLitro) * Number(form.viajesAlMes)).toFixed(2)) },
      ]
    : []

  return (
    <div className="space-y-8">
<RegistrarVisita pagina="calculadora-gasolina" />
      {/* ── Formulario ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <h2 className="font-bold text-slate-800 text-lg">Datos de tu auto y ruta</h2>

        {/* Tipo de gasolina */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tipo de combustible</p>
          <div className="flex flex-wrap gap-3">
            {TIPOS_GASOLINA.map((t) => (
              <button
                key={t.value}
                onClick={() => cambiarGasolina(t.value)}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                  form.tipoGasolina === t.value
                    ? t.color
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de ruta */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tipo de ruta</p>
          <div className="grid grid-cols-3 gap-2">
            {TIPOS_RUTA.map((r) => (
              <button
                key={r.value}
                onClick={() => setForm({ ...form, tipoRuta: r.value })}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  form.tipoRuta === r.value
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-slate-200 hover:border-rose-300'
                )}
              >
                <p className={cn('text-sm font-semibold', form.tipoRuta === r.value ? 'text-white' : 'text-slate-700')}>
                  {r.label}
                </p>
                <p className={cn('text-xs mt-0.5', form.tipoRuta === r.value ? 'text-rose-100' : 'text-slate-400')}>
                  {r.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Campos numéricos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Distancia por viaje"
            type="number"
            placeholder="25"
            suffix="km"
            value={form.distanciaKm}
            onChange={(e) => setForm({ ...form, distanciaKm: e.target.value })}
            error={errors.distanciaKm}
          />
          <Input
            label="Rendimiento de tu auto"
            type="number"
            placeholder="12"
            suffix="km/L"
            value={form.rendimientoKml}
            onChange={(e) => setForm({ ...form, rendimientoKml: e.target.value })}
            error={errors.rendimientoKml}
          />
          <Input
            label="Precio por litro"
            type="number"
            placeholder="20.50"
            prefix="$"
            value={form.precioLitro}
            onChange={(e) => setForm({ ...form, precioLitro: e.target.value })}
            error={errors.precioLitro}
          />
          <Input
            label="Viajes al mes"
            type="number"
            placeholder="40"
            suffix="viajes"
            value={form.viajesAlMes}
            onChange={(e) => setForm({ ...form, viajesAlMes: e.target.value })}
            error={errors.viajesAlMes}
          />
        </div>

        {/* Referencia rápida de rendimientos */}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">Referencia rápida — km/L típicos</p>
          <div className="flex flex-wrap gap-2">
            {AUTOS_REFERENCIA.filter(a => a.rendimiento > 0).map((a) => (
              <button
                key={a.nombre}
                onClick={() => setForm({ ...form, rendimientoKml: String(a.rendimiento) })}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-full hover:border-rose-400 hover:bg-rose-50 transition-all text-slate-600"
              >
                <Fuel className="w-3 h-3 text-rose-400" />
                {a.nombre} · {a.rendimiento} km/L
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={calcular}
          size="lg"
          className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600"
        >
          Calcular gasto
        </Button>
      </div>

      {/* ── Resultados ── */}
      {resultado && (
        <>
            <AccionesResultado
      mensaje={generarMensajeGasolina({
        distanciaKm:    Number(form.distanciaKm),
        rendimientoKml: Number(form.rendimientoKml),
        tipoGasolina:   form.tipoGasolina,
        costoViaje:     resultado.costoViaje,
        costoMes:       resultado.costoMes,
        costoAnual:     resultado.costoAnual,
        litrosMes:      resultado.litrosMes,
      })}
      elementoId="resultado-gasolina"
      nombreArchivo="calculadora-gasolina"
    />
<div className='space-y-8' id="resultado-gasolina">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResultCard
              label="Costo por viaje"
              value={formatCurrency(resultado.costoViaje)}
              highlight
              sublabel={`${formatNumber(resultado.litrosViaje)} L por viaje`}
            />
            <ResultCard
              label="Gasto mensual"
              value={formatCurrency(resultado.costoMes)}
              sublabel={`${formatNumber(resultado.litrosMes)} L al mes`}
            />
            <ResultCard
              label="Gasto anual"
              value={formatCurrency(resultado.costoAnual)}
              sublabel="Proyección 12 meses"
            />
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500 mb-1">CO₂ emitido / mes</p>
              <p className="text-2xl font-bold text-slate-700">{formatNumber(resultado.emisionesCo2Mes)} kg</p>
              <p className="text-xs text-slate-400 mt-1">
                Rend. ajustado: {resultado.rendimientoAjustado} km/L
              </p>
            </div>
          </div>

          {/* Comparativa de rendimiento */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              <h3 className="font-bold text-slate-800">¿Cuánto ahorrarías mejorando el rendimiento?</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6">Costo mensual según rendimiento del auto</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={datosComparativa} barSize={48}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
              <Tooltip formatter={customFormatter} />
                <Bar dataKey="costo" radius={[6, 6, 0, 0]}>
                  <Cell fill="#fca5a5" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#16a34a" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Ahorrarías {formatCurrency(datosComparativa[0]?.costo - datosComparativa[2]?.costo)} al mes
              mejorando 20% el rendimiento (mantenimiento, presión de llantas, conducción eficiente)
            </p>
          </div>
          </div>
        </>
      )}
    </div>
  )
}