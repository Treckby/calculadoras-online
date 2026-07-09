import { CALCULADORAS } from './lib/calculadoras/lista'
import { CalcCard } from './components/ui/CalcCard'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Calculadoras <span className="text-blue-600">Online Gratis</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Herramientas sencillas y precisas para tomar mejores decisiones financieras, de salud y más.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULADORAS.map((calc) => (
          <CalcCard key={calc.href} {...calc} />
        ))}
      </div>
    </div>
  )
}