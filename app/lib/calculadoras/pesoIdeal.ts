export interface PesoIdealDatos {
  altura: number   // cm
  edad:   number
  sexo:   'masculino' | 'femenino'
  peso:   number   // kg actual
}

export interface PesoIdealResultado {
  imc:              number
  clasificacionImc: string
  colorImc:         string
  pesoIdealMin:     number
  pesoIdealMax:     number
  diferencia:       number
  pesoSaludable:    boolean
  // Fórmulas de peso ideal
  devine:           number
  robinson:         number
  miller:           number
  promedio:         number
}

function clasificarImc(imc: number): { clasificacion: string; color: string } {
  if (imc < 18.5) return { clasificacion: 'Bajo peso',  color: 'text-blue-500'  }
  if (imc < 25)   return { clasificacion: 'Normal',     color: 'text-green-500' }
  if (imc < 30)   return { clasificacion: 'Sobrepeso',  color: 'text-yellow-500'}
  if (imc < 35)   return { clasificacion: 'Obesidad I', color: 'text-orange-500'}
  return              { clasificacion: 'Obesidad II',   color: 'text-red-500'   }
}

export function calcularPesoIdeal(datos: PesoIdealDatos): PesoIdealResultado {
  const { altura, sexo, peso } = datos
  const alturaM  = altura / 100
  const imc      = peso / (alturaM * alturaM)
  const { clasificacion, color } = clasificarImc(imc)

  // Rango de peso saludable (IMC 18.5 – 24.9)
  const pesoIdealMin = 18.5 * alturaM * alturaM
  const pesoIdealMax = 24.9 * alturaM * alturaM

  // Fórmulas clásicas de peso ideal
  const pulgadasSobre5pies = Math.max(0, (altura / 2.54) - 60)
  const devine   = sexo === 'masculino' ? 50  + 2.3 * pulgadasSobre5pies : 45.5 + 2.3 * pulgadasSobre5pies
  const robinson = sexo === 'masculino' ? 52  + 1.9 * pulgadasSobre5pies : 49   + 1.7 * pulgadasSobre5pies
  const miller   = sexo === 'masculino' ? 56.2 + 1.41 * pulgadasSobre5pies : 53.1 + 1.36 * pulgadasSobre5pies
  const promedio = (devine + robinson + miller) / 3

  return {
    imc:              parseFloat(imc.toFixed(1)),
    clasificacionImc: clasificacion,
    colorImc:         color,
    pesoIdealMin:     parseFloat(pesoIdealMin.toFixed(1)),
    pesoIdealMax:     parseFloat(pesoIdealMax.toFixed(1)),
    diferencia:       parseFloat((peso - promedio).toFixed(1)),
    pesoSaludable:    imc >= 18.5 && imc < 25,
    devine:           parseFloat(devine.toFixed(1)),
    robinson:         parseFloat(robinson.toFixed(1)),
    miller:           parseFloat(miller.toFixed(1)),
    promedio:         parseFloat(promedio.toFixed(1)),
  }
}