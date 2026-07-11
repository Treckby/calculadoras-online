import { createClient } from '@supabase/supabase-js'

async function obtenerTotalVisitas(): Promise<number> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { count } = await supabase
      .from('visitas')
      .select('*', { count: 'exact', head: true })
    return count ?? 0
  } catch {
    return 0
  }
}

export async function HeroStats() {
  const totalVisitas = await obtenerTotalVisitas()

  const stats = [
    { valor: '14+',                            label: 'Calculadoras' },
    { valor: totalVisitas > 0
        ? `${(totalVisitas / 1000).toFixed(1)}k`
        : '100%',                              label: totalVisitas > 0 ? 'Cálculos realizados' : 'Gratis' },
    { valor: '0',                              label: 'Anuncios' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-3xl font-black text-white">{s.valor}</p>
          <p className="text-blue-200 text-xs mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  )
}