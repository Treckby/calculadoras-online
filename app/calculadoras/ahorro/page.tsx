import { PiggyBank } from 'lucide-react'
import { CalculadoraAhorro } from '../../components/calculadoras/CalculadoraAhorro'
import { Metadata } from 'next'
import { WebAppSchema } from '../../components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Calculadora de Ahorro',
  description:
    'Proyecta el crecimiento de tu ahorro con interés compuesto. Simula depósitos mensuales y descubre cuánto tendrás en 5, 10 o 20 años.',
  keywords: [
    'calculadora de ahorro', 'interes compuesto', 'proyeccion de ahorro',
    'ahorro mensual', 'simulador de ahorro', 'rendimiento de inversión',
  ],
  alternates: { canonical: 'https://calcopolis.netlify.app/calculadoras/ahorro' },
  openGraph: {
    title: 'Calculadora de Ahorro con Interés Compuesto',
    description: 'Descubre cuánto crecerá tu ahorro con interés compuesto mes a mes.',
    url: 'https://calcopolis.netlify.app/calculadoras/ahorro',
      images: [{
    url: `/og?title=Calculadora de Ahorro con Interés Compuesto&desc=Descubre cuánto crecerá tu ahorro con interés`,
    width: 1200,
    height: 630,
  }],
  },
}

export default function AhorroPage() {
  return (
    <>
      <WebAppSchema
        name="Calculadora de Ahorro con Interés Compuesto'"
        description="Calcula tu cuota mensual e intereses de cualquier préstamo."
        url="https://calcopolis.netlify.app/calculadoras/prestamos"
      />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Ahorro</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Simula el crecimiento de tu ahorro con interés compuesto mes a mes.
        </p>

        <CalculadoraAhorro />
      </div>
    </>
  )
}