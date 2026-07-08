'use server'

import { createClient } from '../supabase/server'

export async function registrarVisita(pagina: string) {
  try {
    const supabase = await createClient()
    await supabase.from('visitas').insert({ pagina })
  } catch (error) {
    // Silencioso — no interrumpir la experiencia del usuario
    console.error('Error registrando visita:', error)
  }
}