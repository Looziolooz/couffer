'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICES, CATEGORIES } from '@/lib/data'
import { Card } from '@/components/ui'
import { formatEur } from '@/lib/data'

export default function ServicesPage() {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? SERVICES : SERVICES.filter(s => s.category === cat)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">I nostri servizi</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Dalla consulenza d&apos;immagine ai trattamenti benessere, tutto ciò che serve per prenderti cura di te.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c.id ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c.label}</button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(s => (
          <Link key={s.id} href={`/booking?service=${s.id}`}>
            <Card className="overflow-hidden h-full hover:border-amber-200">
              <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{s.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-amber-800 font-bold text-lg">{formatEur(s.price)}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{s.duration} min</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
