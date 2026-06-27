import { Zap } from 'lucide-react'
import { CalculadoraElectricidad } from '../../components/calculadoras/CalculadoraElectricidad'
import { Metadata } from 'next'
import { WebAppSchema } from '../../components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Calculadora de Consumo Eléctrico',
  description:
    'Estima tu factura de CFE mes a mes. Agrega tus aparatos eléctricos, horas de uso y tarifa por kWh para saber cuánto pagas de luz.',
  keywords: [
    'calculadora consumo electrico', 'factura cfe', 'kwh', 'tarifa electrica',
    'consumo de luz', 'ahorro energia', 'costo electricidad mexico',
  ],
  alternates: { canonical: 'https://tudominio.com/calculadoras/electricidad' },
  openGraph: {
    title: 'Calculadora de Consumo Eléctrico — Factura CFE',
    description: 'Calcula cuánto gastan tus aparatos y estima tu factura mensual de CFE.',
    url: 'https://tudominio.com/calculadoras/electricidad',
      images: [{
    url: `/og?title=Calculadora de Consumo Eléctrico — Factura CFE&desc=Calcula cuánto gastan tus aparatos`,
    width: 1200,
    height: 630,
  }],
  },
}

export default function ElectricidadPage() {
  return (
        <>
      <WebAppSchema
        name="Calculadora de Consumo Electrico"
        description="Calcula cuánto gastan tus aparatos y estima tu factura mensual de CFE."
        url="https://tudominio.com/calculadoras/prestamos"
      />
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Consumo Eléctrico</h1>
      </div>
      <p className="text-slate-500 mb-8">
        Agrega tus aparatos, ajusta las horas de uso y estima tu factura mensual de CFE.
      </p>
      <CalculadoraElectricidad />
    </div>
    </>
  )
}