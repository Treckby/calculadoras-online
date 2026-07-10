'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularPrestamo } from '../../lib/calculadoras/prestamo'
import { PrestamoResultado } from '../../types'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { TooltipProps } from 'recharts';
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'

const customFormatter: TooltipProps['formatter'] = (value) =>
  formatCurrency(Number(value ?? 0));

export function CalculadoraPrestamo() {
  const [form, setForm] = useState({ monto: '', tasaAnual: '', plazoMeses: '' })
  const [resultado, setResultado] = useState<PrestamoResultado | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!form.monto || Number(form.monto) <= 0) e.monto = 'Ingresa un monto válido'
    if (!form.tasaAnual || Number(form.tasaAnual) <= 0) e.tasaAnual = 'Ingresa una tasa válida'
    if (!form.plazoMeses || Number(form.plazoMeses) <= 0) e.plazoMeses = 'Ingresa un plazo válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    const res = calcularPrestamo({
      monto: Number(form.monto),
      tasaAnual: Number(form.tasaAnual),
      plazoMeses: Number(form.plazoMeses),
    })
    setResultado(res)
  }

  // Datos para la gráfica (cada 3 meses para no saturar)
  const datosGrafica = resultado?.tablaAmortizacion
    .filter((_, i) => i % 3 === 0 || i === resultado.tablaAmortizacion.length - 1)
    .map((f) => ({
      mes: `M${f.mes}`,
      Capital: parseFloat(f.capital.toFixed(2)),
      Interés: parseFloat(f.interes.toFixed(2)),
      Saldo: parseFloat(f.saldoPendiente.toFixed(2)),
    }))

  return (
    <div className="space-y-8">
      <RegistrarVisita pagina="calculadora-prestamos" />
      {/* Formulario */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 text-lg mb-6">Datos del préstamo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Input
            label="Monto del préstamo"
            type="number"
            placeholder="100000"
            prefix="$"
            value={form.monto}
            onChange={(e) => setForm({ ...form, monto: e.target.value })}
            error={errors.monto}
          />
          <Input
            label="Tasa de interés anual"
            type="number"
            placeholder="12"
            suffix="%"
            value={form.tasaAnual}
            onChange={(e) => setForm({ ...form, tasaAnual: e.target.value })}
            error={errors.tasaAnual}
          />
          <Input
            label="Plazo"
            type="number"
            placeholder="24"
            suffix="meses"
            value={form.plazoMeses}
            onChange={(e) => setForm({ ...form, plazoMeses: e.target.value })}
            error={errors.plazoMeses}
          />
        </div>
        <Button onClick={calcular} size="lg" className="w-full sm:w-auto">
          Calcular préstamo
        </Button>
      </div>

      {/* Resultados */}
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
              label="Cuota mensual"
              value={formatCurrency(resultado.cuotaMensual)}
              highlight
              sublabel="Pago fijo cada mes"
            />
            <ResultCard
              label="Total a pagar"
              value={formatCurrency(resultado.totalPagar)}
              sublabel={`En ${form.plazoMeses} meses`}
            />
            <ResultCard
              label="Total de intereses"
              value={formatCurrency(resultado.totalIntereses)}
              sublabel={`${formatNumber((resultado.totalIntereses / Number(form.monto)) * 100)}% del capital`}
            />
          </div>

          {/* Gráfica */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-6">Evolución del préstamo</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={datosGrafica}>
                <defs>
                  <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
             <Tooltip formatter={customFormatter} />
                <Legend />
                <Area type="monotone" dataKey="Saldo" stroke="#3b82f6" fill="url(#colorSaldo)" strokeWidth={2} />
                <Area type="monotone" dataKey="Capital" stroke="#10b981" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="Interés" stroke="#f59e0b" fill="none" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de amortización */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Tabla de amortización</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['Mes', 'Cuota', 'Capital', 'Interés', 'Saldo pendiente'].map((h) => (
                      <th key={h} className="text-left py-3 px-2 text-slate-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultado.tablaAmortizacion.map((fila) => (
                    <tr key={fila.mes} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-2 px-2 font-medium text-slate-700">{fila.mes}</td>
                      <td className="py-2 px-2 text-slate-600">{formatCurrency(fila.cuota)}</td>
                      <td className="py-2 px-2 text-green-600">{formatCurrency(fila.capital)}</td>
                      <td className="py-2 px-2 text-amber-600">{formatCurrency(fila.interes)}</td>
                      <td className="py-2 px-2 text-slate-600">{formatCurrency(fila.saldoPendiente)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </ResultadoExportable>
        </>
      )}
    </div>
  )
}