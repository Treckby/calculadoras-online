import { PrestamoDatos, PrestamoResultado } from '../../types'

export function calcularPrestamo(datos: PrestamoDatos): PrestamoResultado {
  const { monto, tasaAnual, plazoMeses } = datos
  const tasaMensual = tasaAnual / 100 / 12

  // Fórmula de cuota fija (sistema francés)
  const cuotaMensual =
    tasaMensual === 0
      ? monto / plazoMeses
      : (monto * tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) /
        (Math.pow(1 + tasaMensual, plazoMeses) - 1)

  const totalPagar = cuotaMensual * plazoMeses
  const totalIntereses = totalPagar - monto

  // Tabla de amortización
  let saldo = monto
  const tablaAmortizacion = Array.from({ length: plazoMeses }, (_, i) => {
    const interes = saldo * tasaMensual
    const capital = cuotaMensual - interes
    saldo = Math.max(0, saldo - capital)

    return {
      mes: i + 1,
      cuota: cuotaMensual,
      capital,
      interes,
      saldoPendiente: saldo,
    }
  })

  return { cuotaMensual, totalPagar, totalIntereses, tablaAmortizacion }
}