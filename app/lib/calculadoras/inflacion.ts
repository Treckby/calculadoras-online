export interface InflacionDatos {
  cantidad:    number
  anioInicio:  number
  anioFin:     number
  tasaAnual:   number   // % promedio anual
}

export interface InflacionResultado {
  valorFuturo:      number
  valorPresente:    number
  perdidaPoder:     number
  porcentajePerdida: number
  proyeccion:       { anio: number; valor: number; podAdquisitivo: number }[]
}

export function calcularInflacion(datos: InflacionDatos): InflacionResultado {
  const { cantidad, anioInicio, anioFin, tasaAnual } = datos
  const anios  = Math.abs(anioFin - anioInicio)
  const factor = Math.pow(1 + tasaAnual / 100, anios)

  const valorFuturo       = cantidad * factor
  const perdidaPoder      = valorFuturo - cantidad
  const porcentajePerdida = ((factor - 1) * 100)

  // Proyección año a año
  const inicio = Math.min(anioInicio, anioFin)
  const proyeccion = Array.from({ length: anios + 1 }, (_, i) => {
    const f = Math.pow(1 + tasaAnual / 100, i)
    return {
      anio:           inicio + i,
      valor:          parseFloat((cantidad * f).toFixed(2)),
      podAdquisitivo: parseFloat((cantidad / f).toFixed(2)),
    }
  })

  return {
    valorFuturo:       parseFloat(valorFuturo.toFixed(2)),
    valorPresente:     cantidad,
    perdidaPoder:      parseFloat(perdidaPoder.toFixed(2)),
    porcentajePerdida: parseFloat(porcentajePerdida.toFixed(2)),
    proyeccion,
  }
}