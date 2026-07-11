'use client'

import { MessageCircle } from 'lucide-react'
import { compartirWhatsApp } from '../../lib/whatsapp'
import { cn } from '../../lib/utils'

interface BotonWhatsAppProps {
  mensaje: string
  className?: string
}

export function BotonWhatsApp({ mensaje, className }: BotonWhatsAppProps) {
  return (
    <button
      onClick={() => compartirWhatsApp(mensaje)}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all',
        'border-green-200 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500',
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      Compartir
    </button>
  )
}