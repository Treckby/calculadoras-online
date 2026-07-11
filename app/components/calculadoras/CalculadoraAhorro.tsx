'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, Cell
} from 'recharts'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularAhorro } from '../../lib/calculadoras/ahorro'
import { AhorroResultado } from '../../types'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { TooltipProps } from 'recharts';
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado } from '../../components/ui/AccionesResultado'
import { generarMensajeAhorro } from '../../lib/whatsapp'

const customFormatter: TooltipProps['formatter'] = (value, name) => [
  formatCurrency(Number(value)),
  name === 'aportado' ? 'Aportado' : 'Intereses',
];
export function CalculadoraAhorro() {
  const [form, setForm] = useState({
    montoInicial: '',
    aporteMensual: '',
    tasaAnual: '',
    plazoAnios: '',
  })
  const [resultado, setResultado] = useState<AhorroResultado | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (Number(form.montoInicial) < 0) e.montoInicial = 'El monto no puede ser negativo'
    if (!form.aporteMensual || Number(form.aporteMensual) < 0) e.aporteMensual = 'Ingresa un aporte válido'
    if (!form.tasaAnual || Number(form.tasaAnual) <= 0) e.tasaAnual = 'Ingresa una tasa válida'
    if (!form.plazoAnios || Number(form.plazoAnios) <= 0) e.plazoAnios = 'Ingresa un plazo válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    setResultado(
      calcularAhorro({
        montoInicial: Number(form.montoInicial) || 0,
        aporteMensual: Number(form.aporteMensual),
        tasaAnual: Number(form.tasaAnual),
        plazoAnios: Number(form.plazoAnios),
      })
    )
  }

  const porcentajeInteres = resultado
    ? (resultado.totalIntereses / resultado.totalAhorrado) * 100
    : 0

  return (
    <div className="space-y-8">
      <RegistrarVisita pagina="calculadora-ahorro" />
      {/* Formulario */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 text-lg mb-6">Datos del ahorro</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Input
            label="Monto inicial (opcional)"
            type="number"
            placeholder="0"
            prefix="$"
            value={form.montoInicial}
            onChange={(e) => setForm({ ...form, montoInicial: e.target.value })}
            error={errors.montoInicial}
          />
          <Input
            label="Aporte mensual"
            type="number"
            placeholder="1000"
            prefix="$"
            value={form.aporteMensual}
            onChange={(e) => setForm({ ...form, aporteMensual: e.target.value })}
            error={errors.aporteMensual}
          />
          <Input
            label="Tasa de interés anual"
            type="number"
            placeholder="8"
            suffix="%"
            value={form.tasaAnual}
            onChange={(e) => setForm({ ...form, tasaAnual: e.target.value })}
            error={errors.tasaAnual}
          />
          <Input
            label="Plazo"
            type="number"
            placeholder="10"
            suffix="años"
            value={form.plazoAnios}
            onChange={(e) => setForm({ ...form, plazoAnios: e.target.value })}
            error={errors.plazoAnios}
          />
        </div>
        <Button onClick={calcular} size="lg" className="w-full sm:w-auto">
          Proyectar ahorro
        </Button>
      </div>

      {/* Resultados */}
      {resultado && (
        <div >
          <AccionesResultado
            mensaje={generarMensajeAhorro({
              montoInicial: Number(form.montoInicial) || 0,
              aporteMensual: Number(form.aporteMensual),
              tasaAnual: Number(form.tasaAnual),
              plazoAnios: Number(form.plazoAnios),
              totalAhorrado: resultado.totalAhorrado,
              totalIntereses: resultado.totalIntereses,
            })}
            elementoId="resultado-ahorro"
            nombreArchivo="calculadora-ahorro"
          />
          <div id="resultado-ahorro" className='space-y-8'>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" >
              <ResultCard
                label="Total ahorrado"
                value={formatCurrency(resultado.totalAhorrado)}
                highlight
                sublabel={`En ${form.plazoAnios} años`}
              />
              <ResultCard
                label="Total aportado"
                value={formatCurrency(resultado.totalAportado)}
                sublabel="Tu dinero invertido"
              />
              <ResultCard
                label="Intereses ganados"
                value={formatCurrency(resultado.totalIntereses)}
                sublabel={`${formatNumber(porcentajeInteres)}% del total`}
              />
            </div>

            {/* Gráfica de barras apiladas */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-1">Crecimiento año a año</h3>
              <p className="text-sm text-slate-400 mb-6">
                Azul = lo que aportaste · Verde = intereses generados
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={resultado.proyeccion} barSize={28}>
                  <XAxis
                    dataKey="anio"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `Año ${v}`}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip formatter={customFormatter} />
                  <Legend
                    formatter={(value) => (value === 'aportado' ? 'Aportado' : 'Intereses')}
                  />
                  <Bar dataKey="aportado" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="intereses" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de proyección */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Proyección anual</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      {['Año', 'Total ahorrado', 'Total aportado', 'Intereses acumulados', '% rendimiento'].map((h) => (
                        <th key={h} className="text-left py-3 px-2 text-slate-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.proyeccion.map((fila) => (
                      <tr key={fila.anio} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-2 px-2 font-medium text-slate-700">Año {fila.anio}</td>
                        <td className="py-2 px-2 font-semibold text-green-600">{formatCurrency(fila.saldo)}</td>
                        <td className="py-2 px-2 text-slate-600">{formatCurrency(fila.aportado)}</td>
                        <td className="py-2 px-2 text-blue-600">{formatCurrency(fila.intereses)}</td>
                        <td className="py-2 px-2 text-slate-500">
                          {formatNumber((fila.intereses / fila.aportado) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}