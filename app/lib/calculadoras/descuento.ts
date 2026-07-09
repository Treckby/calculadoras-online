export interface DescuentoDatos {
  precioOriginal: number
  descuento: number
  esProcentaje: boolean
}

export interface DescuentoResultado {
  precioOriginal: number
  montoDescuento: number
  precioFinal: number
  porcentajeAhorro: number
}

export function calcularDescuento(datos: DescuentoDatos): DescuentoResultado {
  const { precioOriginal, descuento, esProcentaje } = datos

  const montoDescuento = esProcentaje
    ? precioOriginal * (descuento / 100)
    : descuento

  const precioFinal      = Math.max(0, precioOriginal - montoDescuento)
  const porcentajeAhorro = (montoDescuento / precioOriginal) * 100

  return {
    precioOriginal,
    montoDescuento,
    precioFinal,
    porcentajeAhorro,
  }
}