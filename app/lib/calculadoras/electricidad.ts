import { Aparato, ElectricidadResultado } from '../../types'

export const APARATOS_COMUNES = [
  { nombre: 'Refrigerador',        potencia: 150 },
  { nombre: 'Aire acondicionado',  potencia: 1200 },
  { nombre: 'Lavadora',            potencia: 500 },
  { nombre: 'Televisor 40"',       potencia: 80 },
  { nombre: 'Computadora',         potencia: 200 },
  { nombre: 'Microondas',          potencia: 1000 },
  { nombre: 'Foco LED',            potencia: 10 },
  { nombre: 'Plancha de ropa',     potencia: 1100 },
  { nombre: 'Cafetera',            potencia: 900 },
  { nombre: 'Ventilador',          potencia: 60 },
]

export function calcularElectricidad(
  aparatos: Aparato[],
  tarifaKwh: number
): ElectricidadResultado {
  let totalKwhDia = 0

  const aparatosCalculados = aparatos.map((a) => {
    const kwhDia = (a.potencia * a.horas) / 1000
    const kwhMes = kwhDia * 30
    const costoMes = kwhMes * tarifaKwh
    totalKwhDia += kwhDia

    return { ...a, kwhDia, kwhMes, costoMes, porcentaje: 0 }
  })

  // Calcular porcentaje de cada aparato sobre el total
  const totalKwhMes = totalKwhDia * 30
  aparatosCalculados.forEach((a) => {
    a.porcentaje = totalKwhMes > 0
      ? parseFloat(((a.kwhMes / totalKwhMes) * 100).toFixed(1))
      : 0
  })

  const costoMes   = totalKwhMes * tarifaKwh
  const costoAnual = costoMes * 12

  return {
    aparatos: aparatosCalculados,
    totalKwhDia:  parseFloat(totalKwhDia.toFixed(3)),
    totalKwhMes:  parseFloat(totalKwhMes.toFixed(2)),
    costoMes:     parseFloat(costoMes.toFixed(2)),
    costoAnual:   parseFloat(costoAnual.toFixed(2)),
  }
}