import Link from 'next/link'
import { COMPANY } from '@/lib/data'
import Icon from '@/components/ui'

export default function PublicFooter() {
  return (
    <footer className="border-t border-line bg-bg-soft mt-20 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12">
          <div>
            <div className="flex items-baseline gap-2.5 font-display text-2xl font-medium tracking-wide text-ink mb-4">
              Couffer
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block -translate-y-0.5" />
              <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-ink-3">Parrucchiere</span>
            </div>
            <p className="font-display text-lg italic text-ink-2 leading-relaxed max-w-xs">
              Il tuo benessere, la nostra arte
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-medium tracking-widest uppercase text-ink-3 mb-4">Servizi</h5>
            <ul className="flex flex-col gap-2 text-[13.5px] text-ink-2">
              <li><Link href="/services" className="hover:text-ink transition-colors">Servizi</Link></li>
              <li><Link href="/team" className="hover:text-ink transition-colors">Il team</Link></li>
              <li><Link href="/shop" className="hover:text-ink transition-colors">Shop</Link></li>
              <li><Link href="/booking" className="hover:text-ink transition-colors">Prenota</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] font-medium tracking-widest uppercase text-ink-3 mb-4">Visita</h5>
            <ul className="flex flex-col gap-2 text-[13.5px] text-ink-2">
              <li>{COMPANY.address}</li>
              <li>{COMPANY.hours}</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] font-medium tracking-widest uppercase text-ink-3 mb-4">Contatti</h5>
            <ul className="flex flex-col gap-2 text-[13.5px] text-ink-2">
              <li><a href={`tel:${COMPANY.phone}`} className="hover:text-ink transition-colors">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-ink transition-colors">{COMPANY.email}</a></li>
              <li className="flex items-center gap-2"><Icon name="clock" size={14} />{COMPANY.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line pt-6 flex justify-between text-xs text-ink-3">
          <span>&copy; {new Date().getFullYear()} Couffer &middot; Demo version</span>
          <span>Privacy &middot; Cookie &middot; Termini</span>
        </div>
      </div>
    </footer>
  )
}
