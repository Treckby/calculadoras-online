import { DollarSign } from 'lucide-react'
import { CalculadoraTipoCambio } from '../../components/calculadoras/CalculadoraTipoCambio'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Tipo de Cambio',
  description: 'Convierte pesos mexicanos a dólares, euros y más con tasas actualizadas en tiempo real.',
  keywords: ['tipo de cambio', 'dolar hoy', 'peso mexicano', 'convertir divisas', 'mxn usd', 'euro peso'],
}

export default function TipoCambioPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-tipo-cambio" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-cyan-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Tipo de Cambio</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Convierte entre pesos, dólares, euros y más con tasas actualizadas cada hora.
        </p>
        <CalculadoraTipoCambio />
      </div>
    </>
  )
}