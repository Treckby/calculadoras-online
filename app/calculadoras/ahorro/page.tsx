import { PiggyBank } from 'lucide-react'
import { CalculadoraAhorro } from '../../components/calculadoras/CalculadoraAhorro'

export const metadata = {
  title: 'Calculadora de Ahorro | CalcFácil',
  description: 'Proyecta tu ahorro con interés compuesto y descubre cuánto tendrás en el futuro.',
}

export default function AhorroPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
          <PiggyBank className="w-5 h-5 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Ahorro</h1>
      </div>
      <p className="text-slate-500 mb-8">
        Simula el crecimiento de tu ahorro con interés compuesto mes a mes.
      </p>

      <CalculadoraAhorro />
    </div>
  )
}