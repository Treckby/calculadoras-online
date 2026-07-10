export type Moneda = 'MXN' | 'USD' | 'EUR' | 'CAD' | 'GBP' | 'JPY'

export const MONEDAS: { value: Moneda; label: string; simbolo: string; bandera: string }[] = [
  { value: 'MXN', label: 'Peso mexicano',   simbolo: '$',  bandera: '🇲🇽' },
  { value: 'USD', label: 'Dólar americano', simbolo: '$',  bandera: '🇺🇸' },
  { value: 'EUR', label: 'Euro',            simbolo: '€',  bandera: '🇪🇺' },
  { value: 'CAD', label: 'Dólar canadiense',simbolo: 'C$', bandera: '🇨🇦' },
  { value: 'GBP', label: 'Libra esterlina', simbolo: '£',  bandera: '🇬🇧' },
  { value: 'JPY', label: 'Yen japonés',     simbolo: '¥',  bandera: '🇯🇵' },
]

export async function obtenerTasas(base: Moneda): Promise<Record<string, number>> {
  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`,
    { next: { revalidate: 3600 } }  // cache 1 hora
  )
  if (!res.ok) throw new Error('No se pudo obtener el tipo de cambio')
  const data = await res.json()
  return data.conversion_rates
}