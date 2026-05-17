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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-amber-900">
          {COMPANY.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={`text-sm font-medium transition-colors hover:text-amber-800 ${pathname === l.href ? 'text-amber-900' : 'text-gray-600'}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-amber-800 transition-colors">
            <Icon name="shoppingBag" size={20} />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          <Link href="/account" className="p-2 text-gray-600 hover:text-amber-800 transition-colors"><Icon name="user" size={20} /></Link>
        </div>
      </div>
    </header>
  )
}
