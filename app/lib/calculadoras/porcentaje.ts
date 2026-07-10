export type OperacionPorcentaje =
  | 'porcentaje_de'      // ¿Cuánto es X% de Y?
  | 'que_porcentaje'     // ¿X es qué % de Y?
  | 'aumento'            // ¿Cuánto es Y aumentado X%?
  | 'disminucion'        // ¿Cuánto es Y disminuido X%?
  | 'variacion'          // ¿Cuánto % cambió de X a Y?

export interface PorcentajeDatos {
  operacion: OperacionPorcentaje
  valorA: number
  valorB: number
}

export interface PorcentajeResultado {
  resultado: number
  descripcion: string
}

export function calcularPorcentaje(datos: PorcentajeDatos): PorcentajeResultado {
  const { operacion, valorA, valorB } = datos

  switch (operacion) {
    case 'porcentaje_de':
      return {
        resultado:   (valorA / 100) * valorB,
        descripcion: `El ${valorA}% de ${valorB}`,
      }
    case 'que_porcentaje':
      return {
        resultado:   (valorA / valorB) * 100,
        descripcion: `${valorA} es el _% de ${valorB}`,
      }
    case 'aumento':
      return {
        resultado:   valorB * (1 + valorA / 100),
        descripcion: `${valorB} aumentado un ${valorA}%`,
      }
    case 'disminucion':
      return {
        resultado:   valorB * (1 - valorA / 100),
        descripcion: `${valorB} disminuido un ${valorA}%`,
      }
    case 'variacion':
      return {
        resultado:   ((valorB - valorA) / valorA) * 100,
        descripcion: `Variación de ${valorA} a ${valorB}`,
      }
  }
}