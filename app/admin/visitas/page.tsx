import { createClient } from '@supabase/supabase-js'
import { BarChart2, Users, Calendar,Receipt, Tag, UtensilsCrossed } from 'lucide-react'

// Cliente con privilegios para leer visitas
function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const NOMBRES: Record<string, string> = {
  'home':                    '🏠 Inicio',
  'calculadora-prestamos':   '🏦 Préstamos',
  'calculadora-ahorro':      '🐷 Ahorro',
  'calculadora-calorias':    '🍎 Calorías',
  'calculadora-electricidad':'⚡ Electricidad',
  'calculadora-gasolina':    '⛽ Gasolina',
  'calculadora-iva':         '💰 Iva',
  'calculadora-descuento':   '🏷️ Descuento',
  'calculadora-propina':     '💵 Propina',
  
}

async function obtenerEstadisticas(dias: number) {
  const supabase = createAdminClient()
  const desde = new Date()
  desde.setDate(desde.getDate() - dias)

  const { data } = await supabase
    .from('visitas')
    .select('pagina, created_at')
    .gte('created_at', desde.toISOString())
    .order('created_at', { ascending: false })

  if (!data) return { total: 0, porPagina: [], porDia: [] }

  // Agrupar por página
  const conteoPagina: Record<string, number> = {}
  data.forEach((v) => {
    conteoPagina[v.pagina] = (conteoPagina[v.pagina] || 0) + 1
  })

  const porPagina = Object.entries(conteoPagina)
    .map(([pagina, visitas]) => ({ pagina, visitas }))
    .sort((a, b) => b.visitas - a.visitas)

  // Agrupar por día
  const conteoDia: Record<string, number> = {}
  data.forEach((v) => {
    const dia = new Date(v.created_at).toLocaleDateString('es-MX', {
      day: '2-digit', month: 'short',
    })
    conteoDia[dia] = (conteoDia[dia] || 0) + 1
  })

  const porDia = Object.entries(conteoDia)
    .map(([dia, visitas]) => ({ dia, visitas }))
    .slice(-14)  // últimos 14 días

  return { total: data.length, porPagina, porDia }
}

export default async function AdminVisitasPage({
  searchParams,
}: {
  searchParams: Promise<{ dias?: string }>
}) {
  const params = await searchParams   // 👈 resolver la Promise
  const dias = Number(params?.dias) || 30
  const { total, porPagina, porDia } = await obtenerEstadisticas(dias)

  const opcionesDias = [1,7, 14, 30, 90]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel de Visitas</h1>
            <p className="text-slate-500 text-sm">Últimos {dias} días</p>
          </div>
        </div>

        {/* Selector de rango */}
        <div className="flex gap-2">
          {opcionesDias.map((d) => (
            <a
              key={d}
              href={`/admin/visitas?dias=${d}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                dias === d
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
              }`}
            >
              {d}d
            </a>
          ))}
        </div>
      </div>

      {/* Tarjeta total */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-200" />
            <p className="text-blue-100 text-sm">Total de visitas</p>
          </div>
          <p className="text-4xl font-bold">{total.toLocaleString('es-MX')}</p>
          <p className="text-blue-200 text-xs mt-1">En los últimos {dias} días</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-slate-400" />
            <p className="text-slate-500 text-sm">Promedio diario</p>
          </div>
          <p className="text-4xl font-bold text-slate-800">
            {Math.round(total / dias).toLocaleString('es-MX')}
          </p>
          <p className="text-slate-400 text-xs mt-1">Visitas por día</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <p className="text-slate-500 text-sm">Página más visitada</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {porPagina[0] ? NOMBRES[porPagina[0].pagina] ?? porPagina[0].pagina : '—'}
          </p>
          <p className="text-slate-400 text-xs mt-1">
            {porPagina[0]?.visitas.toLocaleString('es-MX') ?? 0} visitas
          </p>
        </div>
      </div>

      {/* Visitas por página */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h2 className="font-bold text-slate-800 mb-4">Visitas por calculadora</h2>
        <div className="space-y-3">
          {porPagina.map((item) => {
            const pct = total > 0 ? (item.visitas / total) * 100 : 0
            return (
              <div key={item.pagina}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">
                    {NOMBRES[item.pagina] ?? item.pagina}
                  </span>
                  <span className="text-slate-500">
                    {item.visitas.toLocaleString('es-MX')} ({pct.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          {porPagina.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-8">
              Sin visitas en este período
            </p>
          )}
        </div>
      </div>

      {/* Visitas por día */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-4">Visitas por día</h2>
        <div className="space-y-2">
          {porDia.map((item) => {
            const max = Math.max(...porDia.map((d) => d.visitas))
            const pct = max > 0 ? (item.visitas / max) * 100 : 0
            return (
              <div key={item.dia} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20 shrink-0">{item.dia}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600 w-8 text-right">
                  {item.visitas}
                </span>
              </div>
            )
          })}
          {porDia.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-8">
              Sin datos en este período
            </p>
          )}
        </div>
      </div>
    </div>
  )
}