'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import { CALCULADORAS,CONVERSORES_LISTA } from '../../lib/calculadoras/lista'
import { cn } from '../../lib/utils'

export function Buscador() {
  const [abierto, setAbierto]   = useState(false)
  const [query, setQuery]       = useState('')
  const [seleccion, setSeleccion] = useState(0)
  const inputRef                = useRef<HTMLInputElement>(null)
  const router                  = useRouter()
const TODOS = [...CALCULADORAS, ...CONVERSORES_LISTA]
  // Filtrar calculadoras según el query
const resultados = query.trim() === ''
  ? TODOS
  : TODOS.filter((c) => {
      const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const texto = `${c.title} ${c.description} ${c.tags.join(' ')}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      return texto.includes(q)
    })

  // Abrir con Ctrl+K o Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setAbierto(true)
      }
      if (e.key === 'Escape') {
        setAbierto(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus al abrir
  useEffect(() => {
    if (abierto) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSeleccion(0)
    }
  }, [abierto])

  // Navegar con teclado
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSeleccion((s) => Math.min(s + 1, resultados.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSeleccion((s) => Math.max(s - 1, 0))
    }
    if (e.key === 'Enter' && resultados[seleccion]) {
      irA(resultados[seleccion].href)
    }
  }

  function irA(href: string) {
    router.push(href)
    setAbierto(false)
    setQuery('')
  }

  function cerrar() {
    setAbierto(false)
    setQuery('')
  }

  return (
    <>
      {/* Botón en el header */}
      <button
        onClick={() => setAbierto(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 border border-slate-200 rounded-lg hover:border-blue-300 hover:text-slate-600 transition-all bg-white"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Buscar calculadora</span>
        <kbd className="hidden sm:inline text-xs bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Overlay */}
      {abierto && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
          onClick={cerrar}
        >
          {/* Modal */}
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Busca una calculadora..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSeleccion(0) }}
                onKeyDown={handleKeyDown}
                className="flex-1 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd
                onClick={cerrar}
                className="text-xs bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 cursor-pointer hover:bg-slate-200"
              >
                ESC
              </kbd>
            </div>

            {/* Resultados */}
            <div className="max-h-80 overflow-y-auto py-2">
              {resultados.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-slate-400 text-sm">Sin resultados para "{query}"</p>
                </div>
              ) : (
                <>
                  {query === '' && (
                    <p className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Todas las calculadoras
                    </p>
                  )}
                  {query !== '' && (
                    <p className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {resultados.length} resultado{resultados.length !== 1 ? 's' : ''}
                    </p>
                  )}
                  {resultados.map((calc, i) => {
                    const Icon = calc.icon
                    return (
                      <button
                        key={calc.href}
                        onClick={() => irA(calc.href)}
                        onMouseEnter={() => setSeleccion(i)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 transition-colors text-left',
                          seleccion === i ? 'bg-blue-50' : 'hover:bg-slate-50'
                        )}
                      >
                        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', calc.bgColor)}>
                          <Icon className={cn('w-4 h-4', calc.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-700 truncate">
                            {calc.title}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {calc.description}
                          </p>
                        </div>
                        <ArrowRight className={cn(
                          'w-4 h-4 shrink-0 transition-all',
                          seleccion === i ? 'text-blue-500 translate-x-0.5' : 'text-slate-300'
                        )} />
                      </button>
                    )
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">↑</kbd>
                <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">↓</kbd>
                navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">↵</kbd>
                abrir
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">ESC</kbd>
                cerrar
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}