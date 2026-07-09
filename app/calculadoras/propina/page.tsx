import { UtensilsCrossed } from 'lucide-react'
import { CalculadoraPropina } from '../../components/calculadoras/CalculadoraPropina'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Propina',
  description: 'Calcula la propina de forma fácil y divide la cuenta entre varias personas.',
  keywords: ['calculadora propina', 'dividir cuenta restaurante', 'cuanto dar de propina'],
}

export default function PropinaPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-propina" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-pink-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Propina</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Calcula la propina y divide la cuenta entre todos fácilmente.
        </p>
        <CalculadoraPropina />
      </div>
    </>
  )
}