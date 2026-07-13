import { Briefcase }            from 'lucide-react'
import { CalculadoraFiniquito } from '../../components/calculadoras/CalculadoraFiniquito'
import { RegistrarVisita }      from '../../components/seo/RegistrarVisita'
import { Breadcrumbs }          from '../../components/layout/Breadcrumbs'

export const metadata = {
  title:       'Calculadora de Finiquito',
  description: 'Calcula tu finiquito según la Ley Federal del Trabajo: aguinaldo, vacaciones, prima vacacional e indemnización.',
  keywords:    ['calculadora finiquito', 'finiquito mexico', 'liquidacion laboral', 'lft', 'indemnizacion'],
}

export default function FiniquitoPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-finiquito" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Calculadora de Finiquito" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Finiquito</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Calcula tu finiquito o liquidación según la Ley Federal del Trabajo de México.
        </p>
        <CalculadoraFiniquito />
      </div>
    </>
  )
}