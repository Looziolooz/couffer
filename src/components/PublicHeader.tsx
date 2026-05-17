'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COMPANY } from '@/lib/data'
import { useShop } from '@/contexts/ShopContext'
import Icon from '@/components/ui'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Servizi' },
  { href: '/team', label: 'Team' },
  { href: '/shop', label: 'Shop' },
  { href: '/booking', label: 'Prenota' },
]

export default function PublicHeader() {
  const pathname = usePathname()
  const { cartCount } = useShop()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const closeNav = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-bg/86 backdrop-blur-lg border-b border-line">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-[56px] md:h-[60px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2 font-display text-xl md:text-2xl font-medium tracking-wide text-ink" onClick={closeNav}>
          Couffer
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block -translate-y-0.5" />
          <span className="font-sans text-[9px] md:text-[10px] font-medium tracking-widest uppercase text-ink-3 hidden xs:inline">Parrucchiere</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] text-ink-2">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={`relative py-1.5 transition-colors hover:text-ink ${isActive(l.href) ? 'text-ink' : ''}`}>
              {l.label}
              {isActive(l.href) && <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent" />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="w-8 h-8 md:w-9 md:h-9 inline-flex items-center justify-center rounded-full border border-line bg-bg-soft text-ink-2 hover:text-ink hover:border-ink-2 transition-all relative">
            <Icon name="shoppingBag" size={18} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-semibold min-w-4 h-4 rounded-full flex items-center justify-center px-1">{cartCount}</span>}
          </Link>
          <Link href="/booking" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Prenota <Icon name="arrowRight" size={14} />
          </Link>
          <button onClick={() => setMobileOpen(true)} className="md:hidden w-8 h-8 inline-flex items-center justify-center rounded-full border border-line bg-bg-soft text-ink-2 hover:text-ink transition-all">
            <Icon name="menu" size={18} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={closeNav}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-bg-elev border-l border-line shadow-warm p-6 flex flex-col gap-6 animate-[fadeUp_.2s_ease]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-medium text-ink">Menu</span>
              <button onClick={closeNav} className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-line text-ink-2 hover:text-ink transition-all">
                <Icon name="x" size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} onClick={closeNav}
                  className={`px-4 py-3 rounded-md text-sm transition-colors ${isActive(l.href) ? 'bg-accent-tint text-ink font-medium' : 'text-ink-2 hover:text-ink hover:bg-accent/5'}`}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-line pt-4 flex flex-col gap-2">
              <Link href="/booking" onClick={closeNav} className="btn btn-primary btn-sm w-full justify-center">
                Prenota <Icon name="arrowRight" size={14} />
              </Link>
              <Link href="/admin/dashboard" onClick={closeNav} className="btn btn-ghost btn-sm w-full justify-center text-xs tracking-widest uppercase text-ink-3">
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
