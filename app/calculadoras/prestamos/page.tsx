import { Landmark } from 'lucide-react'
import { CalculadoraPrestamo } from '../../components/calculadoras/CalculadoraPrestamo'
import type { Metadata } from 'next'
import { WebAppSchema } from '../../components/seo/JsonLd'


export const metadata: Metadata = {
  title: 'Calculadora de Préstamos',
  description:
    'Calcula tu cuota mensual, total de intereses y tabla de amortización completa. Ideal para préstamos personales, hipotecas y créditos de auto.',
  keywords: [
    'calculadora de prestamos', 'cuota mensual', 'tabla de amortizacion',
    'calculo de intereses', 'prestamo personal', 'credito hipotecario',
  ],
  alternates: { canonical: 'https://tudominio.com/calculadoras/prestamos' },
  openGraph: {
    title: 'Calculadora de Préstamos — Cuota y Amortización',
    description: 'Calcula tu cuota mensual e intereses totales de cualquier préstamo.',
    url: 'https://tudominio.com/calculadoras/prestamos',
    images: [{
      url: `/og?title=Calculadora de Préstamos&desc=Cuota mensual e intereses`,
      width: 1200,
      height: 630,
    }],
  },
}

export default function PrestamosPage() {
  return (

    <>
      <WebAppSchema
        name="Calculadora de Préstamos"
        description="Calcula tu cuota mensual e intereses totales de cualquier préstamo."
        url="https://tudominio.com/calculadoras/prestamos"
      />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Landmark className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Préstamos</h1>
        </div>
        <p className="text-slate-500 mb-8 ml-13">
          Ingresa el monto, tasa y plazo para ver tu cuota mensual y tabla de amortización completa.
        </p>

        <CalculadoraPrestamo />
      </div>
    </>
  )
}