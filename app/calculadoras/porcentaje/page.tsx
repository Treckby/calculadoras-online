import { Percent } from 'lucide-react'
import { CalculadoraPorcentaje } from '../../components/calculadoras/CalculadoraPorcentaje'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Porcentajes',
  description: 'Calcula porcentajes, aumentos, disminuciones y variaciones al instante.',
  keywords: ['calculadora porcentaje', 'calcular porcentaje', 'aumento porcentaje', 'variacion porcentual'],
}

export default function PorcentajePage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-porcentaje" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Percent className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Porcentajes</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Porcentajes, aumentos, disminuciones y variaciones — todo en un solo lugar.
        </p>
        <CalculadoraPorcentaje />
      </div>
    </>
  )
}