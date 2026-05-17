'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useShop } from '@/contexts/ShopContext'
import { Card, Icon } from '@/components/ui'
import { formatEur } from '@/lib/data'

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop()
  const [step, setStep] = useState<string>('shipping')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' })

  if (cart.length === 0 && step !== 'confirm') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Nessun prodotto</h1>
        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
          Torna allo shop <Icon name="arrowRight" size={18} />
        </Link>
      </div>
    )
  }

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  if (step === 'confirm') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Icon name="check" size={32} className="text-green-600" /></div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ordine confermato!</h1>
        <p className="text-gray-500 mb-2">Grazie {form.name}, il tuo ordine è stato ricevuto.</p>
        <p className="text-sm text-gray-400 mb-8">Riceverai una conferma via email a {form.email}</p>
        <Link href="/account" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
          Vedi i tuoi ordini <Icon name="arrowRight" size={18} />
        </Link>
      </div>
    )
  }

  const steps = [
    { key: 'shipping', num: 1, label: 'Indirizzo di spedizione' },
    { key: 'payment', num: 2, label: 'Pagamento' },
  ] as const

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {steps.map(s => {
            const active = step === s.key
            const done = (s.key === 'shipping' && step === 'payment') || (step === 'confirm')
            return (
              <Card key={s.key} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${active ? 'bg-amber-800 text-white' : done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {done ? <Icon name="check" size={16} /> : s.num}
                  </div>
                  <span className="font-semibold text-gray-900">{s.label}</span>
                </div>

                {s.key === 'shipping' && active && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Nome e cognome" className="sm:col-span-2 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                      <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="Email" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                      <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="Telefono" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                      <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="Indirizzo" className="sm:col-span-2 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                      <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Città" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                      <input value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="CAP" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                    </div>
                    <button onClick={() => setStep('payment')} disabled={!form.name || !form.email} className="mt-6 px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 disabled:opacity-50 transition-colors">
                      Continua al pagamento
                    </button>
                  </>
                )}

                {s.key === 'payment' && active && (
                  <div className="space-y-4">
                    <input placeholder="Numero carta" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Scadenza" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                      <input placeholder="CVV" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
                    </div>
                    <button onClick={() => { clearCart(); setStep('confirm') }} className="w-full px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
                      Paga {formatEur(cartTotal + (cartTotal >= 50 ? 0 : 5.90))}
                    </button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        <div>
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Riepilogo ordine</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.productId} className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">{item.name}</p>
                    <p className="text-gray-500">x{item.quantity}</p>
                  </div>
                  <span className="font-medium">{formatEur(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotale</span><span>{formatEur(cartTotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Spedizione</span><span>{cartTotal >= 50 ? <span className="text-green-600">Gratuita</span> : formatEur(5.90)}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base"><span>Totale</span><span>{formatEur(cartTotal + (cartTotal >= 50 ? 0 : 5.90))}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
