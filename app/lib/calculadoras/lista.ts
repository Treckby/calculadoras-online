import {
  Landmark, PiggyBank, Apple, Zap, Fuel,
  Receipt, UtensilsCrossed, Tag, LucideIcon
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
]