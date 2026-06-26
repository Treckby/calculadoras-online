import { Landmark } from 'lucide-react'
import { CalculadoraPrestamo } from '../../components/calculadoras/CalculadoraPrestamo'

export const metadata = {
  title: 'Calculadora de Préstamos | CalcFácil',
  description: 'Calcula tu cuota mensual, intereses y tabla de amortización de forma gratuita.',
}

export default function PrestamosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Landmark className="w-5 h-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Préstamos</h1>
      </div>
      <p className="text-slate-500 mb-8 ml-13">
        Ingresa el monto, tasa y plazo para ver tu cuota mensual y tabla de amortización completa.
      </p>

      <CalculadoraPrestamo />
    </div>
  )
}