import Link            from 'next/link'
import { CONVERSORES } from '../lib/conversores'
import { RegistrarVisita } from '../components/seo/RegistrarVisita'

export const metadata = {
  title:       'Conversores de Unidades',
  description: 'Convierte temperatura, longitud, peso, área, velocidad, volumen y más al instante.',
  keywords:    ['conversor unidades', 'convertir medidas', 'conversion temperatura', 'conversion longitud'],
}

export default function ConversoresPage() {
  return (
    <>
      <RegistrarVisita pagina="conversores" />
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 mb-4">
            Conversores de Unidades
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Convierte entre unidades de medida al instante — temperatura, peso, longitud y más.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONVERSORES.map((conv) => (
            <Link
              key={conv.id}
              href={`/conversores/${conv.id}`}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{conv.icono}</div>
              <h2 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                Conversor de {conv.titulo}
              </h2>
              <p className="text-slate-500 text-sm">
                {Object.values(conv.unidades).slice(0, 4).map((u) => u.label.split(' ')[0]).join(' · ')}
                {Object.keys(conv.unidades).length > 4 ? ' · ...' : ''}
              </p>
              <div className="mt-4 text-xs font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
                Abrir conversor →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}