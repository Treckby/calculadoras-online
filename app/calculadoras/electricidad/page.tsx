import { Zap } from 'lucide-react'
import { CalculadoraElectricidad } from '../../components/calculadoras/CalculadoraElectricidad'

export const metadata = {
  title: 'Calculadora de Consumo Eléctrico | CalcFácil',
  description: 'Estima tu factura CFE y descubre qué aparatos consumen más electricidad.',
}

export default function ElectricidadPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Consumo Eléctrico</h1>
      </div>
      <p className="text-slate-500 mb-8">
        Agrega tus aparatos, ajusta las horas de uso y estima tu factura mensual de CFE.
      </p>
      <CalculadoraElectricidad />
    </div>
  )
}