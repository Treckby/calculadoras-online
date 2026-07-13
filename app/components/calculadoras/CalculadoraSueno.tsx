'use client'

import { useState }          from 'react'
import { Button }            from '../../components/ui/Button'
import { AccionesResultado } from '../../components/ui/AccionesResultado'
import { calcularSueno }     from '../../lib/calculadoras/sueno'
import { cn }                from '../../lib/utils'
import { Moon, Sun, Clock }  from 'lucide-react'

type Objetivo = 'dormir' | 'despertar'

const CALIDAD_STYLES = {
  óptimo:    { bg: 'bg-green-50 border-green-200',  badge: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  bueno:     { bg: 'bg-blue-50 border-blue-200',    badge: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500'   },
  aceptable: { bg: 'bg-amber-50 border-amber-200',  badge: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-500'  },
}

export function CalculadoraSueno() {
  const [hora, setHora]         = useState('')
  const [objetivo, setObjetivo] = useState<Objetivo>('despertar')
  const [edad, setEdad]         = useState('')
  const [resultado, setResultado] = useState<ReturnType<typeof calcularSueno> | null>(null)
  const [error, setError]       = useState('')

  function calcular() {
    if (!hora)                              { setError('Selecciona una hora'); return }
    if (!edad || Number(edad) <= 0)         { setError('Ingresa tu edad');     return }
    setError('')
    setResultado(calcularSueno({
      hora,
      objetivo,
      edad: Number(edad),
    }))
  }

  // Hora actual como default
  function usarAhora() {
    const ahora = new Date()
    const h     = String(ahora.getHours()).padStart(2, '0')
    const m     = String(ahora.getMinutes()).padStart(2, '0')
    setHora(`${h}:${m}`)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Objetivo */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">¿Qué quieres calcular?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                value: 'despertar' as Objetivo,
                label: '⏰ Quiero despertar a las...',
                desc:  '¿A qué hora me debo dormir?',
                icon:  Sun,
              },
              {
                value: 'dormir' as Objetivo,
                label: '🌙 Me voy a dormir a las...',
                desc:  '¿A qué hora debo despertar?',
                icon:  Moon,
              },
            ].map((op) => (
              <button
                key={op.value}
                onClick={() => { setObjetivo(op.value); setResultado(null) }}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  objetivo === op.value
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-200 hover:border-indigo-300'
                )}
              >
                <p className={cn('text-sm font-bold', objetivo === op.value ? 'text-white' : 'text-slate-700')}>
                  {op.label}
                </p>
                <p className={cn('text-xs mt-1', objetivo === op.value ? 'text-indigo-200' : 'text-slate-400')}>
                  {op.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Hora + edad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              {objetivo === 'despertar' ? 'Hora de despertar' : 'Hora de dormir'}
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
              <button
                onClick={usarAhora}
                className="px-3 py-2 text-xs border border-slate-200 rounded-lg hover:border-indigo-300 text-slate-500 hover:text-indigo-600 transition-all whitespace-nowrap"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Tu edad</label>
            <input
              type="number"
              placeholder="30"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          onClick={calcular}
          size="lg"
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
        >
          Calcular horarios de sueño
        </Button>
      </div>

      {/* Resultados */}
      {resultado && (
        <>
          <AccionesResultado
            mensaje={`😴 *Calculadora de Sueño* — CalcFácil\n\n${objetivo === 'despertar' ? `⏰ Despertar: ${hora}` : `🌙 Dormir: ${hora}`}\n\nMejores horarios:\n${resultado.opciones.slice(0, 3).map((o) => `${o.calidad === 'óptimo' ? '✅' : '🔵'} ${o.hora} (${o.ciclos} ciclos · ${o.horas}h)`).join('\n')}\n\n_Calculado en CalcFácil 🧮_`}
            elementoId="resultado-sueno"
            nombreArchivo="calculadora-sueno"
          />

          <div id="resultado-sueno" className="space-y-6">

            {/* Info de horas ideales */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-indigo-200 text-sm">Horas de sueño recomendadas para tu edad</p>
                <p className="text-4xl font-black mt-1">{resultado.horasIdeal}h</p>
                <p className="text-indigo-200 text-xs mt-1">
                  Basado en guías de la National Sleep Foundation
                </p>
              </div>
              <Moon className="w-16 h-16 text-indigo-400" />
            </div>

            {/* Opciones de horario */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800">
                {objetivo === 'despertar'
                  ? '🌙 Horarios para dormir'
                  : '☀️ Horarios para despertar'}
              </h3>

              {resultado.opciones.map((op, i) => {
                const styles = CALIDAD_STYLES[op.calidad]
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
                      styles.bg,
                      i === 0 ? 'ring-2 ring-offset-2 ring-indigo-400' : ''
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('w-3 h-3 rounded-full', styles.dot)} />
                      <div>
                        <p className="text-2xl font-black text-slate-800">{op.hora}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {op.ciclos} ciclos de sueño · {op.horas} horas
                        </p>
                      </div>
                    </div>
                    <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full capitalize', styles.badge)}>
                      {op.calidad}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Consejo */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-700 mb-1">💡 Consejo</p>
              <p className="text-sm text-slate-500">{resultado.consejo}</p>
            </div>

            {/* Info ciclos */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">¿Cómo funciona un ciclo de sueño?</h3>
              <div className="flex items-center gap-2 mb-4">
                {[
                  { label: 'Adormecimiento', color: 'bg-slate-300', min: '14 min' },
                  { label: 'Sueño ligero',   color: 'bg-blue-300',  min: '20 min' },
                  { label: 'Sueño profundo', color: 'bg-indigo-500', min: '40 min' },
                  { label: 'REM',            color: 'bg-purple-500', min: '30 min' },
                ].map((fase) => (
                  <div key={fase.label} className="flex-1 text-center">
                    <div className={cn('h-3 rounded-full mb-1', fase.color)} />
                    <p className="text-xs text-slate-500 hidden sm:block">{fase.label}</p>
                    <p className="text-xs font-medium text-slate-600">{fase.min}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 text-center">
                Cada ciclo dura ~90 min · Despertar entre ciclos evita el aturdimiento
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}