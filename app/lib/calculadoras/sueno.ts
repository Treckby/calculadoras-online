export type ObjetivoSueno = 'despertar' | 'dormir'

export interface SuenoDatos {
  hora:     string    // HH:MM
  objetivo: ObjetivoSueno
  edad:     number
}

export interface SuenoResultado {
  opciones:      OpcionSueno[]
  cicloMinutos:  number
  horasIdeal:    number
  consejo:       string
}

export interface OpcionSueno {
  hora:          string
  ciclos:        number
  horas:         number
  calidad:       'óptimo' | 'bueno' | 'aceptable'
}

// Ciclo de sueño: 90 minutos promedio
const CICLO_MIN = 90
// Tiempo para quedarse dormido
const LATENCIA  = 14

function horasRecomendadas(edad: number): number {
  if (edad <= 2)  return 11
  if (edad <= 5)  return 10
  if (edad <= 12) return 9.5
  if (edad <= 17) return 9
  if (edad <= 64) return 8
  return 7.5
}

function sumarMinutos(hora: string, minutos: number): string {
  const [h, m] = hora.split(':').map(Number)
  const total  = h * 60 + m + minutos
  const hFinal = Math.floor(total / 60) % 24
  const mFinal = total % 60
  return `${String(hFinal).padStart(2, '0')}:${String(mFinal).padStart(2, '0')}`
}

function restarMinutos(hora: string, minutos: number): string {
  const [h, m] = hora.split(':').map(Number)
  let total     = h * 60 + m - minutos
  if (total < 0) total += 24 * 60
  const hFinal  = Math.floor(total / 60) % 24
  const mFinal  = total % 60
  return `${String(hFinal).padStart(2, '0')}:${String(mFinal).padStart(2, '0')}`
}

function calidad(ciclos: number, horasIdeal: number, horas: number): OpcionSueno['calidad'] {
  if (ciclos >= 5 && Math.abs(horas - horasIdeal) <= 1) return 'óptimo'
  if (ciclos >= 4) return 'bueno'
  return 'aceptable'
}

export function calcularSueno(datos: SuenoDatos): SuenoResultado {
  const { hora, objetivo, edad } = datos
  const horasIdeal = horasRecomendadas(edad)
  const opciones: OpcionSueno[] = []

  if (objetivo === 'dormir') {
    // Quiero dormir AHORA — ¿a qué hora debo despertar?
    for (let ciclos = 6; ciclos >= 3; ciclos--) {
      const minutosDormir = LATENCIA + ciclos * CICLO_MIN
      const horaDespertar = sumarMinutos(hora, minutosDormir)
      const horas         = parseFloat((ciclos * CICLO_MIN / 60).toFixed(1))
      opciones.push({
        hora:    horaDespertar,
        ciclos,
        horas,
        calidad: calidad(ciclos, horasIdeal, horas),
      })
    }
  } else {
    // Quiero despertar A ESTA HORA — ¿a qué hora debo dormir?
    for (let ciclos = 6; ciclos >= 3; ciclos--) {
      const minutosDormir  = LATENCIA + ciclos * CICLO_MIN
      const horaDormir     = restarMinutos(hora, minutosDormir)
      const horas          = parseFloat((ciclos * CICLO_MIN / 60).toFixed(1))
      opciones.push({
        hora:    horaDormir,
        ciclos,
        horas,
        calidad: calidad(ciclos, horasIdeal, horas),
      })
    }
  }

  const consejos: Record<string, string> = {
    óptimo:    'Excelente — despertar entre ciclos completos te dará energía máxima.',
    bueno:     'Buena opción si no puedes dormir más. Evita la cafeína 6h antes.',
    aceptable: 'Mínimo recomendado. Trata de compensar el fin de semana.',
  }

  return {
    opciones,
    cicloMinutos: CICLO_MIN,
    horasIdeal,
    consejo: consejos[opciones[0]?.calidad ?? 'bueno'],
  }
}