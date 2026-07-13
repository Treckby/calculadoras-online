import { Moon }               from 'lucide-react'
import { CalculadoraSueno }   from '../../components/calculadoras/CalculadoraSueno'
import { RegistrarVisita }    from '../../components/seo/RegistrarVisita'
import { Breadcrumbs }        from '../../components/layout/Breadcrumbs'

export const metadata = {
  title:       'Calculadora de Sueño',
  description: 'Calcula a qué hora dormir o despertar para completar ciclos de sueño y descansar mejor.',
  keywords:    ['calculadora sueno', 'ciclos de sueno', 'hora de dormir', 'hora despertar', 'descanso'],
}

export default function SuenoPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-sueno" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Calculadora de Sueño" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Moon className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Sueño</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Calcula los mejores horarios para dormir y despertar completando ciclos de sueño de 90 minutos.
        </p>
        <CalculadoraSueno />
      </div>
    </>
  )
}