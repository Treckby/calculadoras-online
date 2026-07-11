'use client'

import { BotonWhatsApp } from './BotonWhatsApp'
import { BotonPDF }      from './BotonPDF'

interface AccionesResultadoProps {
  mensaje:       string
  elementoId:    string
  nombreArchivo: string
}

export function AccionesResultado({
  mensaje,
  elementoId,
  nombreArchivo,
}: AccionesResultadoProps) {
  return (
    <div className="flex items-center justify-end gap-2 mb-4">
      <BotonWhatsApp mensaje={mensaje} />
      <BotonPDF elementoId={elementoId} nombreArchivo={nombreArchivo} />
    </div>
  )
}