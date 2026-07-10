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
  fines: number
  esFuturo: boolean
}

export function calcularFechas(datos: FechasDatos): FechasResultado {
  const inicio = new Date(datos.fechaInicio)
  const fin    = new Date(datos.fechaFin)

  const diffMs   = fin.getTime() - inicio.getTime()
  const esFuturo = diffMs >= 0
  const absDiff  = Math.abs(diffMs)

  const dias    = Math.floor(absDiff / (1000 * 60 * 60 * 24))
  const semanas = parseFloat((dias / 7).toFixed(1))
  const meses   = parseFloat((dias / 30.44).toFixed(1))
  const anios   = parseFloat((dias / 365.25).toFixed(2))

  // Contar días hábiles (lunes a viernes)
  let diasHabiles = 0
  let fines       = 0
  const cursor    = new Date(Math.min(inicio.getTime(), fin.getTime()))
  const limite    = new Date(Math.max(inicio.getTime(), fin.getTime()))

  while (cursor <= limite) {
    const dia = cursor.getDay()
    if (dia === 0 || dia === 6) fines++
    else diasHabiles++
    cursor.setDate(cursor.getDate() + 1)
  }

  return { dias, semanas, meses, anios, diasHabiles, fines, esFuturo }
}

export function hoy(): string {
  return new Date().toISOString().split('T')[0]
}