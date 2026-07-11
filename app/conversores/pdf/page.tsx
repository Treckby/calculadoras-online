import { FileText } from 'lucide-react'
import { Metadata } from 'next'
import { WebAppSchema } from '../../components/seo/JsonLd'
import PdfConversor from '../../components/conversores/DocToPdf'

export const metadata: Metadata = {
  title: 'Conversor de Documentos a PDF',
  description:
    'Convierte tus archivos Word, Excel o PowerPoint a PDF de manera rápida y sencilla.',
  keywords: [
    'conversor pdf', 'word a pdf', 'excel a pdf',
    'ppt a pdf', 'convertir documentos', 'herramienta online',
  ],
  alternates: { canonical: 'ttps://calcopolis.netlify.app/conversores/pdf' },
  openGraph: {
    title: 'Conversor de Documentos a PDF',
    description: 'Convierte Word, Excel y PowerPoint a PDF en segundos.',
    url: 'ttps://calcopolis.netlify.app/conversores/pdf',
    images: [{
      url: `/og?title=Conversor de Documentos a PDF&desc=Convierte Word, Excel y PowerPoint a PDF`,
      width: 1200,
      height: 630,
    }],
  },
}

export default function PdfPage() {
  return (
    <>
      <WebAppSchema
        name="Conversor de Documentos a PDF"
        description="Convierte tus archivos Word, Excel o PowerPoint a PDF fácilmente."
        url="ttps://calcopolis.netlify.app/conversores/pdf"
      />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Conversor a PDF</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Sube tu archivo Word, Excel o PowerPoint y conviértelo a PDF en segundos.
        </p>

        <PdfConversor />
      </div>
    </>
  )
}
