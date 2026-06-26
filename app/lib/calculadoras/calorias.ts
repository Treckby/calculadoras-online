import { CaloriasDatos, CaloriasResultado, NivelActividad, Objetivo } from '../../types'

const FACTORES_ACTIVIDAD: Record<NivelActividad, number> = {
  sedentario:  1.2,
  ligero:      1.375,
  moderado:    1.55,
  activo:      1.725,
  muy_activo:  1.9,
}

const AJUSTE_OBJETIVO: Record<Objetivo, number> = {
  perder:    -500,
  mantener:   0,
  ganar:     +300,
}

function clasificarImc(imc: number): string {
  if (imc < 18.5) return 'Bajo peso'
  if (imc < 25)   return 'Peso normal'
  if (imc < 30)   return 'Sobrepeso'
  return 'Obesidad'
}

export function calcularCalorias(datos: CaloriasDatos): CaloriasResultado {
  const { peso, altura, edad, sexo, actividad, objetivo } = datos

  // Fórmula Mifflin-St Jeor
  const tmb =
    sexo === 'masculino'
      ? 10 * peso + 6.25 * altura - 5 * edad + 5
      : 10 * peso + 6.25 * altura - 5 * edad - 161

  const tdee = tmb * FACTORES_ACTIVIDAD[actividad]
  const caloriasObjetivo = tdee + AJUSTE_OBJETIVO[objetivo]

  // Macros: 30% proteína, 40% carbos, 30% grasa
  const proteinas     = Math.round((caloriasObjetivo * 0.30) / 4)
  const carbohidratos = Math.round((caloriasObjetivo * 0.40) / 4)
  const grasas        = Math.round((caloriasObjetivo * 0.30) / 9)

  const imc = peso / Math.pow(altura / 100, 2)

  return {
    tmb:             Math.round(tmb),
    tdee:            Math.round(tdee),
    objetivo:        Math.round(caloriasObjetivo),
    proteinas,
    carbohidratos,
    grasas,
    imc:             parseFloat(imc.toFixed(1)),
    clasificacionImc: clasificarImc(imc),
  }
}