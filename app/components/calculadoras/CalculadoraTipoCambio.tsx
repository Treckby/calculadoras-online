'use client'

import { useState, useCallback } from 'react'
import { ArrowLeftRight, RefreshCw } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { MONEDAS, Moneda, obtenerTasas } from '../../lib/calculadoras/tipoCambio'
import { formatNumber } from '../../lib/utils'
import { cn } from '../../lib/utils'
import { ResultadoExportable } from '../../components/ui/ResultadoExportable'
import { AccionesResultado }        from '../../components/ui/AccionesResultado'
import { generarMensajeTipoCambio } from '../../lib/whatsapp'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { ResultadoSkeleton } from '../ui/Skeleton'

export function CalculadoraTipoCambio() {
  const [monto, setMonto]         = useState('')
  const [de, setDe]               = useState<Moneda>('MXN')
  const [a, setA]                 = useState<Moneda>('USD')
  const [resultado, setResultado] = useState<number | null>(null)
  const [tasa, setTasa]           = useState<number | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [actualizado, setActualizado] = useState<string>('')

  const convertir = useCallback(async () => {
    if (!monto || Number(monto) <= 0) { setError('Ingresa un monto válido'); return }
    setError('')
    setLoading(true)
    try {
      const tasas   = await obtenerTasas(de)
      const tasaObj = tasas[a]
      const conv    = Number(monto) * tasaObj
      setTasa(tasaObj)
      setResultado(conv)
      setActualizado(new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }))
    } catch {
      setError('No se pudo conectar al servicio de cambio. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [monto, de, a])

  function intercambiar() {
    setDe(a)
    setA(de)
    setResultado(null)
    setTasa(null)
  }

  const monedaDe = MONEDAS.find((m) => m.value === de)!
  const monedaA  = MONEDAS.find((m) => m.value === a)!

  return (
    <div className="space-y-8">
      <Breadcrumbs pagina='calculadora de tipo de cambio'></Breadcrumbs>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">

        {/* Monto */}
        <Input
          label="Monto a convertir"
          type="number"
          placeholder="1000"
          prefix={monedaDe.simbolo}
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          error={error}
        />

        {/* Selector de monedas */}
        <div className="flex items-center gap-3">
          {/* Moneda origen */}
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 mb-2">De</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MONEDAS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => { setDe(m.value); setResultado(null) }}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all',
                    de === m.value
                      ? 'bg-cyan-500 border-cyan-500 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-cyan-300'
                  )}
                >
                  <span>{m.bandera}</span>
                  <span>{m.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Botón intercambiar */}
          <button
            onClick={intercambiar}
            className="p-2.5 mt-6 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-cyan-400 hover:text-cyan-500 transition-all shrink-0"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Moneda destino */}
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 mb-2">A</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MONEDAS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => { setA(m.value); setResultado(null) }}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all',
                    a === m.value
                      ? 'bg-cyan-500 border-cyan-500 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-cyan-300'
                  )}
                >
                  <span>{m.bandera}</span>
                  <span>{m.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={convertir}
          size="lg"
          disabled={loading}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600"
        >
          {loading && <ResultadoSkeleton />}
          {loading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Obteniendo tasa...
            </span>
          ) : 'Convertir'}
        </Button>
      </div>

      {/* Resultado */}
      {resultado !== null && tasa !== null && (
        <>
            <AccionesResultado
      mensaje={generarMensajeTipoCambio({
        monto:     Number(monto),
        de:        de,
        a:         a,
        resultado: resultado,
        tasa:      tasa,
      })}
      elementoId="resultado-tipo-cambio"
      nombreArchivo="tipo-de-cambio"
    />
<div className='space-y-8' id='resultado-tipo-cambio'>
        <div className="bg-cyan-500 rounded-2xl p-8 text-white text-center">
          <p className="text-cyan-100 text-sm mb-1">
            {monedaDe.bandera} {formatNumber(Number(monto))} {de} equivale a
          </p>
          <p className="text-5xl font-bold mb-3">
            {monedaA.simbolo} {formatNumber(resultado, 2)}
          </p>
          <p className="text-cyan-200 text-sm">
            {monedaA.bandera} {a}
          </p>
          <div className="mt-4 pt-4 border-t border-cyan-400 flex justify-center gap-6 text-xs text-cyan-200">
            <span>1 {de} = {formatNumber(tasa, 4)} {a}</span>
            <span>·</span>
            <span>Actualizado {actualizado}</span>
          </div>
        </div>
        </div> 
        </>
      )}

      {/* Mini tabla de referencia */}
      {tasa !== null && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Tabla de referencia</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 5, 10, 50, 100, 500, 1000, 5000].map((val) => (
              <div key={val} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">{val} {de}</p>
                <p className="text-sm font-bold text-slate-700">
                  {monedaA.simbolo} {formatNumber(val * tasa, 2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}