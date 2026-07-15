'use client'

import { useState }        from 'react'
import { RegistrarVisita } from '@/app/components/seo/RegistrarVisita'
import { Breadcrumbs }     from '@/app/components/layout/Breadcrumbs'
import { Copy }            from 'lucide-react'
import { generarCURP, ESTADOS } from '@/app/lib/herramientas/curp'

export default function GeneradorCURPPage() {
  const [form, setForm] = useState({
    nombre:          '',
    primerApellido:  '',
    segundoApellido: '',
    fechaNacimiento: '',
    sexo:            'H' as 'H' | 'M',
    estado:          'Ciudad de México',
  })
  const [curp, setCurp]     = useState('')
  const [copiado, setCopiado] = useState(false)
  const [errors, setErrors]   = useState<Record<string, string>>({})

  function validar() {
    const e: Record<string, string> = {}
    if (!form.nombre)          e.nombre          = 'Ingresa tu nombre'
    if (!form.primerApellido)  e.primerApellido  = 'Ingresa tu primer apellido'
    if (!form.fechaNacimiento) e.fechaNacimiento = 'Ingresa tu fecha de nacimiento'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function generar() {
    if (!validar()) return
    setCurp(generarCURP({
      nombre:          form.nombre,
      primerApellido:  form.primerApellido,
      segundoApellido: form.segundoApellido,
      fechaNacimiento: form.fechaNacimiento,
      sexo:            form.sexo,
      estado:          form.estado,
    }))
  }

  async function copiar() {
    await navigator.clipboard.writeText(curp)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const campo = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    error?: string
  ) => (
    <div>
      <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={form[key] as string}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400 text-slate-800"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )

  return (
    <>
      <RegistrarVisita pagina="herramienta-curp" />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs pagina="Generador de CURP" categoria="Herramientas" />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-xl">🪪</div>
          <h1 className="text-2xl font-bold text-slate-800">Generador de CURP</h1>
        </div>
        <p className="text-slate-500 mb-8">
          Genera tu CURP a partir de tus datos personales según la metodología del RENAPO.
        </p>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {campo('Primer apellido', 'primerApellido', 'García', errors.primerApellido)}
              {campo('Segundo apellido', 'segundoApellido', 'López')}
              {campo('Nombre(s)', 'nombre', 'Juan', errors.nombre)}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Fecha de nacimiento</label>
                <input
                  type="date"
                  value={form.fechaNacimiento}
                  onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400 text-slate-800"
                />
                {errors.fechaNacimiento && <p className="text-xs text-red-500 mt-1">{errors.fechaNacimiento}</p>}
              </div>
            </div>

            {/* Sexo */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Sexo</label>
              <div className="flex gap-3">
                {[{ value: 'H', label: '♂ Hombre' }, { value: 'M', label: '♀ Mujer' }].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setForm({ ...form, sexo: s.value as 'H' | 'M' })}
                    className={`px-5 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      form.sexo === s.value
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-rose-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estado */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Estado de nacimiento
              </label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-400 bg-white text-slate-800"
              >
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <button
              onClick={generar}
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all"
            >
              Generar CURP
            </button>
          </div>

          {/* Resultado */}
          {curp && (
            <div className="bg-white rounded-2xl border-2 border-rose-200 p-6">
              <p className="text-sm font-medium text-slate-500 mb-3">Tu CURP generada</p>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-black text-slate-800 font-mono tracking-widest flex-1">
                  {curp}
                </p>
                <button
                  onClick={copiar}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:border-rose-400 text-slate-500 hover:text-rose-600 transition-all text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiado ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Desglose del CURP */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: 'Apellidos + Nombre', valor: curp.slice(0, 4),  color: 'bg-rose-100 text-rose-700'   },
                  { label: 'Fecha nacimiento',   valor: curp.slice(4, 10), color: 'bg-blue-100 text-blue-700'   },
                  { label: 'Sexo y Estado',      valor: curp.slice(10, 13),color: 'bg-green-100 text-green-700' },
                  { label: 'Consonantes',        valor: curp.slice(13),    color: 'bg-amber-100 text-amber-700' },
                ].map((part) => (
                  <div key={part.label} className={`${part.color} rounded-lg p-2 text-center`}>
                    <p className="font-black font-mono text-lg">{part.valor}</p>
                    <p className="opacity-75">{part.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-3 mt-4">
                ⚠️ Esta CURP es una estimación. Para obtener tu CURP oficial consulta{' '}
                <a href="https://www.gob.mx/curp" target="_blank" rel="noopener noreferrer" className="underline">
                  gob.mx/curp
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}