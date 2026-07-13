export type NivelActividadHidratacion =
  | 'sedentario'
  | 'ligero'
  | 'moderado'
  | 'intenso'
  | 'atleta'

export type ClimaHidratacion = 'frio' | 'templado' | 'caluroso' | 'muy_caluroso'

export interface HidratacionDatos {
  peso:       number
  actividad:  NivelActividadHidratacion
  clima:      ClimaHidratacion
  embarazada: boolean
  lactando:   boolean
}

export interface HidratacionResultado {
  litrosBase:       number
  litrosActividad:  number
  litrosClima:      number
  litrosExtra:      number
  litrosTotales:    number
  vasos:            number       // vasos de 250ml
  recordatorios:    string[]     // horario sugerido
}

const FACTOR_ACTIVIDAD: Record<NivelActividadHidratacion, number> = {
  sedentario: 0,
  ligero:     0.35,
  moderado:   0.5,
  intenso:    0.75,
  atleta:     1.0,
}

const FACTOR_CLIMA: Record<ClimaHidratacion, number> = {
  frio:        0,
  templado:    0,
  caluroso:    0.35,
  muy_caluroso:0.5,
}

export function calcularHidratacion(datos: HidratacionDatos): HidratacionResultado {
  const { peso, actividad, clima, embarazada, lactando } = datos

  const litrosBase      = peso * 0.033
  const litrosActividad = FACTOR_ACTIVIDAD[actividad]
  const litrosClima     = FACTOR_CLIMA[clima]
  const litrosExtra     = (embarazada ? 0.3 : 0) + (lactando ? 0.7 : 0)

  const litrosTotales = parseFloat(
    (litrosBase + litrosActividad + litrosClima + litrosExtra).toFixed(2)
  )
  const vasos = Math.ceil(litrosTotales / 0.25)

  // Generar recordatorios cada 1-2 horas entre 7am y 10pm
  const recordatorios: string[] = []
  const horas = ['7:00', '8:30', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30', '22:00']
  const intervalos = Math.min(vasos, horas.length)
  for (let i = 0; i < intervalos; i++) {
    recordatorios.push(`${horas[i]} — ${(litrosTotales / intervalos * 1000).toFixed(0)}ml`)
  }

  return {
    litrosBase:      parseFloat(litrosBase.toFixed(2)),
    litrosActividad,
    litrosClima,
    litrosExtra,
    litrosTotales,
    vasos,
    recordatorios,
  }
}