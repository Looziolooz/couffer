import Link from 'next/link'
import { COMPANY } from '@/lib/data'
import Icon from '@/components/ui'

export default function PublicFooter() {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="text-lg font-bold mb-3">{COMPANY.name}</h4>
          <p className="text-sm text-amber-200 leading-relaxed">{COMPANY.tagline}</p>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-amber-100">Contatti</h5>
          <div className="space-y-2 text-sm text-amber-200">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-white transition-colors"><Icon name="phone" size={14} />{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors"><Icon name="mail" size={14} />{COMPANY.email}</a>
            <p className="flex items-center gap-2"><Icon name="mapPin" size={14} />{COMPANY.address}</p>
            <p className="flex items-center gap-2"><Icon name="clock" size={14} />{COMPANY.hours}</p>
          </div>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-amber-100">Link</h5>
          <div className="space-y-2 text-sm">
            <Link href="/services" className="block text-amber-200 hover:text-white transition-colors">Servizi</Link>
            <Link href="/team" className="block text-amber-200 hover:text-white transition-colors">Team</Link>
            <Link href="/shop" className="block text-amber-200 hover:text-white transition-colors">Shop</Link>
            <Link href="/booking" className="block text-amber-200 hover:text-white transition-colors">Prenota</Link>
          </div>
        </div>
        <div>
          <h5 className="font-semibold mb-3 text-amber-100">Orari</h5>
          <p className="text-sm text-amber-200">{COMPANY.hours}</p>
          <p className="text-sm text-amber-300 mt-2">Domenica e Lunedì chiusi</p>
        </div>
      </div>
      <div className="border-t border-amber-800 py-4 text-center text-xs text-amber-300">
        &copy; {new Date().getFullYear()} {COMPANY.name}. Demo version.
      </div>
    </footer>
  )
}
