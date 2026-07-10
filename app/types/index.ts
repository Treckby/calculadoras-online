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
export type TipoGasolina = 'magna' | 'premium' | 'diesel'
export type TipoRuta = 'ciudad' | 'carretera' | 'mixto'

export interface GasolinaDatos {
  distanciaKm: number
  rendimientoKml: number      // km por litro
  tipoGasolina: TipoGasolina
  precioLitro: number
  tipoRuta: TipoRuta
  viajesAlMes: number
}

export interface GasolinaResultado {
  litrosViaje: number
  costoViaje: number
  litrosMes: number
  costoMes: number
  costoAnual: number
  emisionesCo2Mes: number     // kg de CO2
  rendimientoAjustado: number // según tipo de ruta
}
export interface DescuentoResultado {
  precioOriginal: number
  montoDescuento: number
  precioFinal: number
  porcentajeAhorro: number
}

export interface PropinaResultado {
  montoPropina: number
  totalConPropina: number
  porPersona: number
  propinaPersona: number
  cuentaPersona: number
}

export interface IvaResultado {
  montoOriginal: number
  montoIva: number
  montoFinal: number
  porcentaje: number
}

export type OperacionIva = 'agregar' | 'quitar' | 'calcular'
export interface PesoIdealResultado {
  imc:              number
  clasificacionImc: string
  colorImc:         string
  pesoIdealMin:     number
  pesoIdealMax:     number
  diferencia:       number
  pesoSaludable:    boolean
  devine:           number
  robinson:         number
  miller:           number
  promedio:         number
}

export interface InflacionResultado {
  valorFuturo:       number
  valorPresente:     number
  perdidaPoder:      number
  porcentajePerdida: number
  proyeccion:        { anio: number; valor: number; podAdquisitivo: number }[]
}

export interface FechasResultado {
  dias:        number
  semanas:     number
  meses:       number
  anios:       number
  diasHabiles: number
  fines:       number
  esFuturo:    boolean
}

export interface PorcentajeResultado {
  resultado:   number
  descripcion: string
}

export type OperacionPorcentaje =
  | 'porcentaje_de'
  | 'que_porcentaje'
  | 'aumento'
  | 'disminucion'
  | 'variacion'