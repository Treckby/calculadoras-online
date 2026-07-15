import Link            from 'next/link'
import { RegistrarVisita } from '@/app/components/seo/RegistrarVisita'

const HERRAMIENTAS = [
  {
    id:          'contador-palabras',
    titulo:      'Contador de Palabras',
    descripcion: 'Cuenta palabras, caracteres, oraciones y tiempo de lectura.',
    icono:       '📝',
    color:       'border-violet-200 hover:border-violet-400',
    bgHero:      'bg-violet-50',
  },
  {
    id:          'generador-contrasenas',
    titulo:      'Generador de Contraseñas',
    descripcion: 'Crea contraseñas seguras y aleatorias al instante.',
    icono:       '🔐',
    color:       'border-green-200 hover:border-green-400',
    bgHero:      'bg-green-50',
  },
  {
    id:          'conversor-texto',
    titulo:      'Conversor de Texto',
    descripcion: 'Convierte entre mayúsculas, minúsculas, título, camelCase y más.',
    icono:       '🔤',
    color:       'border-blue-200 hover:border-blue-400',
    bgHero:      'bg-blue-50',
  },
  {
    id:          'generador-curp',
    titulo:      'Generador de CURP',
    descripcion: 'Genera tu CURP a partir de tus datos personales.',
    icono:       '🪪',
    color:       'border-rose-200 hover:border-rose-400',
    bgHero:      'bg-rose-50',
  },
  {
    id:          'limpiador-texto',
    titulo:      'Limpiador de Texto',
    descripcion: 'Elimina espacios extra, líneas vacías y caracteres especiales.',
    icono:       '🧹',
    color:       'border-amber-200 hover:border-amber-400',
    bgHero:      'bg-amber-50',
  },
]

export const metadata = {
  title:       'Herramientas de Texto',
  description: 'Contador de palabras, generador de contraseñas, conversor de texto, CURP y más.',
  keywords:    ['herramientas texto', 'contador palabras', 'generador contrasenas', 'curp', 'conversor texto'],
}

export default function HerramientasPage() {
  return (
    <>
      <RegistrarVisita pagina="herramientas" />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 mb-4">
            Herramientas de Texto
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Utilidades para trabajar con texto — rápidas, gratuitas y sin registro.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HERRAMIENTAS.map((h) => (
            <Link
              key={h.id}
              href={`/herramientas/${h.id}`}
              className={`group bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${h.color}`}
            >
              <div className={`w-12 h-12 ${h.bgHero} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {h.icono}
              </div>
              <h2 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {h.titulo}
              </h2>
              <p className="text-slate-500 text-sm">{h.descripcion}</p>
              <div className="mt-4 text-xs font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
                Abrir herramienta →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}