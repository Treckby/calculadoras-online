export function compartirWhatsApp(mensaje: string): void {
  const texto = encodeURIComponent(mensaje)
  const url   = `https://wa.me/?text=${texto}`
  window.open(url, '_blank')
}

export function generarMensajePrestamo(datos: {
  monto:         number
  tasaAnual:     number
  plazoMeses:    number
  cuotaMensual:  number
  totalPagar:    number
  totalIntereses:number
}): string {
  return `📊 *Calculadora de Préstamos* — CalcFácil

💰 Monto: $${datos.monto.toLocaleString('es-MX')}
📈 Tasa anual: ${datos.tasaAnual}%
📅 Plazo: ${datos.plazoMeses} meses

✅ *Cuota mensual: $${datos.cuotaMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*
💳 Total a pagar: $${datos.totalPagar.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
💸 Total intereses: $${datos.totalIntereses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeAhorro(datos: {
  montoInicial:   number
  aporteMensual:  number
  tasaAnual:      number
  plazoAnios:     number
  totalAhorrado:  number
  totalIntereses: number
}): string {
  return `🐷 *Calculadora de Ahorro* — CalcFácil

💵 Monto inicial: $${datos.montoInicial.toLocaleString('es-MX')}
📆 Aporte mensual: $${datos.aporteMensual.toLocaleString('es-MX')}
📈 Tasa anual: ${datos.tasaAnual}%
⏳ Plazo: ${datos.plazoAnios} años

✅ *Total ahorrado: $${datos.totalAhorrado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*
💹 Intereses ganados: $${datos.totalIntereses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeCalorias(datos: {
  tmb:            number
  tdee:           number
  objetivo:       number
  proteinas:      number
  carbohidratos:  number
  grasas:         number
  imc:            number
  clasificacion:  string
}): string {
  return `🍎 *Calculadora de Calorías* — CalcFácil

📊 IMC: ${datos.imc} (${datos.clasificacion})
🔥 Tasa metabólica basal: ${datos.tmb} kcal
⚡ Gasto con actividad: ${datos.tdee} kcal

✅ *Meta diaria: ${datos.objetivo} kcal*

🥩 Proteínas: ${datos.proteinas}g
🍚 Carbohidratos: ${datos.carbohidratos}g
🥑 Grasas: ${datos.grasas}g

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeElectricidad(datos: {
  totalKwhMes: number
  costoMes:    number
  costoAnual:  number
  tarifaKwh:   number
}): string {
  return `⚡ *Calculadora de Consumo Eléctrico* — CalcFácil

🔌 Consumo mensual: ${datos.totalKwhMes.toFixed(2)} kWh
💲 Tarifa: $${datos.tarifaKwh}/kWh

✅ *Costo mensual estimado: $${datos.costoMes.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*
📅 Costo anual: $${datos.costoAnual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeGasolina(datos: {
  distanciaKm:     number
  rendimientoKml:  number
  tipoGasolina:    string
  costoViaje:      number
  costoMes:        number
  costoAnual:      number
  litrosMes:       number
}): string {
  return `⛽ *Calculadora de Gasolina* — CalcFácil

🚗 Distancia por viaje: ${datos.distanciaKm} km
📊 Rendimiento: ${datos.rendimientoKml} km/L
⛽ Combustible: ${datos.tipoGasolina}

✅ *Costo por viaje: $${datos.costoViaje.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*
📅 Gasto mensual: $${datos.costoMes.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
📆 Gasto anual: $${datos.costoAnual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
🛢 Litros al mes: ${datos.litrosMes.toFixed(2)} L

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeIva(datos: {
  montoOriginal: number
  montoIva:      number
  montoFinal:    number
  porcentaje:    number
}): string {
  return `🧾 *Calculadora de IVA* — CalcFácil

💰 Precio sin IVA: $${datos.montoOriginal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
📊 IVA (${datos.porcentaje}%): $${datos.montoIva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}

✅ *Precio con IVA: $${datos.montoFinal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*

_Calculado en CalcFácil 🧮_`
}

export function generarMensajePropina(datos: {
  totalCuenta:    number
  porcentaje:     number
  montoPropina:   number
  totalConPropina:number
  personas:       number
  porPersona:     number
}): string {
  return `🍽️ *Calculadora de Propina* — CalcFácil

🧾 Cuenta: $${datos.totalCuenta.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
💝 Propina (${datos.porcentaje}%): $${datos.montoPropina.toLocaleString('es-MX', { minimumFractionDigits: 2 })}

✅ *Total con propina: $${datos.totalConPropina.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*
👥 Entre ${datos.personas} persona${datos.personas > 1 ? 's' : ''}: $${datos.porPersona.toLocaleString('es-MX', { minimumFractionDigits: 2 })} c/u

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeDescuento(datos: {
  precioOriginal: number
  montoDescuento: number
  precioFinal:    number
  porcentajeAhorro: number
}): string {
  return `🏷️ *Calculadora de Descuentos* — CalcFácil

💰 Precio original: $${datos.precioOriginal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
✂️ Descuento: $${datos.montoDescuento.toLocaleString('es-MX', { minimumFractionDigits: 2 })} (${datos.porcentajeAhorro.toFixed(1)}%)

✅ *Precio final: $${datos.precioFinal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*

_Calculado en CalcFácil 🧮_`
}

export function generarMensajePorcentaje(datos: {
  descripcion: string
  resultado:   number
  esPorcentaje:boolean
}): string {
  return `📊 *Calculadora de Porcentajes* — CalcFácil

🔢 ${datos.descripcion}

✅ *Resultado: ${datos.resultado.toFixed(2)}${datos.esPorcentaje ? '%' : ''}*

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeTipoCambio(datos: {
  monto:    number
  de:       string
  a:        string
  resultado:number
  tasa:     number
}): string {
  return `💱 *Tipo de Cambio* — CalcFácil

💵 ${datos.monto.toLocaleString('es-MX')} ${datos.de}

✅ *= ${datos.resultado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ${datos.a}*
📊 Tasa: 1 ${datos.de} = ${datos.tasa.toFixed(4)} ${datos.a}

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeFechas(datos: {
  fechaInicio: string
  fechaFin:    string
  dias:        number
  diasHabiles: number
  semanas:     number
  esFuturo:    boolean
}): string {
  return `📅 *Calculadora de Fechas* — CalcFácil

📌 Del: ${datos.fechaInicio}
📌 Al:  ${datos.fechaFin}

✅ *${datos.esFuturo ? 'Faltan' : 'Pasaron'}: ${datos.dias} días*
💼 Días hábiles: ${datos.diasHabiles}
📆 Semanas: ${datos.semanas}

_Calculado en CalcFácil 🧮_`
}

export function generarMensajePesoIdeal(datos: {
  peso:            number
  altura:          number
  imc:             number
  clasificacion:   string
  pesoIdealMin:    number
  pesoIdealMax:    number
  promedio:        number
  pesoSaludable:   boolean
}): string {
  return `⚖️ *Calculadora de Peso Ideal* — CalcFácil

📏 Altura: ${datos.altura} cm
⚖️ Peso actual: ${datos.peso} kg

📊 IMC: ${datos.imc} (${datos.clasificacion})
✅ *Peso ideal: ${datos.pesoIdealMin}–${datos.pesoIdealMax} kg*
🎯 Promedio fórmulas: ${datos.promedio} kg

${datos.pesoSaludable ? '✅ Tu peso está en el rango saludable' : '⚠️ Tu peso está fuera del rango saludable'}

_Calculado en CalcFácil 🧮_`
}

export function generarMensajeInflacion(datos: {
  cantidad:         number
  anioInicio:       number
  anioFin:          number
  tasaAnual:        number
  valorFuturo:      number
  perdidaPoder:     number
  porcentajePerdida:number
}): string {
  return `📈 *Calculadora de Inflación* — CalcFácil

💰 Cantidad: $${datos.cantidad.toLocaleString('es-MX')}
📅 Período: ${datos.anioInicio} → ${datos.anioFin}
📊 Tasa anual: ${datos.tasaAnual}%

✅ *Necesitarás: $${datos.valorFuturo.toLocaleString('es-MX', { minimumFractionDigits: 2 })}*
📉 Pérdida poder adquisitivo: ${datos.porcentajePerdida.toFixed(2)}%

_Calculado en CalcFácil 🧮_`
}