import {
  Landmark, PiggyBank, Apple, Zap, Fuel,
  Receipt, UtensilsCrossed, Tag,
  Percent, DollarSign, CalendarDays, Scale, TrendingUp,
  LucideIcon
} from 'lucide-react'

export interface Calculadora {
  title: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  bgColor: string
  tags: string[]   // palabras clave para la búsqueda
}

export const CALCULADORAS: Calculadora[] = [
  {
    title:       'Calculadora de Préstamos',
    description: 'Cuota mensual, intereses y tabla de amortización.',
    href:        '/calculadoras/prestamos',
    icon:        Landmark,
    color:       'text-blue-600',
    bgColor:     'bg-blue-50',
    tags:        ['prestamo', 'credito', 'cuota', 'interes', 'amortizacion', 'hipoteca'],
  },
  {
    title:       'Calculadora de Ahorro',
    description: 'Proyecta tu ahorro con interés compuesto.',
    href:        '/calculadoras/ahorro',
    icon:        PiggyBank,
    color:       'text-green-600',
    bgColor:     'bg-green-50',
    tags:        ['ahorro', 'inversion', 'interes compuesto', 'rendimiento', 'futuro'],
  },
  {
    title:       'Calculadora de Calorías',
    description: 'TMB, TDEE y macronutrientes según tu objetivo.',
    href:        '/calculadoras/calorias',
    icon:        Apple,
    color:       'text-orange-600',
    bgColor:     'bg-orange-50',
    tags:        ['calorias', 'dieta', 'peso', 'imc', 'proteinas', 'macros', 'tmb', 'tdee'],
  },
  {
    title:       'Consumo Eléctrico',
    description: 'Estima tu factura CFE y ahorra en luz.',
    href:        '/calculadoras/electricidad',
    icon:        Zap,
    color:       'text-yellow-600',
    bgColor:     'bg-yellow-50',
    tags:        ['electricidad', 'luz', 'cfe', 'kwh', 'factura', 'energia', 'consumo'],
  },
  {
    title:       'Calculadora de Gasolina',
    description: 'Gasto mensual en combustible y rendimiento.',
    href:        '/calculadoras/gasolina',
    icon:        Fuel,
    color:       'text-rose-600',
    bgColor:     'bg-rose-50',
    tags:        ['gasolina', 'combustible', 'auto', 'rendimiento', 'magna', 'premium', 'diesel'],
  },
  {
    title:       'Calculadora de IVA',
    description: 'Agrega o quita el IVA al instante.',
    href:        '/calculadoras/iva',
    icon:        Receipt,
    color:       'text-violet-600',
    bgColor:     'bg-violet-50',
    tags:        ['iva', 'impuesto', 'precio', 'factura', '16%', '8%', 'sin iva', 'con iva'],
  },
  {
    title:       'Calculadora de Propina',
    description: 'Calcula la propina y divide la cuenta.',
    href:        '/calculadoras/propina',
    icon:        UtensilsCrossed,
    color:       'text-pink-600',
    bgColor:     'bg-pink-50',
    tags:        ['propina', 'restaurante', 'cuenta', 'dividir', 'personas', 'comer'],
  },
  {
    title:       'Calculadora de Descuentos',
    description: 'Precio final con descuento por % o cantidad fija.',
    href:        '/calculadoras/descuento',
    icon:        Tag,
    color:       'text-emerald-600',
    bgColor:     'bg-emerald-50',
    tags:        ['descuento', 'oferta', 'precio', 'ahorro', 'buen fin', 'rebaja', 'promocion'],
  },
  {
  title:       'Calculadora de Porcentajes',
  description: 'Porcentajes, aumentos, disminuciones y variaciones.',
  href:        '/calculadoras/porcentaje',
  icon:        Percent,
  color:       'text-indigo-600',
  bgColor:     'bg-indigo-50',
  tags:        ['porcentaje', 'aumento', 'disminucion', 'variacion', 'tanto por ciento'],
},
{
  title:       'Tipo de Cambio',
  description: 'Convierte MXN, USD, EUR y más en tiempo real.',
  href:        '/calculadoras/tipo-cambio',
  icon:        DollarSign,
  color:       'text-cyan-600',
  bgColor:     'bg-cyan-50',
  tags:        ['tipo cambio', 'dolar', 'euro', 'divisa', 'mxn', 'usd', 'eur', 'convertir'],
},
{
  title:       'Calculadora de Fechas',
  description: 'Días entre fechas, días hábiles y fines de semana.',
  href:        '/calculadoras/fechas',
  icon:        CalendarDays,
  color:       'text-teal-600',
  bgColor:     'bg-teal-50',
  tags:        ['fechas', 'dias', 'habiles', 'calendario', 'cuantos dias', 'diferencia fechas'],
},
{
  title:       'Peso Ideal e IMC',
  description: 'IMC, rango saludable y peso ideal por fórmulas médicas.',
  href:        '/calculadoras/peso-ideal',
  icon:        Scale,
  color:       'text-lime-600',
  bgColor:     'bg-lime-50',
  tags:        ['peso ideal', 'imc', 'indice masa corporal', 'sobrepeso', 'obesidad'],
},
{
  title:       'Calculadora de Inflación',
  description: 'Impacto de la inflación en tu poder adquisitivo.',
  href:        '/calculadoras/inflacion',
  icon:        TrendingUp,
  color:       'text-amber-600',
  bgColor:     'bg-amber-50',
  tags:        ['inflacion', 'poder adquisitivo', 'valor dinero', 'precios', 'costo vida'],
},
]