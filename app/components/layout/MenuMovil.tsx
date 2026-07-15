'use client'

import { useState, useEffect } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Calculator } from 'lucide-react'
import { CALCULADORAS } from '../../lib/calculadoras/lista'
import { cn } from '../../lib/utils'

export function MenuMovil() {
  const [abierto, setAbierto] = useState(false)
  const pathname              = usePathname()

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setAbierto(false)
  }, [pathname])

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [abierto])

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setAbierto((a) => !a)}
        className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
      >
        {abierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {abierto && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setAbierto(false)}
        />
      )}

      {/* Drawer lateral */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col',
          abierto ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 shrink-0">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-800">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-3.5 h-3.5 text-white" />
            </div>
            CalcFácil
          </Link>
          <button
            onClick={() => setAbierto(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lista de calculadoras */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Calculadoras
          </p>

          <nav className="space-y-0.5">
            {CALCULADORAS.map((calc) => {
              const Icon     = calc.icon
              const activa   = pathname === calc.href

              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                    activa
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    activa ? calc.bgColor : 'bg-slate-100'
                  )}>
                    <Icon className={cn('w-4 h-4', activa ? calc.color : 'text-slate-400')} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn('text-sm font-medium truncate', activa ? 'text-blue-700' : 'text-slate-700')}>
                      {calc.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{calc.description}</p>
                  </div>
                  {activa && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100">
  <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
    Conversores
  </p>
  <Link
    href="/conversores"
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
  >
    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">
      🔄
    </div>
    <span className="text-sm font-medium">Todos los conversores</span>
  </Link>
</div>
<div className="mt-4 pt-4 border-t border-slate-100">
  <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
    Herramientas
  </p>
  <Link
    href="/herramientas"
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
  >
    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">
      🔤
    </div>
    <span className="text-sm font-medium">Todas las herramientas</span>
  </Link>
</div>
        </div>

        {/* Footer del drawer */}
        <div className="px-5 py-4 border-t border-slate-100 shrink-0">
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} CalcFácil
          </p>
        </div>
      </div>
    </>
  )
}