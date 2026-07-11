'use client'

import { useState } from 'react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { calcularPesoIdeal } from '../../lib/calculadoras/pesoIdeal'
import { PesoIdealResultado } from '../../types'
import { formatNumber } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado }       from '../../components/ui/AccionesResultado'
import { generarMensajePesoIdeal } from '../../lib/whatsapp'
import { Breadcrumbs } from '../layout/Breadcrumbs'

export function CalculadoraPesoIdeal() {
  const [form, setForm] = useState({
    peso:   '',
    altura: '',
    edad:   '',
    sexo:   'masculino' as 'masculino' | 'femenino',
  })
  const [resultado, setResultado] = useState<PesoIdealResultado | null>(null)
  const [errors, setErrors]       = useState<Record<string, string>>({})

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
    setResultado(calcularPesoIdeal({
      peso:   Number(form.peso),
      altura: Number(form.altura),
      edad:   Number(form.edad),
      sexo:   form.sexo,
    }))
  }

  const IMC_RANGOS = [
    { label: 'Bajo peso',   min: 0,    max: 18.5, color: 'bg-blue-400'   },
    { label: 'Normal',      min: 18.5, max: 25,   color: 'bg-green-400'  },
    { label: 'Sobrepeso',   min: 25,   max: 30,   color: 'bg-yellow-400' },
    { label: 'Obesidad I',  min: 30,   max: 35,   color: 'bg-orange-400' },
    { label: 'Obesidad II', min: 35,   max: 40,   color: 'bg-red-400'    },
  ]

  return (
    <div className="space-y-8">
      <Breadcrumbs pagina='calculadora de peso ideal'></Breadcrumbs>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Sexo */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Sexo biológico</p>
          <div className="flex gap-3">
            {(['masculino', 'femenino'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setForm({ ...form, sexo: s })}
                className={cn(
                  'px-5 py-2 rounded-lg border-2 text-sm font-medium transition-all capitalize',
                  form.sexo === s
                    ? 'bg-lime-500 border-lime-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-lime-300'
                )}
              >
                {s === 'masculino' ? '♂ Masculino' : '♀ Femenino'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Peso actual" type="number" placeholder="70" suffix="kg"
            value={form.peso} onChange={(e) => setForm({ ...form, peso: e.target.value })} error={errors.peso} />
          <Input label="Altura" type="number" placeholder="170" suffix="cm"
            value={form.altura} onChange={(e) => setForm({ ...form, altura: e.target.value })} error={errors.altura} />
          <Input label="Edad" type="number" placeholder="30" suffix="años"
            value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} error={errors.edad} />
        </div>

        <Button onClick={calcular} size="lg" className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600">
          Calcular
        </Button>
      </div>

      {resultado && (
        <>
            <AccionesResultado
      mensaje={generarMensajePesoIdeal({
        peso:          Number(form.peso),
        altura:        Number(form.altura),
        imc:           resultado.imc,
        clasificacion: resultado.clasificacionImc,
        pesoIdealMin:  resultado.pesoIdealMin,
        pesoIdealMax:  resultado.pesoIdealMax,
        promedio:      resultado.promedio,
        pesoSaludable: resultado.pesoSaludable,
      })}
      elementoId="resultado-peso-ideal"
      nombreArchivo="peso-ideal-imc"
    />
<div className='space-y-8' id='resultado-peso-ideal'>
          {/* IMC */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-6">Índice de Masa Corporal (IMC)</h3>

            {/* Valor IMC */}
            <div className="flex items-end gap-3 mb-6">
              <span className={cn('text-6xl font-bold', resultado.colorImc)}>
                {resultado.imc}
              </span>
              <div className="mb-2">
                <p className={cn('text-lg font-semibold', resultado.colorImc)}>
                  {resultado.clasificacionImc}
                </p>
                <p className="text-xs text-slate-400">kg/m²</p>
              </div>
            </div>

            {/* Barra IMC */}
            <div className="flex h-3 rounded-full overflow-hidden mb-2 gap-0.5">
              {IMC_RANGOS.map((r) => (
                <div key={r.label} className={cn('flex-1 rounded-sm', r.color)} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>16</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span>
            </div>

            {/* Indicator */}
            <div
              className="w-3 h-3 bg-slate-800 rounded-full mt-1 transition-all"
              style={{ marginLeft: `${Math.min(Math.max(((resultado.imc - 16) / 24) * 100, 0), 100)}%` }}
            />

            {/* Rangos */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6">
              {IMC_RANGOS.map((r) => (
                <div
                  key={r.label}
                  className={cn(
                    'rounded-lg p-2 text-center text-xs',
                    resultado.imc >= r.min && resultado.imc < r.max
                      ? 'ring-2 ring-offset-1 ring-slate-400 bg-slate-50'
                      : 'bg-slate-50'
                  )}
                >
                  <div className={cn('w-2 h-2 rounded-full mx-auto mb-1', r.color)} />
                  <p className="font-medium text-slate-700">{r.label}</p>
                  <p className="text-slate-400">{r.min}–{r.max}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Peso ideal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Peso ideal</h3>

            {/* Rango saludable */}
            <div className={cn(
              'rounded-xl p-4 mb-6 text-center',
              resultado.pesoSaludable ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
            )}>
              <p className="text-sm text-slate-500 mb-1">Rango de peso saludable para tu altura</p>
              <p className="text-3xl font-bold text-slate-800">
                {resultado.pesoIdealMin} – {resultado.pesoIdealMax} kg
              </p>
              {!resultado.pesoSaludable && (
                <p className="text-sm text-yellow-600 mt-2">
                  {resultado.diferencia > 0
                    ? `Te sobran ${Math.abs(resultado.diferencia)} kg para llegar al rango ideal`
                    : `Te faltan ${Math.abs(resultado.diferencia)} kg para llegar al rango ideal`
                  }
                </p>
              )}
              {resultado.pesoSaludable && (
                <p className="text-sm text-green-600 mt-2">✓ Tu peso está dentro del rango saludable</p>
              )}
            </div>

            {/* Fórmulas */}
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Por fórmula médica
            </p>
            <div className="space-y-2">
              {[
                { label: 'Devine',   value: resultado.devine   },
                { label: 'Robinson', value: resultado.robinson },
                { label: 'Miller',   value: resultado.miller   },
                { label: 'Promedio', value: resultado.promedio, bold: true },
              ].map((f) => (
                <div key={f.label} className={cn(
                  'flex justify-between items-center py-2 px-3 rounded-lg',
                  f.bold ? 'bg-lime-50 border border-lime-200' : 'hover:bg-slate-50'
                )}>
                  <span className={cn('text-sm', f.bold ? 'font-bold text-lime-700' : 'text-slate-600')}>
                    {f.label}
                  </span>
                  <span className={cn('font-semibold', f.bold ? 'text-lime-700' : 'text-slate-700')}>
                    {f.value} kg
                  </span>
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