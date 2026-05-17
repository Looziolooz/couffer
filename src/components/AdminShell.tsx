'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from '@/components/ui'
import { COMPANY } from '@/lib/data'

const ADMIN_LINKS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'layoutDashboard' },
  { href: '/admin/calendar', label: 'Calendario', icon: 'calendar' },
  { href: '/admin/inventory', label: 'Magazzino', icon: 'package' },
  { href: '/admin/invoices', label: 'Fatture', icon: 'fileText' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-bg lg:grid lg:grid-cols-[240px_1fr]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={closeSidebar}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <aside className="absolute left-0 top-0 h-full w-64 max-w-[80vw] bg-bg-soft border-r border-line p-4 flex flex-col gap-1.5 shadow-warm animate-[fadeUp_.2s_ease]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-2 pb-4 border-b border-line mb-4">
              <div className="flex items-baseline gap-2 font-display text-xl tracking-wide text-ink">
                Couffer
                <span className="w-1 h-1 rounded-full bg-accent inline-block -translate-y-0.5" />
              </div>
              <button onClick={closeSidebar} className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-line text-ink-2 hover:text-ink transition-all">
                <Icon name="x" size={14} />
              </button>
            </div>
            <div className="text-[10px] font-medium tracking-widest uppercase text-ink-3 px-2 pb-1.5">Amministrazione</div>
            {ADMIN_LINKS.map(l => {
              const active = pathname === l.href
              return (
                <Link key={l.href} href={l.href} onClick={closeSidebar} className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] transition-colors ${
                  active ? 'bg-accent-tint text-ink font-medium' : 'text-ink-2 hover:bg-accent/5 hover:text-ink'
                }`}>
                  <Icon name={l.icon} size={16} className={`flex-shrink-0 ${active ? 'text-accent' : 'text-ink-3'}`} />
                  {l.label}
                </Link>
              )
            })}
            <div className="mt-auto pt-4 border-t border-line">
              <Link href="/" onClick={closeSidebar} className="flex items-center gap-2 px-3 py-2 text-[13.5px] text-ink-2 hover:text-ink transition-colors">
                <Icon name="arrowLeft" size={16} />
                Torna al sito
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="bg-bg-soft border-r border-line p-4 flex-col gap-1.5 hidden lg:flex">
        <div className="flex items-baseline gap-2 font-display text-xl tracking-wide text-ink px-2 pb-6 border-b border-line mb-4">
          Couffer
          <span className="w-1 h-1 rounded-full bg-accent inline-block -translate-y-0.5" />
        </div>
        <div className="text-[10px] font-medium tracking-widest uppercase text-ink-3 px-2 pb-1.5">Amministrazione</div>
        {ADMIN_LINKS.map(l => {
          const active = pathname === l.href
          return (
            <Link key={l.href} href={l.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] transition-colors ${
              active ? 'bg-accent-tint text-ink font-medium' : 'text-ink-2 hover:bg-accent/5 hover:text-ink'
            }`}>
              <Icon name={l.icon} size={16} className={`flex-shrink-0 ${active ? 'text-accent' : 'text-ink-3'}`} />
              {l.label}
            </Link>
          )
        })}
        <div className="mt-auto pt-4 border-t border-line">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-[13.5px] text-ink-2 hover:text-ink transition-colors">
            <Icon name="arrowLeft" size={16} />
            Torna al sito
          </Link>
        </div>
      </aside>
      <div className="flex flex-col min-w-0">
        <header className="h-14 md:h-16 bg-bg-elev border-b border-line flex items-center px-4 md:px-8 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-8 h-8 inline-flex items-center justify-center rounded-full border border-line bg-bg-soft text-ink-2 hover:text-ink transition-all flex-shrink-0">
            <Icon name="menu" size={18} />
          </button>
          <div className="lg:hidden font-display text-base md:text-lg text-ink">{COMPANY.name}</div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs md:text-sm text-ink-3">Admin</span>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pill-bg text-bg-soft flex items-center justify-center text-xs md:text-sm font-semibold">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
