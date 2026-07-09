export interface PropinaDatos {
  totalCuenta: number
  porcentajePropina: number
  numPersonas: number
}

export interface PropinaResultado {
  montoPropina: number
  totalConPropina: number
  porPersona: number
  propinaPersona: number
  cuentaPersona: number
}

export function calcularPropina(datos: PropinaDatos): PropinaResultado {
  const { totalCuenta, porcentajePropina, numPersonas } = datos
  const personas       = Math.max(1, numPersonas)
  const montoPropina   = totalCuenta * (porcentajePropina / 100)
  const totalConPropina = totalCuenta + montoPropina

  return {
    montoPropina,
    totalConPropina,
    porPersona:      totalConPropina / personas,
    propinaPersona:  montoPropina / personas,
    cuentaPersona:   totalCuenta / personas,
  }
}