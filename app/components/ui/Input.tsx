import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  prefix?: string
  suffix?: string
}

export function Input({ label, error, prefix, suffix, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white">
        {prefix && (
          <span className="px-3 py-2 bg-slate-100 text-slate-500 text-sm border-r border-slate-300">
            {prefix}
          </span>
        )}
        <input
          className={cn(
            'flex-1 px-3 py-2 text-sm outline-none bg-transparent text-slate-800',
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="px-3 py-2 bg-slate-100 text-slate-500 text-sm border-l border-slate-300">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}