import { CalcCard } from './components/ui/CalcCard'
import { Landmark, PiggyBank, Apple, Zap, HardHat, Car,Fuel } from 'lucide-react'

const calculadoras = [
  {
    title: 'Calculadora de Préstamos',
    description: 'Calcula tu cuota mensual, intereses totales y tabla de amortización de cualquier préstamo.',
    href: '/calculadoras/prestamos',
    icon: Landmark,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Calculadora de Ahorro',
    description: 'Proyecta tu ahorro con interés compuesto y descubre cuánto tendrás en el futuro.',
    href: '/calculadoras/ahorro',
    icon: PiggyBank,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Calculadora de Calorías',
    description: 'Calcula tus calorías diarias según tu peso, altura, edad y nivel de actividad física.',
    href: '/calculadoras/calorias',
    icon: Apple,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Consumo Eléctrico',
    description: 'Estima el costo de electricidad de tus aparatos y reduce tu factura mensual.',
    href: '/calculadoras/electricidad',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  
  {
  title: 'Calculadora de Gasolina',
  description: 'Calcula tu gasto mensual en combustible y cuánto ahorrarías mejorando el rendimiento.',
  href: '/calculadoras/gasolina',
  icon: Fuel,
  color: 'text-rose-600',
  bgColor: 'bg-rose-50',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Calculadoras <span className="text-blue-600">Online Gratis</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Herramientas sencillas y precisas para tomar mejores decisiones financieras, de salud y construcción.
        </p>
      </div>

      {/* Grid de calculadoras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculadoras.map((calc) => (
          <CalcCard key={calc.href} {...calc} />
        ))}
      </div>
    </div>
  )
}