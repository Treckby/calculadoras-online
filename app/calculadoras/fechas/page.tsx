import { CalendarDays } from 'lucide-react'
import { CalculadoraFechas } from '../../components/calculadoras/CalculadoraFechas'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Fechas',
  description: 'Calcula los días entre dos fechas incluyendo días hábiles y fines de semana.',
  keywords: ['calculadora fechas', 'dias entre fechas', 'dias habiles', 'cuantos dias faltan'],
}

export default function FechasPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-fechas" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Fechas</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Calcula cuántos días hay entre dos fechas, incluyendo días hábiles y fines de semana.
        </p>
        <CalculadoraFechas />
      </div>
    </>
  )
}