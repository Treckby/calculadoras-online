export type OperacionIva = 'agregar' | 'quitar' | 'calcular'

export interface IvaDatos {
  monto: number
  porcentaje: number
  operacion: OperacionIva
}

export interface IvaResultado {
  montoOriginal: number
  montoIva: number
  montoFinal: number
  porcentaje: number
}

export function calcularIva(datos: IvaDatos): IvaResultado {
  const { monto, porcentaje, operacion } = datos
  const factor = porcentaje / 100

  if (operacion === 'agregar') {
    // Precio sin IVA → precio con IVA
    const montoIva   = monto * factor
    const montoFinal = monto + montoIva
    return { montoOriginal: monto, montoIva, montoFinal, porcentaje }
  }

  if (operacion === 'quitar') {
    // Precio con IVA → precio sin IVA
    const montoOriginal = monto / (1 + factor)
    const montoIva      = monto - montoOriginal
    return { montoOriginal, montoIva, montoFinal: monto, porcentaje }
  }

  // Solo calcular el monto del IVA
  const montoIva = monto * factor
  return { montoOriginal: monto, montoIva, montoFinal: monto + montoIva, porcentaje }
}