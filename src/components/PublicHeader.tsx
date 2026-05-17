'use client'

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-bg/86 backdrop-blur-lg border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-[60px] flex items-center justify-between gap-8">
        <Link href="/" className="flex items-baseline gap-2.5 font-display text-2xl font-medium tracking-wide text-ink">
          Couffer
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block -translate-y-0.5" />
          <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-ink-3">Parrucchiere</span>
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
          <Link href="/cart" className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-line bg-bg-soft text-ink-2 hover:text-ink hover:border-ink-2 transition-all relative">
            <Icon name="shoppingBag" size={18} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-semibold min-w-4 h-4 rounded-full flex items-center justify-center px-1">{cartCount}</span>}
          </Link>
          <Link href="/booking" className="btn btn-primary btn-sm">
            Prenota <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      </div>
    </header>
  )
}
