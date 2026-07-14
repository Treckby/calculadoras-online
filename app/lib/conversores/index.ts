export type UnidadConversion = {
  label:  string
  factor: number   // relativo a la unidad base
}

export type CategoriaConversor = {
  id:       string
  titulo:   string
  icono:    string
  unidades: Record<string, UnidadConversion>
  base:     string   // unidad base para conversión
}

export const CONVERSORES: CategoriaConversor[] = [
  {
    id:     'temperatura',
    titulo: 'Temperatura',
    icono:  '🌡️',
    base:   'celsius',
    unidades: {
      celsius:    { label: 'Celsius (°C)',    factor: 1 },
      fahrenheit: { label: 'Fahrenheit (°F)', factor: 1 },
      kelvin:     { label: 'Kelvin (K)',       factor: 1 },
    },
  },
  {
    id:     'longitud',
    titulo: 'Longitud',
    icono:  '📏',
    base:   'metro',
    unidades: {
      metro:      { label: 'Metro (m)',        factor: 1          },
      kilometro:  { label: 'Kilómetro (km)',   factor: 0.001      },
      centimetro: { label: 'Centímetro (cm)',  factor: 100        },
      milimetro:  { label: 'Milímetro (mm)',   factor: 1000       },
      milla:      { label: 'Milla (mi)',       factor: 0.000621371},
      pie:        { label: 'Pie (ft)',         factor: 3.28084    },
      pulgada:    { label: 'Pulgada (in)',     factor: 39.3701    },
      yarda:      { label: 'Yarda (yd)',       factor: 1.09361    },
    },
  },
  {
    id:     'peso',
    titulo: 'Peso / Masa',
    icono:  '⚖️',
    base:   'kilogramo',
    unidades: {
      kilogramo:  { label: 'Kilogramo (kg)',   factor: 1          },
      gramo:      { label: 'Gramo (g)',        factor: 1000       },
      miligramo:  { label: 'Miligramo (mg)',   factor: 1_000_000  },
      tonelada:   { label: 'Tonelada (t)',     factor: 0.001      },
      libra:      { label: 'Libra (lb)',       factor: 2.20462    },
      onza:       { label: 'Onza (oz)',        factor: 35.274     },
    },
  },
  {
    id:     'area',
    titulo: 'Área',
    icono:  '📐',
    base:   'metro2',
    unidades: {
      metro2:     { label: 'Metro² (m²)',      factor: 1          },
      kilometro2: { label: 'Kilómetro² (km²)', factor: 0.000001   },
      centimetro2:{ label: 'Centímetro² (cm²)',factor: 10_000     },
      hectarea:   { label: 'Hectárea (ha)',    factor: 0.0001     },
      acre:       { label: 'Acre',             factor: 0.000247105},
      pie2:       { label: 'Pie² (ft²)',       factor: 10.7639    },
    },
  },
  {
    id:     'velocidad',
    titulo: 'Velocidad',
    icono:  '💨',
    base:   'ms',
    unidades: {
      ms:         { label: 'Metro/seg (m/s)',  factor: 1          },
      kmh:        { label: 'Km/hora (km/h)',   factor: 3.6        },
      mph:        { label: 'Millas/hora (mph)',factor: 2.23694    },
      nudo:       { label: 'Nudo (kn)',        factor: 1.94384    },
      fps:        { label: 'Pie/seg (fps)',    factor: 3.28084    },
    },
  },
  {
    id:     'volumen',
    titulo: 'Volumen',
    icono:  '🧪',
    base:   'litro',
    unidades: {
      litro:      { label: 'Litro (L)',        factor: 1          },
      mililitro:  { label: 'Mililitro (mL)',   factor: 1000       },
      metro3:     { label: 'Metro³ (m³)',      factor: 0.001      },
      galon:      { label: 'Galón US (gal)',   factor: 0.264172   },
      pinta:      { label: 'Pinta US (pt)',    factor: 2.11338    },
      taza:       { label: 'Taza (cup)',       factor: 4.22675    },
      onzaLiq:    { label: 'Onza líq. (fl oz)',factor: 33.814     },
    },
  },
  {
    id:     'datos',
    titulo: 'Almacenamiento',
    icono:  '💾',
    base:   'byte',
    unidades: {
      byte:       { label: 'Byte (B)',         factor: 1              },
      kilobyte:   { label: 'Kilobyte (KB)',    factor: 1 / 1024       },
      megabyte:   { label: 'Megabyte (MB)',    factor: 1 / 1024**2    },
      gigabyte:   { label: 'Gigabyte (GB)',    factor: 1 / 1024**3    },
      terabyte:   { label: 'Terabyte (TB)',    factor: 1 / 1024**4    },
      bit:        { label: 'Bit',             factor: 8              },
    },
  },
]

// Conversión especial para temperatura (no es multiplicación simple)
export function convertirTemperatura(valor: number, de: string, a: string): number {
  // Primero convertir a Celsius
  let celsius: number
  switch (de) {
    case 'celsius':    celsius = valor;                        break
    case 'fahrenheit': celsius = (valor - 32) * 5 / 9;        break
    case 'kelvin':     celsius = valor - 273.15;               break
    default:           celsius = valor
  }
  // Luego de Celsius a la unidad destino
  switch (a) {
    case 'celsius':    return parseFloat(celsius.toFixed(4))
    case 'fahrenheit': return parseFloat((celsius * 9 / 5 + 32).toFixed(4))
    case 'kelvin':     return parseFloat((celsius + 273.15).toFixed(4))
    default:           return celsius
  }
}

// Conversión general por factor
export function convertir(
  valor:    number,
  de:       string,
  a:        string,
  categoria: CategoriaConversor
): number {
  if (categoria.id === 'temperatura') {
    return convertirTemperatura(valor, de, a)
  }
  // Convertir a base, luego a destino
  const factorDe = categoria.unidades[de]?.factor ?? 1
  const factorA  = categoria.unidades[a]?.factor  ?? 1
  const enBase   = valor / factorDe
  return parseFloat((enBase * factorA).toFixed(8))
}