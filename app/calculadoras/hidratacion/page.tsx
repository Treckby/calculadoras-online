import { Droplets }               from 'lucide-react'
import { CalculadoraHidratacion } from '../../components/calculadoras/CalculadoraHidratacion'
import { RegistrarVisita }        from '../../components/seo/RegistrarVisita'
import { Breadcrumbs }            from '../../components/layout/Breadcrumbs'

export const metadata = {
  title:       'Calculadora de Hidratación',
  description: 'Calcula cuánta agua debes tomar al día según tu peso, actividad física y clima.',
  keywords:    ['calculadora hidratacion', 'cuanta agua tomar', 'litros de agua al dia', 'hidratacion diaria'],
}

export default function HidratacionPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-hidratacion" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Calculadora de Hidratación" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
            <Droplets className="w-5 h-5 text-cyan-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Hidratación</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Descubre cuánta agua necesitas tomar al día según tu cuerpo, actividad y clima.
        </p>
        <CalculadoraHidratacion />
      </div>
    </>
  )
}