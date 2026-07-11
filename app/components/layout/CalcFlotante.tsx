'use client'

import { useState } from 'react'
import { Calculator, X, Delete } from 'lucide-react'
import { cn } from '../../lib/utils'

const BOTONES = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '⌫', '='],
]

export function CalcFlotante() {
  const [abierta, setAbierta]     = useState(false)
  const [display, setDisplay]     = useState('0')
  const [operacion, setOperacion] = useState('')
  const [valorPrev, setValorPrev] = useState<number | null>(null)
  const [esperando, setEsperando] = useState(false)

  function presionar(btn: string) {
    if (btn === 'C') {
      setDisplay('0'); setOperacion(''); setValorPrev(null); setEsperando(false)
      return
    }
    if (btn === '⌫') {
      setDisplay((d) => d.length > 1 ? d.slice(0, -1) : '0')
      return
    }
    if (btn === '±') {
      setDisplay((d) => String(parseFloat(d) * -1))
      return
    }
    if (btn === '%') {
      setDisplay((d) => String(parseFloat(d) / 100))
      return
    }
    if (['÷', '×', '−', '+'].includes(btn)) {
      setValorPrev(parseFloat(display))
      setOperacion(btn)
      setEsperando(true)
      return
    }
    if (btn === '=') {
      if (valorPrev === null || !operacion) return
      const actual = parseFloat(display)
      let res = 0
      if (operacion === '+') res = valorPrev + actual
      if (operacion === '−') res = valorPrev - actual
      if (operacion === '×') res = valorPrev * actual
      if (operacion === '÷') res = actual !== 0 ? valorPrev / actual : 0
      setDisplay(String(parseFloat(res.toFixed(10))))
      setOperacion('')
      setValorPrev(null)
      setEsperando(false)
      return
    }
    if (btn === '.') {
      if (esperando) { setDisplay('0.'); setEsperando(false); return }
      if (!display.includes('.')) setDisplay((d) => d + '.')
      return
    }
    // Número
    if (esperando) {
      setDisplay(btn); setEsperando(false)
    } else {
      setDisplay((d) => d === '0' ? btn : d + btn)
    }
  }

  const colorBtn = (btn: string) => {
    if (['÷', '×', '−', '+', '='].includes(btn)) return 'bg-blue-500 hover:bg-blue-600 text-white'
    if (['C', '±', '%'].includes(btn)) return 'bg-slate-200 hover:bg-slate-300 text-slate-700'
    if (btn === '⌫') return 'bg-slate-200 hover:bg-red-100 hover:text-red-500 text-slate-600'
    return 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierta((a) => !a)}
        className={cn(
          'fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300',
          abierta
            ? 'bg-slate-700 rotate-45'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
        )}
        aria-label="Calculadora rápida"
      >
        {abierta
          ? <X className="w-5 h-5 text-white" />
          : <Calculator className="w-6 h-6 text-white" />
        }
      </button>

      {/* Panel calculadora */}
      <div className={cn(
        'fixed bottom-24 right-6 z-40 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300',
        abierta
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}>
        {/* Display */}
        <div className="bg-slate-800 px-4 py-5 text-right">
          {operacion && (
            <p className="text-slate-400 text-xs mb-1">
              {valorPrev} {operacion}
            </p>
          )}
          <p className="text-white text-3xl font-light truncate">
            {display.length > 10 ? parseFloat(display).toExponential(3) : display}
          </p>
        </div>

        {/* Botones */}
        <div className="p-2 grid grid-cols-4 gap-1.5 bg-slate-50">
          {BOTONES.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => presionar(btn)}
              className={cn(
                'h-12 rounded-xl text-sm font-semibold transition-all active:scale-95',
                btn === '0' ? 'col-span-1' : '',
                colorBtn(btn)
              )}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}