'use client'

import { useState } from 'react'
import { PRODUCTS, formatEur } from '@/lib/data'
import { Card, Badge, Icon } from '@/components/ui'

export default function AdminInventory() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all')

  let items = PRODUCTS
  if (search) items = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  if (filter === 'low') items = items.filter(p => p.inStock && p.stock <= p.threshold)
  if (filter === 'out') items = items.filter(p => !p.inStock)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Magazzino</h1>
        <div className="text-sm text-gray-500">{items.length} prodotti</div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cerca prodotto..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
        </div>
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Tutti</button>
        <button onClick={() => setFilter('low')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'low' ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Sotto soglia</button>
        <button onClick={() => setFilter('out')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'out' ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Esauriti</button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Prodotto</th>
                <th className="text-left px-4 py-3 font-medium">Categoria</th>
                <th className="text-right px-4 py-3 font-medium">Prezzo</th>
                <th className="text-right px-4 py-3 font-medium">Stock</th>
                <th className="text-right px-4 py-3 font-medium">Soglia</th>
                <th className="text-center px-4 py-3 font-medium">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <span className="font-medium text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatEur(p.price)}</td>
                  <td className="px-4 py-3 text-right">{p.stock}</td>
                  <td className="px-4 py-3 text-right text-gray-400">{p.threshold}</td>
                  <td className="px-4 py-3 text-center">
                    {!p.inStock ? <Badge variant="danger">Esaurito</Badge> : p.stock <= p.threshold ? <Badge variant="warning">Critico</Badge> : <Badge variant="success">Ok</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
