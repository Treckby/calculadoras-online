import { Apple } from 'lucide-react'
import { CalculadoraCalorias } from '../../components/calculadoras/CalculadoraCalorias'
import { Metadata } from 'next'
import { WebAppSchema } from '../../components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Calculadora de Calorías y Macros',
  description:
    'Calcula tus calorías diarias con la fórmula Mifflin-St Jeor. Obtén tu TMB, TDEE y distribución de macronutrientes según tu objetivo.',
  keywords: [
    'calculadora de calorias', 'tmb', 'tdee', 'macronutrientes',
    'perder peso', 'ganar musculo', 'dieta', 'imc',
  ],
  alternates: { canonical: 'https://calcopolis.netlify.app/calculadoras/calorias' },
  openGraph: {
    title: 'Calculadora de Calorías y Macronutrientes',
    description: 'Calcula tu TMB, TDEE y macros diarios según tu cuerpo y objetivo.',
    url: 'https://calcopolis.netlify.app/calculadoras/calorias',
      images: [{
    url: `/og?title=Calculadora de Calorías y Macronutrientes&desc=Calcula tu TMB, TDEE`,
    width: 1200,
    height: 630,
  }],
  },
}

export default function CaloriasPage() {
  return (
        <>
      <WebAppSchema
        name="Calculadora de Calorías y Macronutrientes"
        description="Calculadora de Calorías y Macronutrientes."
        url="https://calcopolis.netlify.app/calculadoras/prestamos"
      />
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
          <Apple className="w-5 h-5 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Calorías</h1>
      </div>
      <p className="text-slate-500 mb-8">
        Usa la fórmula Mifflin-St Jeor para calcular tu gasto calórico real y tus macros diarios.
      </p>
      <CalculadoraCalorias />
    </div>
    </>
  )
}