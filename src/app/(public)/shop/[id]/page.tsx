'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import { useShop } from '@/contexts/ShopContext'
import { Card, Badge, Icon } from '@/components/ui'
import { formatEur } from '@/lib/data'

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const p = PRODUCTS.find(x => x.id === id)
  const { addToCart } = useShop()
  const [qty, setQty] = useState(1)

  if (!p) notFound()

  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-800 mb-6 transition-colors"><Icon name="arrowLeft" size={16} /> Torna allo shop</Link>
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <Badge variant="info" className="mb-3">{p.category}</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{p.name}</h1>
          <p className="text-gray-600 mb-6">{p.description}</p>
          <p className="text-3xl font-bold text-amber-800 mb-6">{formatEur(p.price)}</p>
          {p.inStock ? (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-gray-50 transition-colors"><Icon name="minus" size={16} /></button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-gray-50 transition-colors"><Icon name="plus" size={16} /></button>
              </div>
              <button onClick={() => addToCart({ productId: p.id, name: p.name, price: p.price, image: p.image, quantity: qty })} className="flex-1 px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
                Aggiungi al carrello
              </button>
            </div>
          ) : <Badge variant="danger" className="text-sm px-4 py-2">Prodotto esaurito</Badge>}
          <p className="text-xs text-gray-400">Spedizione gratuita per ordini sopra i 50€</p>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Prodotti correlati</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(r => (
              <Link key={r.id} href={`/shop/${r.id}`}>
                <Card className="overflow-hidden hover:border-amber-200">
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm">{r.name}</h3>
                    <p className="text-amber-800 font-bold mt-1">{formatEur(r.price)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
