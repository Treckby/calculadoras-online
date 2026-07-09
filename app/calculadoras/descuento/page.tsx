import { Tag } from 'lucide-react'
import { CalculadoraDescuento } from '../../components/calculadoras/CalculadoraDescuento'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Descuentos',
  description: 'Calcula el precio final con descuento al instante. Ideal para ofertas, Buen Fin y liquidaciones.',
  keywords: ['calculadora descuento', 'precio con descuento', 'cuanto es el descuento', 'buen fin'],
}

export default function DescuentoPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-descuento" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Tag className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Descuentos</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Calcula el precio final con descuento en segundos — por porcentaje o cantidad fija.
        </p>
        <CalculadoraDescuento />
      </div>
    </>
  )
}