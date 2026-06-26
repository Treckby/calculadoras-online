export interface PrestamoDatos {
  monto: number
  tasaAnual: number
  plazoMeses: number
}

export interface PrestamoResultado {
  cuotaMensual: number
  totalPagar: number
  totalIntereses: number
  tablaAmortizacion: FilaAmortizacion[]
}

export interface FilaAmortizacion {
  mes: number
  cuota: number
  capital: number
  interes: number
  saldoPendiente: number
}

export interface AhorroDatos {
  montoInicial: number
  aporteMensual: number
  tasaAnual: number
  plazoAnios: number
}

export interface AhorroResultado {
  totalAhorrado: number
  totalAportado: number
  totalIntereses: number
  proyeccion: FilaAhorro[]
}

export interface FilaAhorro {
  anio: number
  saldo: number
  aportado: number
  intereses: number
}
export type Sexo = 'masculino' | 'femenino'
export type NivelActividad = 'sedentario' | 'ligero' | 'moderado' | 'activo' | 'muy_activo'
export type Objetivo = 'perder' | 'mantener' | 'ganar'

export interface CaloriasDatos {
  peso: number        // kg
  altura: number      // cm
  edad: number
  sexo: Sexo
  actividad: NivelActividad
  objetivo: Objetivo
}

export interface CaloriasResultado {
  tmb: number                  // Tasa metabólica basal
  tdee: number                 // Calorías totales con actividad
  objetivo: number             // Calorías ajustadas al objetivo
  proteinas: number            // gramos
  carbohidratos: number        // gramos
  grasas: number               // gramos
  imc: number
  clasificacionImc: string
}

export interface Aparato {
  id: string
  nombre: string
  potencia: number    // Watts
  horas: number       // horas de uso por día
}

export interface ElectricidadResultado {
  aparatos: AparatoCalculado[]
  totalKwhDia: number
  totalKwhMes: number
  costoMes: number
  costoAnual: number
}

export interface AparatoCalculado extends Aparato {
  kwhDia: number
  kwhMes: number
  costoMes: number
  porcentaje: number
}