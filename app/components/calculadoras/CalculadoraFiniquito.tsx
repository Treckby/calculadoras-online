'use client'

import { useState } from 'react'
import { Input }          from '../../components/ui/Input'
import { Button }         from '../../components/ui/Button'
import { ResultCard }     from '../../components/ui/ResultCard'
import { AccionesResultado } from '../../components/ui/AccionesResultado'
import { calcularFiniquito, diasVacacionesPorAnio } from '../../lib/calculadoras/finiquito'
import { formatCurrency } from '../../lib/utils'
import { cn }             from '../../lib/utils'
import { Info }           from 'lucide-react'

type TipoSeparacion = 'renuncia' | 'despido' | 'mutuo_acuerdo'

const TIPOS: { value: TipoSeparacion; label: string; desc: string; color: string }[] = [
  { value: 'renuncia',      label: '🚪 Renuncia',       desc: 'Decisión propia',       color: 'border-blue-500 bg-blue-50 text-blue-700'   },
  { value: 'despido',       label: '❌ Despido',         desc: 'Sin causa justificada', color: 'border-red-500 bg-red-50 text-red-700'       },
  { value: 'mutuo_acuerdo', label: '🤝 Mutuo acuerdo',  desc: 'Ambas partes',          color: 'border-green-500 bg-green-50 text-green-700' },
]

export function CalculadoraFiniquito() {
  const [form, setForm] = useState({
    salarioMensual:  '',
    aniosTrabajados: '',
    diasTrabajados:  '',
    tipoSeparacion:  'renuncia' as TipoSeparacion,
  })
  const [resultado, setResultado] = useState<ReturnType<typeof calcularFiniquito> | null>(null)
  const [errors, setErrors]       = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!form.salarioMensual  || Number(form.salarioMensual)  <= 0) e.salarioMensual  = 'Ingresa tu salario mensual'
    if (!form.aniosTrabajados || Number(form.aniosTrabajados) < 0)  e.aniosTrabajados = 'Ingresa los años trabajados'
    if (!form.diasTrabajados  || Number(form.diasTrabajados)  <= 0) e.diasTrabajados  = 'Ingresa los días trabajados este año'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    const salarioDiario  = Number(form.salarioMensual) / 30
    const anios          = Number(form.aniosTrabajados)
    const diasVac        = diasVacacionesPorAnio(anios)

    setResultado(calcularFiniquito({
      salarioDiario,
      diasTrabajados:  Number(form.diasTrabajados),
      diasVacaciones:  diasVac,
      tipoSeparacion:  form.tipoSeparacion,
      aniosTrabajados: anios,
    }))
  }

  const salarioDiario = Number(form.salarioMensual) / 30

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <h2 className="font-bold text-slate-800 text-lg">Datos laborales</h2>

        {/* Tipo de separación */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tipo de separación</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIPOS.map((t) => (
              <button
                key={t.value}
                onClick={() => { setForm({ ...form, tipoSeparacion: t.value }); setResultado(null) }}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  form.tipoSeparacion === t.value
                    ? t.color
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <p className="text-sm font-bold">{t.label}</p>
                <p className="text-xs mt-0.5 opacity-70">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Salario mensual"
            type="number"
            placeholder="15000"
            prefix="$"
            value={form.salarioMensual}
            onChange={(e) => setForm({ ...form, salarioMensual: e.target.value })}
            error={errors.salarioMensual}
          />
          <Input
            label="Años trabajados"
            type="number"
            placeholder="2"
            suffix="años"
            value={form.aniosTrabajados}
            onChange={(e) => setForm({ ...form, aniosTrabajados: e.target.value })}
            error={errors.aniosTrabajados}
          />
          <Input
            label="Días trabajados este año"
            type="number"
            placeholder="180"
            suffix="días"
            value={form.diasTrabajados}
            onChange={(e) => setForm({ ...form, diasTrabajados: e.target.value })}
            error={errors.diasTrabajados}
          />
        </div>

        {/* Info vacaciones automáticas */}
        {form.aniosTrabajados && Number(form.aniosTrabajados) > 0 && (
          <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
            <Info className="w-3.5 h-3.5 shrink-0" />
            Según la LFT, con {form.aniosTrabajados} año(s) tienes derecho a{' '}
            <strong>{diasVacacionesPorAnio(Number(form.aniosTrabajados))} días</strong> de vacaciones.
          </div>
        )}

        {/* Salario diario calculado */}
        {form.salarioMensual && Number(form.salarioMensual) > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
            <Info className="w-3.5 h-3.5 shrink-0" />
            Salario diario calculado: <strong>{formatCurrency(salarioDiario)}/día</strong>
          </div>
        )}

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          Calcular finiquito
        </Button>
      </div>

      {/* Resultados */}
      {resultado && (
        <>
          <AccionesResultado
            mensaje={`💼 *Calculadora de Finiquito* — CalcFácil\n\n💰 Salario mensual: ${formatCurrency(Number(form.salarioMensual))}\n📅 Años trabajados: ${form.aniosTrabajados}\n\n✅ *Total finiquito: ${formatCurrency(resultado.total)}*\n\n_Calculado en CalcFácil 🧮_`}
            elementoId="resultado-finiquito"
            nombreArchivo="calculadora-finiquito"
          />

          <div id="resultado-finiquito" className="space-y-6">
            {/* Total destacado */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
              <p className="text-blue-100 text-sm mb-2">Total a recibir</p>
              <p className="text-5xl font-black">{formatCurrency(resultado.total)}</p>
              <p className="text-blue-200 text-sm mt-2 capitalize">
                Por {form.tipoSeparacion.replace('_', ' ')} después de {form.aniosTrabajados} año(s)
              </p>
            </div>

            {/* Tarjetas resumen */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ResultCard
                label="Aguinaldo prop."
                value={formatCurrency(resultado.partesPropAguinaldo)}
                sublabel="Partes proporcionales"
              />
              <ResultCard
                label="Vacaciones prop."
                value={formatCurrency(resultado.partesPropVacaciones)}
                sublabel="Días no gozados"
              />
              <ResultCard
                label="Prima vacacional"
                value={formatCurrency(resultado.primaPropVacacional)}
                sublabel="25% de vacaciones"
              />
              {resultado.indemnizacion > 0 && (
                <ResultCard
                  label="Indemnización"
                  value={formatCurrency(resultado.indemnizacion)}
                  sublabel="Por despido injustificado"
                />
              )}
              {resultado.primaAntiguedad > 0 && (
                <ResultCard
                  label="Prima antigüedad"
                  value={formatCurrency(resultado.primaAntiguedad)}
                  sublabel="12 días por año"
                />
              )}
            </div>

            {/* Desglose con fórmulas */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Desglose y fórmulas (LFT)</h3>
              <div className="space-y-4">
                {resultado.desglose.map((item) => (
                  <div key={item.concepto} className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.concepto}</p>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">{item.formula}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600 shrink-0">{formatCurrency(item.monto)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <p className="font-bold text-slate-800">Total</p>
                  <p className="text-xl font-black text-blue-600">{formatCurrency(resultado.total)}</p>
                </div>
              </div>
            </div>

            {/* Aviso legal */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-700">
                ⚠️ Este cálculo es orientativo basado en la Ley Federal del Trabajo (LFT) de México.
                Los montos pueden variar según tu contrato colectivo, prestaciones adicionales o
                acuerdos particulares. Se recomienda consultar con un abogado laboral.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}