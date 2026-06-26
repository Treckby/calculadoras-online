'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResultCard } from '../../components/ui/ResultCard'
import { calcularCalorias } from '../../lib/calculadoras/calorias'
import { CaloriasResultado, NivelActividad, Objetivo, Sexo } from '../../types'
import { cn } from '../../lib/utils'

const ACTIVIDADES: { value: NivelActividad; label: string; desc: string }[] = [
  { value: 'sedentario',  label: 'Sedentario',   desc: 'Sin ejercicio' },
  { value: 'ligero',      label: 'Ligero',        desc: '1–3 días/sem' },
  { value: 'moderado',    label: 'Moderado',      desc: '3–5 días/sem' },
  { value: 'activo',      label: 'Activo',        desc: '6–7 días/sem' },
  { value: 'muy_activo',  label: 'Muy activo',    desc: '2 veces/día' },
]

const OBJETIVOS: { value: Objetivo; label: string; color: string }[] = [
  { value: 'perder',    label: '⬇ Perder peso',    color: 'border-blue-500 bg-blue-50 text-blue-700' },
  { value: 'mantener',  label: '⚖ Mantener peso',  color: 'border-green-500 bg-green-50 text-green-700' },
  { value: 'ganar',     label: '⬆ Ganar músculo',  color: 'border-orange-500 bg-orange-50 text-orange-700' },
]

const MACRO_COLORS = ['#3b82f6', '#10b981', '#f59e0b']

export function CalculadoraCalorias() {
  const [form, setForm] = useState({
    peso: '', altura: '', edad: '',
    sexo: 'masculino' as Sexo,
    actividad: 'moderado' as NivelActividad,
    objetivo: 'mantener' as Objetivo,
  })
  const [resultado, setResultado] = useState<CaloriasResultado | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!form.peso   || Number(form.peso)   <= 0) e.peso   = 'Ingresa tu peso'
    if (!form.altura || Number(form.altura) <= 0) e.altura = 'Ingresa tu altura'
    if (!form.edad   || Number(form.edad)   <= 0) e.edad   = 'Ingresa tu edad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function calcular() {
    if (!validar()) return
    setResultado(
      calcularCalorias({
        peso:      Number(form.peso),
        altura:    Number(form.altura),
        edad:      Number(form.edad),
        sexo:      form.sexo,
        actividad: form.actividad,
        objetivo:  form.objetivo,
      })
    )
  }

  const dataMacros = resultado
    ? [
        { name: 'Proteínas',     value: resultado.proteinas,     g: `${resultado.proteinas}g` },
        { name: 'Carbohidratos', value: resultado.carbohidratos, g: `${resultado.carbohidratos}g` },
        { name: 'Grasas',        value: resultado.grasas,        g: `${resultado.grasas}g` },
      ]
    : []

  const imcColor =
    resultado?.imc && resultado.imc < 18.5 ? 'text-blue-500'
    : resultado?.imc && resultado.imc < 25  ? 'text-green-500'
    : resultado?.imc && resultado.imc < 30  ? 'text-yellow-500'
    : 'text-red-500'

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <h2 className="font-bold text-slate-800 text-lg">Tus datos físicos</h2>

        {/* Sexo */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Sexo biológico</p>
          <div className="flex gap-3">
            {(['masculino', 'femenino'] as Sexo[]).map((s) => (
              <button
                key={s}
                onClick={() => setForm({ ...form, sexo: s })}
                className={cn(
                  'px-5 py-2 rounded-lg border text-sm font-medium transition-all capitalize',
                  form.sexo === s
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-orange-300'
                )}
              >
                {s === 'masculino' ? '♂ Masculino' : '♀ Femenino'}
              </button>
            ))}
          </div>
        </div>

        {/* Medidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Peso"
            type="number"
            placeholder="70"
            suffix="kg"
            value={form.peso}
            onChange={(e) => setForm({ ...form, peso: e.target.value })}
            error={errors.peso}
          />
          <Input
            label="Altura"
            type="number"
            placeholder="170"
            suffix="cm"
            value={form.altura}
            onChange={(e) => setForm({ ...form, altura: e.target.value })}
            error={errors.altura}
          />
          <Input
            label="Edad"
            type="number"
            placeholder="30"
            suffix="años"
            value={form.edad}
            onChange={(e) => setForm({ ...form, edad: e.target.value })}
            error={errors.edad}
          />
        </div>

        {/* Nivel de actividad */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Nivel de actividad física</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ACTIVIDADES.map((a) => (
              <button
                key={a.value}
                onClick={() => setForm({ ...form, actividad: a.value })}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  form.actividad === a.value
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'border-slate-200 hover:border-orange-300'
                )}
              >
                <p className={cn('text-sm font-semibold', form.actividad === a.value ? 'text-white' : 'text-slate-700')}>
                  {a.label}
                </p>
                <p className={cn('text-xs mt-0.5', form.actividad === a.value ? 'text-orange-100' : 'text-slate-400')}>
                  {a.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Objetivo */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Objetivo</p>
          <div className="flex flex-wrap gap-3">
            {OBJETIVOS.map((o) => (
              <button
                key={o.value}
                onClick={() => setForm({ ...form, objetivo: o.value })}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                  form.objetivo === o.value ? o.color : 'border-slate-200 text-slate-500 hover:border-slate-300'
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
          Calcular calorías
        </Button>
      </div>

      {/* Resultados */}
      {resultado && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResultCard
              label="Calorías diarias"
              value={`${resultado.objetivo} kcal`}
              highlight
              sublabel="Tu meta diaria"
            />
            <ResultCard
              label="Tasa metabólica basal"
              value={`${resultado.tmb} kcal`}
              sublabel="En reposo total"
            />
            <ResultCard
              label="Gasto con actividad"
              value={`${resultado.tdee} kcal`}
              sublabel="Sin ajuste de objetivo"
            />
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500 mb-1">IMC</p>
              <p className={cn('text-2xl font-bold', imcColor)}>{resultado.imc}</p>
              <p className="text-xs text-slate-400 mt-1">{resultado.clasificacionImc}</p>
            </div>
          </div>

          {/* Macros */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-1">Distribución de macronutrientes</h3>
            <p className="text-sm text-slate-400 mb-6">Basado en 30% proteínas · 40% carbohidratos · 30% grasas</p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie data={dataMacros} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {dataMacros.map((_, i) => (
                      <Cell key={i} fill={MACRO_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`${value}g`, name]} />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex-1 space-y-4 w-full">
                {[
                  { label: 'Proteínas',     g: resultado.proteinas,     kcal: resultado.proteinas * 4,     color: 'bg-blue-500',   pct: '30%' },
                  { label: 'Carbohidratos', g: resultado.carbohidratos, kcal: resultado.carbohidratos * 4, color: 'bg-green-500',  pct: '40%' },
                  { label: 'Grasas',        g: resultado.grasas,        kcal: resultado.grasas * 9,        color: 'bg-amber-500',  pct: '30%' },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{m.label}</span>
                      <span className="text-slate-500">{m.g}g · {m.kcal} kcal</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn('h-full rounded-full', m.color)} style={{ width: m.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}