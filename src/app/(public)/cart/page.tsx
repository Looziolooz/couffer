'use client'

import Link from 'next/link'
import { useShop } from '@/contexts/ShopContext'
import { Card, Icon } from '@/components/ui'
import { formatEur } from '@/lib/data'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useShop()

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="shoppingBag" size={32} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Carrello vuoto</h1>
        <p className="text-gray-500 mb-6">Non hai ancora aggiunto prodotti al carrello.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
          Scopri lo shop <Icon name="arrowRight" size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrello</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {cart.map(item => (
            <Card key={item.productId} className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/shop/${item.productId}`} className="font-medium text-gray-900 hover:text-amber-800 transition-colors">{item.name}</Link>
                <p className="text-amber-800 font-bold text-sm mt-0.5">{formatEur(item.price)}</p>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="p-2 hover:bg-gray-50 transition-colors"><Icon name="minus" size={14} /></button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="p-2 hover:bg-gray-50 transition-colors"><Icon name="plus" size={14} /></button>
              </div>
              <p className="font-semibold text-gray-900 w-20 text-right">{formatEur(item.price * item.quantity)}</p>
              <button onClick={() => removeFromCart(item.productId)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Icon name="trash" size={18} /></button>
            </Card>
          ))}
        </div>

        <div>
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Riepilogo</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotale</span>
                <span>{formatEur(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Spedizione</span>
                <span>{cartTotal >= 50 ? <span className="text-green-600">Gratuita</span> : formatEur(5.90)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                <span>Totale</span>
                <span>{formatEur(cartTotal + (cartTotal >= 50 ? 0 : 5.90))}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-6 block w-full text-center px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
              Procedi al checkout
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
