'use client'

import { BotonPDF } from './BotonPDF'

interface ResultadoExportableProps {
  id: string
  nombreArchivo: string
  titulo: string
  children: React.ReactNode
  mostrar: boolean      // solo muestra el botón cuando hay resultado
}

export function ResultadoExportable({
  id,
  nombreArchivo,
  titulo,
  children,
  mostrar,
}: ResultadoExportableProps) {
  return (
    <div>
      {/* Botón de exportar — solo visible cuando hay resultado */}
      {mostrar && (
        <div className="flex justify-end mb-4">
          <BotonPDF elementoId={id} nombreArchivo={nombreArchivo} />
        </div>
      )}

      {/* Área exportable */}
      <div id={id}>
        {/* Header del PDF — solo visible al exportar */}
        {mostrar && (
          <div className="hidden-screen pdf-header bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{titulo}</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Generado el {new Date().toLocaleDateString('es-MX', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}