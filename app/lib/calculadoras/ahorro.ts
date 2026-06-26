import { AhorroDatos, AhorroResultado } from '../../types'

export function calcularAhorro(datos: AhorroDatos): AhorroResultado {
  const { montoInicial, aporteMensual, tasaAnual, plazoAnios } = datos
  const tasaMensual = tasaAnual / 100 / 12
  const meses = plazoAnios * 12

  let saldo = montoInicial
  let totalAportado = montoInicial
  const proyeccion: AhorroResultado['proyeccion'] = []

  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo * (1 + tasaMensual) + aporteMensual
    totalAportado += aporteMensual

    // Guardar snapshot anual
    if (mes % 12 === 0) {
      proyeccion.push({
        anio: mes / 12,
        saldo: parseFloat(saldo.toFixed(2)),
        aportado: parseFloat(totalAportado.toFixed(2)),
        intereses: parseFloat((saldo - totalAportado).toFixed(2)),
      })
    }
  }

  return {
    totalAhorrado: parseFloat(saldo.toFixed(2)),
    totalAportado: parseFloat(totalAportado.toFixed(2)),
    totalIntereses: parseFloat((saldo - totalAportado).toFixed(2)),
    proyeccion,
  }
}