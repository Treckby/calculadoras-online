import { Fuel } from 'lucide-react'
import { CalculadoraGasolina } from '../../components/calculadoras/CalculadoraGasolina'
import { Metadata } from 'next'
import { WebAppSchema } from '../../components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Calculadora de Gasto en Gasolina',
  description:
    'Calcula cuánto gastas en gasolina por viaje, al mes y al año. Compara magna, premium y diésel, y descubre cuánto ahorrarías mejorando el rendimiento.',
  keywords: [
    'calculadora gasolina', 'gasto en gasolina', 'rendimiento de auto',
    'precio gasolina mexico', 'km por litro', 'cuanto gasto en gasolina',
  ],
  alternates: { canonical: 'https://tudominio.com/calculadoras/gasolina' },
  openGraph: {
    title: 'Calculadora de Gasto en Gasolina',
    description: 'Calcula tu gasto mensual en combustible y cuánto podrías ahorrar.',
    url: 'https://tudominio.com/calculadoras/gasolina',
      images: [{
    url: `/og?title=Calculadora de Gasto en Gasolina&desc=Calcula tu gasto mensual en combustible`,
    width: 1200,
    height: 630,
  }],
  },
}

export default function GasolinaPage() {
  return (
        <>
      <WebAppSchema
        name="Calculadora de Gasto en Gasolina"
        description="Calcula tu gasto mensual en combustible y cuánto podrías ahorrar."
        url="https://tudominio.com/calculadoras/prestamos"
      />
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
          <Fuel className="w-5 h-5 text-rose-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Calculadora de Gasolina</h1>
      </div>
      <p className="text-slate-500 mb-8">
        Calcula tu gasto real en combustible por viaje, mes y año — y cuánto podrías ahorrar.
      </p>
      <CalculadoraGasolina />
    </div>
    </>
  )
}