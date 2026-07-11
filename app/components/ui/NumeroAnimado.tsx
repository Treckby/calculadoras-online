'use client'

import { useEffect, useRef, useState } from 'react'

interface NumeroAnimadoProps {
  valor:     number
  duracion?: number     // ms
  decimales?: number
  prefijo?:  string
  sufijo?:   string
}

export function NumeroAnimado({
  valor,
  duracion  = 1000,
  decimales = 2,
  prefijo   = '',
  sufijo    = '',
}: NumeroAnimadoProps) {
  const [display, setDisplay] = useState(0)
const rafRef = useRef<number | null>(null)
const inicioRef = useRef<number | null>(null)
const formatter = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: decimales,
  maximumFractionDigits: decimales,
})

  useEffect(() => {
    const inicio   = performance.now()
    inicioRef.current = inicio

    function animar(ahora: number) {
      const progreso = Math.min((ahora - inicio) / duracion, 1)
      // Easing ease-out
      const ease     = 1 - Math.pow(1 - progreso, 3)
      setDisplay(ease * valor)

      if (progreso < 1) {
        rafRef.current = requestAnimationFrame(animar)
      }
    }

    rafRef.current = requestAnimationFrame(animar)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [valor, duracion])

  return (
    <span>
      {prefijo}{formatter.format(display)}{sufijo}
    </span>
  )
}