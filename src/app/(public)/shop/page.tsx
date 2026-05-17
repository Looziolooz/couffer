'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import { useShop } from '@/contexts/ShopContext'
import { Card, Badge, Icon } from '@/components/ui'
import { formatEur } from '@/lib/data'

const SORT_OPTS = [
  { label: 'Nome', value: 'name' },
  { label: 'Prezzo ↑', value: 'price-asc' },
  { label: 'Prezzo ↓', value: 'price-desc' },
]

const CATS = ['Tutti', 'capelli', 'accessori', 'styling', 'corpo', 'unghie', 'regali']

export default function ShopPage() {
  const [cat, setCat] = useState('Tutti')
  const [sort, setSort] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useShop()

  let items = cat === 'Tutti' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)
  items = [...items].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} prodotti</p>
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden p-2 border border-gray-200 rounded-lg text-gray-600"><Icon name="filter" size={20} /></button>
      </div>

      <div className="flex gap-8">
        <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-48 flex-shrink-0`}>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900 mb-3">Categorie</p>
            {CATS.map(c => (
              <button key={c} onClick={() => { setCat(c); setShowFilters(false) }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${cat === c ? 'bg-amber-50 text-amber-800 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                {c === 'Tutti' ? 'Tutti' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Ordina per</p>
            <select value={sort} onChange={e => setSort(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none">
              {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </aside>

        <div className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(p => (
            <Link key={p.id} href={`/shop/${p.id}`}>
              <Card className="overflow-hidden h-full flex flex-col hover:border-amber-200">
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-amber-800 font-bold">{formatEur(p.price)}</span>
                    {p.inStock ? (
                      <button onClick={e => { e.preventDefault(); addToCart({ productId: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 }) }} className="p-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors">
                        <Icon name="plus" size={16} />
                      </button>
                    ) : <Badge variant="danger">Esaurito</Badge>}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
