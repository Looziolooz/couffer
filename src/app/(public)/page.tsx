'use client'

import Link from 'next/link'
import { SERVICES, TEAM, PRODUCTS, TESTIMONIALS, COMPANY } from '@/lib/data'
import { useShop } from '@/contexts/ShopContext'
import Icon, { PageSection, Card, Badge } from '@/components/ui'
import { formatEur } from '@/lib/data'

export default function HomePage() {
  const { addToCart } = useShop()

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={COMPANY.heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 backdrop-blur-sm text-amber-200 rounded-full text-sm font-medium mb-6 border border-amber-400/30">
              <Icon name="star" size={14} /> Salone premiato 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Il tuo <span className="text-amber-400">benessere</span>,<br />la nostra arte
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Tagli, colori, trattamenti e prodotti professionali in un ambiente elegante e accogliente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/30">
                Prenota ora <Icon name="arrowRight" size={18} />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors">
                Scopri i servizi
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Icon name="star" size={14} className="text-amber-400" /> 4.8/5</span>
              <span className="flex items-center gap-1.5"><Icon name="users" size={14} /> 150+ clienti</span>
              <span className="flex items-center gap-1.5"><Icon name="shield" size={14} /> Certificato</span>
            </div>
          </div>
        </div>
      </section>

      <PageSection id="servizi">
        <div className="text-center mb-12">
          <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-2">I nostri servizi</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cosa offriamo</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map(s => (
            <Card key={s.id} className="overflow-hidden">
              <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-800 font-bold">{formatEur(s.price)}</span>
                  <span className="text-xs text-gray-400">{s.duration} min</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-amber-800 font-medium hover:text-amber-900 transition-colors">
            Vedi tutti i servizi <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </PageSection>

      <PageSection id="team" className="bg-gray-50">
        <div className="text-center mb-12">
          <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-2">Il nostro team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Professionisti al tuo servizio</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TEAM.map(t => (
            <Card key={t.id} className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden ring-4 ring-amber-100">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-amber-700 font-medium">{t.role}</p>
              <div className="flex items-center justify-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name={i < Math.floor(t.rating) ? 'star' : i < t.rating ? 'starHalf' : 'star'} size={14} className={i < t.rating ? 'text-amber-500' : 'text-gray-200'} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection id="shop-preview">
        <div className="text-center mb-12">
          <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-2">Shop</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Prodotti in evidenza</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map(p => (
            <Card key={p.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-800 font-bold">{formatEur(p.price)}</span>
                  {p.inStock ? (
                    <button onClick={() => addToCart({ productId: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 })} className="p-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors">
                      <Icon name="plus" size={16} />
                    </button>
                  ) : <Badge variant="danger">Esaurito</Badge>}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-amber-800 font-medium hover:text-amber-900 transition-colors">
            Visita lo shop <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </PageSection>

      <PageSection id="testimonial" className="bg-gray-50">
        <div className="text-center mb-12">
          <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-2">Dicono di noi</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cosa pensano i clienti</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map(t => (
            <Card key={t.id} className="p-6 flex gap-4">
              <img src={t.avatar || `https://i.pravatar.cc/100?u=${t.id}`} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" loading="lazy" />
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" size={14} className={i < t.rating ? 'text-amber-500' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">&ldquo;{t.text}&rdquo;</p>
                <p className="font-medium text-gray-900 text-sm">{t.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection id="cta" dark>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto per il tuo appuntamento?</h2>
          <p className="text-amber-200 mb-8">Prenota online in pochi click o contattaci direttamente.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-900 rounded-xl font-medium hover:bg-amber-50 transition-colors">
              Prenota ora <Icon name="arrowRight" size={18} />
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 px-6 py-3 border border-amber-400 text-amber-100 rounded-xl font-medium hover:bg-amber-800 transition-colors">
              <Icon name="phone" size={16} /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </PageSection>
    </>
  )
}
