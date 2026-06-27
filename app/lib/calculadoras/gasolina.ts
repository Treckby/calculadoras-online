import { GasolinaDatos, GasolinaResultado, TipoRuta } from '../../types'

// Factor de ajuste de rendimiento según tipo de ruta
const FACTOR_RUTA: Record<TipoRuta, number> = {
  ciudad:    0.80,   // -20% en ciudad (tráfico, frenadas)
  carretera: 1.10,   // +10% en carretera (velocidad constante)
  mixto:     1.00,   // rendimiento nominal
}

// kg de CO2 por litro quemado
const CO2_POR_LITRO: Record<string, number> = {
  magna:   2.31,
  premium: 2.35,
  diesel:  2.68,
}

export const PRECIOS_REFERENCIA = {
  magna:   20.50,
  premium: 22.80,
  diesel:  21.10,
}

export function calcularGasolina(datos: GasolinaDatos): GasolinaResultado {
  const { distanciaKm, rendimientoKml, tipoGasolina, precioLitro, tipoRuta, viajesAlMes } = datos

  const rendimientoAjustado = rendimientoKml * FACTOR_RUTA[tipoRuta]
  const litrosViaje          = distanciaKm / rendimientoAjustado
  const costoViaje           = litrosViaje * precioLitro
  const litrosMes            = litrosViaje * viajesAlMes
  const costoMes             = litrosMes * precioLitro
  const costoAnual           = costoMes * 12
  const emisionesCo2Mes      = litrosMes * CO2_POR_LITRO[tipoGasolina]

  return {
    litrosViaje:          parseFloat(litrosViaje.toFixed(2)),
    costoViaje:           parseFloat(costoViaje.toFixed(2)),
    litrosMes:            parseFloat(litrosMes.toFixed(2)),
    costoMes:             parseFloat(costoMes.toFixed(2)),
    costoAnual:           parseFloat(costoAnual.toFixed(2)),
    emisionesCo2Mes:      parseFloat(emisionesCo2Mes.toFixed(2)),
    rendimientoAjustado:  parseFloat(rendimientoAjustado.toFixed(1)),
  }
}