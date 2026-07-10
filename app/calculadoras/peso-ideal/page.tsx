import { Scale } from 'lucide-react'
import { CalculadoraPesoIdeal } from '../../components/calculadoras/CalculadoraPesoIdeal'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Peso Ideal e IMC',
  description: 'Calcula tu IMC y peso ideal según tu altura, peso y sexo con múltiples fórmulas médicas.',
  keywords: ['peso ideal', 'imc', 'indice masa corporal', 'calcular imc', 'peso saludable'],
}

export default function PesoIdealPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-peso-ideal" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-lime-50 rounded-xl flex items-center justify-center">
            <Scale className="w-5 h-5 text-lime-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Peso Ideal e IMC</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Calcula tu IMC y descubre tu rango de peso saludable según múltiples fórmulas médicas.
        </p>
        <CalculadoraPesoIdeal />
      </div>
    </>
  )
}