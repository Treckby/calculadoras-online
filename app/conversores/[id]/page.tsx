import { notFound }          from 'next/navigation'
import { CONVERSORES }       from '../../lib/conversores'
import { ConversorUniversal } from '../../components/conversores/ConversorUniversal'
import { RegistrarVisita }   from '../../components/seo/RegistrarVisita'
import { Breadcrumbs }       from '../../components/layout/Breadcrumbs'

export async function generateStaticParams() {
  return CONVERSORES.map((c) => ({ id: c.id }))
}


export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params
  const conv = CONVERSORES.find((c) => c.id === id)
  if (!conv) notFound()
  return {
    title: `Conversor de ${conv.titulo}`,
    description: `Convierte entre ${Object.values(conv.unidades)
      .map((u) => u.label)
      .join(', ')} al instante.`,
  }
}
export default async function ConversorPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const conv = CONVERSORES.find((c) => c.id === id)
  if (!conv) notFound()

  return (
    <>
      <RegistrarVisita pagina={`conversor-${conv.id}`} />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs pagina={`Conversor de ${conv.titulo}`} categoria="Conversores" />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
            {conv.icono}
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Conversor de {conv.titulo}
          </h1>
        </div>
        <p className="text-slate-500 mb-8">
          Convierte entre {Object.values(conv.unidades).length} unidades de {conv.titulo.toLowerCase()} al instante.
        </p>

        <ConversorUniversal categoriaId={conv.id} />
      </div>
    </>
  )
}