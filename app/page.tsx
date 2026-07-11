import { CALCULADORAS } from './lib/calculadoras/lista'
import { CalcCard } from './components/ui/CalcCard'
import { HeroStats }    from './components/layout/HeroStats'
import {
  Landmark, PiggyBank, Zap, Fuel, Receipt
} from 'lucide-react'

const DESTACADAS = [
  'calculadora-prestamos',
  'calculadora-ahorro',
  'calculadora-iva',
  'calculadora-gasolina',
  'calculadora-electricidad',
]

// Separa destacadas del resto
const calcDestacadas = CALCULADORAS.filter((c) =>
  DESTACADAS.some((d) => c.href.includes(d.replace('calculadora-', '')))
)
const calcResto = CALCULADORAS.filter((c) =>
  !DESTACADAS.some((d) => c.href.includes(d.replace('calculadora-', '')))
)

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* Círculos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Gratis · Sin registro · Sin publicidad
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Calculadoras Online
            <span className="block text-blue-200">Gratis en Español</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Préstamos, ahorro, calorías, electricidad, gasolina y mucho más.
            Resultados precisos al instante — sin complicaciones.
          </p>

          {/* Búsqueda rápida visual */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['Préstamos', 'IVA', 'Calorías', 'Gasolina', 'Propina', 'Descuentos'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <HeroStats />
        </div>
      </section>

      {/* ── Calculadoras destacadas ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Las más usadas</h2>
            <p className="text-slate-500 text-sm mt-1">Las herramientas que más te ayudarán</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calcDestacadas.map((calc) => (
            <CalcCard key={calc.href} {...calc} />
          ))}
        </div>
      </section>

      {/* ── Divisor ── */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-t border-slate-200" />
      </div>

      {/* ── Todas las calculadoras ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Todas las calculadoras</h2>
          <p className="text-slate-500 text-sm mt-1">{CALCULADORAS.length} herramientas disponibles</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calcResto.map((calc) => (
            <CalcCard key={calc.href} {...calc} />
          ))}
        </div>
      </section>

      {/* ── Banner CTA ── */}
      <section className="bg-slate-900 text-white py-16 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿No encuentras la calculadora que necesitas?
          </h2>
          <p className="text-slate-400 mb-8">
            Estamos agregando nuevas herramientas constantemente.
            Seguimos creciendo para ayudarte mejor.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Conversores', 'Herramientas de texto', 'Generadores', 'Finanzas avanzadas'].map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm"
              >
                🔜 {cat}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}