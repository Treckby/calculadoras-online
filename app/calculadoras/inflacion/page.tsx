import { TrendingUp } from 'lucide-react'
import { CalculadoraInflacion } from '../../components/calculadoras/CalculadoraInflacion'
import { RegistrarVisita } from '../../components/seo/RegistrarVisita'

export const metadata = {
  title: 'Calculadora de Inflación',
  description: 'Calcula cómo la inflación afecta el poder adquisitivo de tu dinero a lo largo del tiempo.',
  keywords: ['calculadora inflacion', 'poder adquisitivo', 'inflacion mexico', 'valor del dinero'],
}

export default function InflacionPage() {
  return (
    <>
      <RegistrarVisita pagina="calculadora-inflacion" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Calculadora de Inflación</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Descubre cómo la inflación erosiona el poder adquisitivo de tu dinero año a año.
        </p>
        <CalculadoraInflacion />
      </div>
    </>
  )
}