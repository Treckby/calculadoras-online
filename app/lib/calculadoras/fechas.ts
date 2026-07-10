export interface FechasDatos {
  fechaInicio: string
  fechaFin: string
}

export interface FechasResultado {
  dias: number
  semanas: number
  meses: number
  anios: number
  diasHabiles: number
  diasFinDeSemana: number
  esFuturo: boolean
}

export function calcularFechas(datos: FechasDatos): FechasResultado {
  const inicio = new Date(datos.fechaInicio)
  const fin    = new Date(datos.fechaFin)
  const esFuturo = fin > inicio

  const [desde, hasta] = esFuturo ? [inicio, fin] : [fin, inicio]

  const diffMs   = hasta.getTime() - desde.getTime()
  const dias     = Math.round(diffMs / (1000 * 60 * 60 * 24))
  const semanas  = parseFloat((dias / 7).toFixed(1))
  const meses    = parseFloat((dias / 30.44).toFixed(1))
  const anios    = parseFloat((dias / 365.25).toFixed(2))

  // Contar días hábiles (lunes a viernes)
  let diasHabiles = 0
  let diasFinDeSemana = 0
  const cursor = new Date(desde)

  while (cursor <= hasta) {
    const dia = cursor.getDay()
    if (dia === 0 || dia === 6) {
      diasFinDeSemana++
    } else {
      diasHabiles++
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return { dias, semanas, meses, anios, diasHabiles, diasFinDeSemana, esFuturo }
}

export function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}