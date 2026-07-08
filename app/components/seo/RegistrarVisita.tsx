'use client'

import { useEffect } from 'react'
import { registrarVisita } from '../../lib/actions/visitas'

interface Props {
  pagina: string
}

export function RegistrarVisita({ pagina }: Props) {
  useEffect(() => {
    registrarVisita(pagina)
  }, [pagina])

  return null  // no renderiza nada visible
}