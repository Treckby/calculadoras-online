'use client'

import { useState }          from 'react'
import { Input }             from '../../components/ui/Input'
import { Button }            from '../../components/ui/Button'
import { ResultCard }        from '../../components/ui/ResultCard'
import { AccionesResultado } from '../../components/ui/AccionesResultado'
import {
  calcularHidratacion,
  NivelActividadHidratacion,
  ClimaHidratacion,
} from '../../lib/calculadoras/hidratacion'
import { cn }       from '../../lib/utils'
import { Droplets } from 'lucide-react'

const ACTIVIDADES: { value: NivelActividadHidratacion; label: string; desc: string }[] = [
  { value: 'sedentario', label: '🪑 Sedentario', desc: 'Sin ejercicio'  },
  { value: 'ligero',     label: '🚶 Ligero',     desc: '1–2 días/sem'  },
  { value: 'moderado',   label: '🏃 Moderado',   desc: '3–4 días/sem'  },
  { value: 'intenso',    label: '💪 Intenso',    desc: '5–6 días/sem'  },
  { value: 'atleta',     label: '🏋️ Atleta',    desc: 'Diario++'      },
]

const CLIMAS: { value: ClimaHidratacion; label: string }[] = [
  { value: 'frio',         label: '🧊 Frío'         },
  { value: 'templado',     label: '🌤 Templado'      },
  { value: 'caluroso',     label: '☀️ Caluroso'     },
  { value: 'muy_caluroso', label: '🔥 Muy caluroso' },
]

export function CalculadoraHidratacion() {
  const [form, setForm] = useState({
    peso:       '',
    actividad:  'moderado' as NivelActividadHidratacion,
    clima:      'templado' as ClimaHidratacion,
    embarazada: false,
    lactando:   false,
  })
  const [resultado, setResultado] = useState<ReturnType<typeof calcularHidratacion> | null>(null)
  const [error, setError]         = useState('')

  function calcular() {
    if (!form.peso || Number(form.peso) <= 0) {
      setError('Ingresa tu peso')
      return
    }
    setError('')
    setResultado(
      calcularHidratacion({
        peso:       Number(form.peso),
        actividad:  form.actividad,
        clima:      form.clima,
        embarazada: form.embarazada,
        lactando:   form.lactando,
      })
    )
  }

  // Porcentaje de la botella visual (referencia 2.5L)
  const pct = resultado ? Math.min((resultado.litrosTotales / 3) * 100, 100) : 0

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <h2 className="font-bold text-slate-800 text-lg">Tus datos</h2>

        {/* Peso */}
        <div className="max-w-xs">
          <Input
            label="Peso corporal"
            type="number"
            placeholder="70"
            suffix="kg"
            value={form.peso}
            onChange={(e) => setForm({ ...form, peso: e.target.value })}
            error={error}
          />
        </div>

        {/* Actividad */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Nivel de actividad física</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ACTIVIDADES.map((a) => (
              <button
                key={a.value}
                onClick={() => setForm({ ...form, actividad: a.value })}
                className={cn(
                  'p-3 rounded-xl border-2 text-left transition-all',
                  form.actividad === a.value
                    ? 'bg-cyan-500 border-cyan-500 text-white'
                    : 'border-slate-200 hover:border-cyan-300'
                )}
              >
                <p className={cn('text-sm font-semibold', form.actividad === a.value ? 'text-white' : 'text-slate-700')}>
                  {a.label}
                </p>
                <p className={cn('text-xs mt-0.5', form.actividad === a.value ? 'text-cyan-100' : 'text-slate-400')}>
                  {a.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Clima */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Clima donde vives</p>
          <div className="flex flex-wrap gap-2">
            {CLIMAS.map((c) => (
              <button
                key={c.value}
                onClick={() => setForm({ ...form, clima: c.value })}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                  form.clima === c.value
                    ? 'bg-cyan-500 border-cyan-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-cyan-300'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Condiciones especiales */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Condiciones especiales</p>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'embarazada', label: '🤰 Embarazada (+0.3L)' },
              { key: 'lactando',   label: '🤱 Lactando (+0.7L)'   },
            ].map((op) => (
              <button
                key={op.key}
                onClick={() => setForm({ ...form, [op.key]: !form[op.key as keyof typeof form] })}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                  form[op.key as keyof typeof form]
                    ? 'bg-cyan-500 border-cyan-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-cyan-300'
                )}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={calcular}
          size="lg"
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600"
        >
          Calcular hidratación
        </Button>
      </div>

      {/* Resultado */}
      {resultado && (
        <>
          <AccionesResultado
            mensaje={`💧 *Calculadora de Hidratación* — CalcFácil\n\n⚖️ Peso: ${form.peso}kg\n🏃 Actividad: ${form.actividad}\n🌡 Clima: ${form.clima}\n\n✅ *Debes tomar: ${resultado.litrosTotales}L al día*\n🥤 Equivale a ${resultado.vasos} vasos de 250ml\n\n_Calculado en CalcFácil 🧮_`}
            elementoId="resultado-hidratacion"
            nombreArchivo="calculadora-hidratacion"
          />

          <div id="resultado-hidratacion" className="space-y-6">

            {/* Visual botella */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-8">

                {/* Botella animada */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-16 h-40 rounded-b-2xl rounded-t-lg border-2 border-cyan-300 overflow-hidden bg-slate-100">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-300 transition-all duration-1000 rounded-b-xl"
                      style={{ height: `${pct}%` }}
                    />
                    {/* Líneas de medición */}
                    {[25, 50, 75].map((p) => (
                      <div
                        key={p}
                        className="absolute left-0 right-0 border-t border-dashed border-cyan-200"
                        style={{ bottom: `${p}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">3L ref.</p>
                </div>

                {/* Datos */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-slate-500 text-sm">Tu meta diaria</p>
                    <p className="text-5xl font-black text-cyan-500">
                      {resultado.litrosTotales}
                      <span className="text-2xl font-semibold text-cyan-400 ml-1">L</span>
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      {resultado.vasos} vasos de 250ml
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjetas desglose */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ResultCard
                label="Base (peso)"
                value={`${resultado.litrosBase}L`}
                sublabel="0.033L × kg"
              />
              <ResultCard
                label="Por actividad"
                value={`+${resultado.litrosActividad}L`}
                sublabel="Según ejercicio"
              />
              <ResultCard
                label="Por clima"
                value={`+${resultado.litrosClima}L`}
                sublabel="Temperatura"
              />
              <ResultCard
                label="Total diario"
                value={`${resultado.litrosTotales}L`}
                highlight
                sublabel={`${resultado.vasos} vasos`}
              />
            </div>

            {/* Horario de recordatorios */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">
                📅 Horario sugerido de hidratación
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {resultado.recordatorios.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-cyan-50 border border-cyan-100 rounded-lg"
                  >
                    <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="text-xs text-slate-600">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-cyan-800 mb-2">💡 Tips de hidratación</p>
              <ul className="space-y-1 text-xs text-cyan-700">
                <li>• Toma un vaso al despertar antes del café o desayuno</li>
                <li>• Lleva siempre una botella contigo durante el día</li>
                <li>• Las frutas y verduras también cuentan como hidratación</li>
                <li>• En días de ejercicio intenso, agrega sales minerales</li>
                <li>• La orina de color amarillo claro indica buena hidratación</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}