'use client'

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/" className="text-lg font-bold text-amber-900">{COMPANY.name}</Link>
          <span className="ml-2 text-[10px] uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {ADMIN_LINKS.map(l => {
            const active = pathname === l.href
            return (
              <Link key={l.href} href={l.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-amber-50 text-amber-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
                <Icon name={l.icon} size={18} />
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <Icon name="arrowLeft" size={16} />
            Torna al sito
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4">
          <Link href="/admin/dashboard" className="lg:hidden text-lg font-bold text-amber-900">{COMPANY.name}</Link>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">Admin</span>
            <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center text-sm font-semibold">A</div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
