import type { ReactNode } from 'react'

const ICONS: Record<string, ReactNode> = {
  menu: <><path d="M3 12h18M3 6h18M3 18h18"/></>,
  x: <><path d="M18 6 6 18M6 6l12 12"/></>,
  cart: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>,
  mail: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
  mapPin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
  starHalf: <><path d="M12 2 9.09 8.26 2 9.27l5.09 4.87L5.82 21.02 12 17.77Z"/><path d="M12 2v15.77l6.18 3.25L18.18 21.02 22 14.14l-6.91-4.87Z"/></>,
  search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
  chevronLeft: <><path d="m15 18-6-6 6-6"/></>,
  chevronRight: <><path d="m9 18 6-6-6-6"/></>,
  chevronDown: <><path d="m6 9 6 6 6-6"/></>,
  chevronUp: <><path d="m18 15-6-6-6 6"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  minus: <><path d="M5 12h14"/></>,
  trash: <><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  check: <><path d="M20 6 9 17l-5-5"/></>,
  alertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></>,
  calendar: <><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></>,
  tag: <><path d="M12 2H2v10l9.29 9.29a2 2 0 0 0 2.83 0l6.17-6.17a2 2 0 0 0 0-2.83Z"/><circle cx="7" cy="7" r="1" fill="currentColor"/></>,
  filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
  chevronsUpDown: <><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></>,
  layoutDashboard: <><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></>,
  list: <><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></>,
  package: <><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5.2 8.7-5.2"/><path d="M12 22V12"/></>,
  fileText: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="8" x2="16" y1="16" y2="16"/></>,
  wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></>,
  settings: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
  gift: <><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7" rx="2"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>,
  arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  arrowLeft: <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
  truck: <><rect width="15" height="7" x="1" y="11" rx="1"/><circle cx="5" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M16 11V4H1v7"/><path d="M22 11h-6v7h2a2 2 0 0 0 2-2v-5Z"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  trendingUp: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  dollarSign: <><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  shoppingBag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
  logOut: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></>,
  barChart3: <><path d="M3 3v18h18"/><path d="M7 16V8"/><path d="M12 16v-6"/><path d="M17 16V3"/></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
  refreshCw: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></>,
  heart: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></>,
}

export function Icon({ name, size = 20, className = '', stroke = 2 }: { name: string; size?: number; className?: string; stroke?: number }) {
  const paths = ICONS[name]
  if (!paths) return null
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  )
}

export function Photo({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const fallback = alt.charAt(0).toUpperCase()
  if (!src) return <div className={`bg-gradient-to-br from-accent-soft to-accent/30 text-ink-3 flex items-center justify-center font-display italic ${className}`}>{fallback}</div>
  return <img src={src} alt={alt} className={className} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden') }} />
}

export function Avatar({ src, name, size = 'md' }: { src?: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }
  const fallback = name.charAt(0).toUpperCase()
  return (
    <div className={`relative rounded-full overflow-hidden bg-gradient-to-br from-accent-soft to-accent/30 text-ink-3 flex-shrink-0 font-display italic ${dims[size]}`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden') }} /> : null}
      <div className={`absolute inset-0 flex items-center justify-center ${src ? 'hidden' : ''}`}>{fallback}</div>
    </div>
  )
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm animate-[fadeUp_.25s_ease]" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[85vh] overflow-auto bg-bg-card rounded-lg shadow-lg" onClick={e => e.stopPropagation()} style={{ boxShadow: '0 12px 36px rgba(31,27,23,0.10)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          {title && <h3 className="font-display text-xl font-medium text-ink">{title}</h3>}
          <button onClick={onClose} className="ml-auto p-1 hover:bg-bg-soft rounded-lg transition-colors text-ink-2"><Icon name="x" size={18} /></button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}

export function Stepper({ steps, current }: { steps: { num: number; label: string }[]; current: number }) {
  return (
    <div className="flex items-center gap-0 mb-12">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-3">
          <div className={`flex items-center gap-3 ${s.num === current ? 'text-ink' : s.num < current ? 'text-ink-2' : 'text-ink-3'}`}>
            <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-medium border ${
              s.num === current || s.num < current ? 'bg-pill-bg text-bg-soft border-pill-bg' : 'border-line bg-bg-soft text-ink-3'
            }`}>
              {s.num < current ? <Icon name="check" size={12} stroke={2} /> : s.num}
            </div>
            <span className="text-xs sm:text-sm">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-6 sm:w-8 h-px mx-2 ${s.num < current ? 'bg-accent' : 'bg-line'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export function PageSection({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-16 sm:py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

export function SectionGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) {
  const colClass = cols >= 4 ? 'lg:grid-cols-4' : cols >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  return <div className={`grid gap-4 sm:grid-cols-2 ${colClass}`}>{children}</div>
}

export function Card({ className = '', children, onClick }: { className?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <div className={`bg-bg-card border border-line rounded-lg transition-all ${onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-warm hover:border-accent-soft' : ''} ${className}`}
      onClick={onClick} style={onClick ? { transition: 'all .3s ease' } : {}}>
      {children}
    </div>
  )
}

export function Badge({ variant = 'default', children, className = '' }: { variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'; children: React.ReactNode; className?: string }) {
  const styles = {
    default: 'bg-accent-tint text-accent',
    success: 'bg-green-100 text-success',
    warning: 'bg-amber-100 text-warn',
    danger: 'bg-red-100 text-danger',
    info: 'bg-blue-100 text-accent-soft',
  }
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium ${styles[variant]} ${className}`}>{children}</span>
}

export function KpiCard({ label, value, subtitle, icon }: { label: string; value: string; subtitle?: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-bg-card border border-line rounded-lg p-5 shadow-sm relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-widest uppercase text-ink-3">{label}</p>
          <p className="font-display text-[34px] font-medium leading-none text-ink mt-2">{value}</p>
          {subtitle && <p className="text-xs text-ink-3 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-accent/60">{icon}</div>}
      </div>
    </div>
  )
}

export default Icon
