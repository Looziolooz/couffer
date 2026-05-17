'use client'

import { TEAM } from '@/lib/data'
import { Card, Icon } from '@/components/ui'

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Il nostro team</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Professionisti con anni di esperienza pronti a valorizzare la tua bellezza.</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map(t => (
          <Card key={t.id} className="p-8 text-center">
            <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-5 overflow-hidden ring-4 ring-amber-100">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
            <p className="text-amber-700 font-medium mb-3">{t.role}</p>
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name={i < Math.floor(t.rating) ? 'star' : i < t.rating ? 'starHalf' : 'star'} size={16} className={i < t.rating ? 'text-amber-500' : 'text-gray-200'} />
              ))}
              <span className="text-sm text-gray-500 ml-1">{t.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.bio}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {t.specialties.map(sp => (
                <span key={sp} className="px-3 py-1 bg-amber-50 text-amber-800 text-xs rounded-full font-medium">{sp}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
