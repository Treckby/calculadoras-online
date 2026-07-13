export interface FiniquitoDatos {
  salarioDiario:      number
  diasTrabajados:     number    // en el último año
  diasVacaciones:     number    // días de vacaciones según ley
  tipoSeparacion:     'renuncia' | 'despido' | 'mutuo_acuerdo'
  aniosTrabajados:    number
}

export interface FiniquitoResultado {
  partesPropAguinaldo:  number
  partesPropVacaciones: number
  primaPropVacacional:  number
  indemnizacion:        number   // solo en despido
  primaAntiguedad:      number
  total:                number
  desglose: {
    concepto: string
    monto:    number
    formula:  string
  }[]
}

export function calcularFiniquito(datos: FiniquitoDatos): FiniquitoResultado {
  const {
    salarioDiario,
    diasTrabajados,
    diasVacaciones,
    tipoSeparacion,
    aniosTrabajados,
  } = datos

  // 1. Partes proporcionales de aguinaldo (15 días por ley)
  const partesPropAguinaldo = (salarioDiario * 15 * diasTrabajados) / 365

  // 2. Vacaciones proporcionales
  const partesPropVacaciones = (salarioDiario * diasVacaciones * diasTrabajados) / 365

  // 3. Prima vacacional (25% sobre vacaciones)
  const primaPropVacacional = partesPropVacaciones * 0.25

  // 4. Indemnización — solo aplica en despido injustificado
  // 3 meses de salario + 20 días por año trabajado
  const indemnizacion = tipoSeparacion === 'despido'
    ? salarioDiario * 90 + salarioDiario * 20 * aniosTrabajados
    : 0

  // 5. Prima de antigüedad — 12 días por año (aplica en despido y renuncia con 15+ años)
  const primaAntiguedad =
    tipoSeparacion === 'despido' ||
    (tipoSeparacion === 'renuncia' && aniosTrabajados >= 15)
      ? salarioDiario * 12 * aniosTrabajados
      : 0

  const total =
    partesPropAguinaldo +
    partesPropVacaciones +
    primaPropVacacional +
    indemnizacion +
    primaAntiguedad

  const desglose = [
    {
      concepto: 'Partes proporcionales de aguinaldo',
      monto:    partesPropAguinaldo,
      formula:  `$${salarioDiario}/día × 15 días × ${diasTrabajados} días / 365`,
    },
    {
      concepto: 'Vacaciones proporcionales',
      monto:    partesPropVacaciones,
      formula:  `$${salarioDiario}/día × ${diasVacaciones} días × ${diasTrabajados} días / 365`,
    },
    {
      concepto: 'Prima vacacional (25%)',
      monto:    primaPropVacacional,
      formula:  `Vacaciones × 25%`,
    },
    ...(indemnizacion > 0 ? [{
      concepto: 'Indemnización constitucional',
      monto:    indemnizacion,
      formula:  `(90 días + 20 días × ${aniosTrabajados} años) × $${salarioDiario}/día`,
    }] : []),
    ...(primaAntiguedad > 0 ? [{
      concepto: 'Prima de antigüedad',
      monto:    primaAntiguedad,
      formula:  `12 días × ${aniosTrabajados} años × $${salarioDiario}/día`,
    }] : []),
  ]

  return {
    partesPropAguinaldo,
    partesPropVacaciones,
    primaPropVacacional,
    indemnizacion,
    primaAntiguedad,
    total,
    desglose,
  }
}

// Tabla de días de vacaciones según LFT (art. 76)
export function diasVacacionesPorAnio(anios: number): number {
  if (anios <= 0)  return 0
  if (anios === 1) return 12
  if (anios === 2) return 14
  if (anios === 3) return 16
  if (anios === 4) return 18
  if (anios <= 9)  return 20
  if (anios <= 14) return 22
  if (anios <= 19) return 24
  if (anios <= 24) return 26
  return 28
}