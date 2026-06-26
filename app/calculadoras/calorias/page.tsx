import { Apple } from 'lucide-react'
import { CalculadoraCalorias } from '../../components/calculadoras/CalculadoraCalorias'

export const metadata = {
  title: 'Calculadora de Calorías | CalcFácil',
  description: 'Calcula tus calorías diarias y macronutrientes según tu cuerpo y objetivo.',
}

export default function CaloriasPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
          <Apple className="w-5 h-5 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Calorías</h1>
      </div>
      <p className="text-slate-500 mb-8">
        Usa la fórmula Mifflin-St Jeor para calcular tu gasto calórico real y tus macros diarios.
      </p>
      <CalculadoraCalorias />
    </div>
  )
}