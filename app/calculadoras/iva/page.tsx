import { Receipt } from 'lucide-react'
import { CalculadoraIva } from '../../components/calculadoras/CalculadoraIva'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de IVA',
  description: 'Agrega o quita el IVA a cualquier precio. Calcula el 16% y 8% de IVA en México al instante.',
  keywords: ['calculadora iva', 'calcular iva mexico', 'precio sin iva', 'precio con iva', '16% iva'],
}

export default function IvaPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-iva" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
            <Receipt className="w-5 h-5 text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de IVA</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Agrega o quita el IVA a cualquier precio. Tasa general 16% · Zona fronteriza 8%.
        </p>
        <CalculadoraIva />
      </div>
    </>
  )
}