'use client'

import { useState } from 'react'
import { MY_APPOINTMENTS, MY_ORDERS, CLIENTS, formatEur } from '@/lib/data'
import { Card, Badge, Icon } from '@/components/ui'

const TABS = [
  { id: 'appointments', label: 'Appuntamenti', icon: 'calendar' },
  { id: 'orders', label: 'Ordini', icon: 'shoppingBag' },
  { id: 'profile', label: 'Profilo', icon: 'user' },
  { id: 'loyalty', label: 'Fedeltà', icon: 'gift' },
]

const client = CLIENTS[0]

export default function AccountPage() {
  const [tab, setTab] = useState('appointments')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
          <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-sm text-gray-500">{client.email}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-8 border-b border-gray-100 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            tab === t.id ? 'border-amber-800 text-amber-800' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}>
            <Icon name={t.icon} size={16} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'appointments' && (
        <div className="space-y-4">
          {MY_APPOINTMENTS.map(a => (
            <Card key={a.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{a.service}</h3>
                    <Badge variant={a.status === 'confermato' ? 'success' : a.status === 'completato' ? 'info' : 'danger'}>{a.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Icon name="user" size={14} />{a.operatorName}</span>
                    <span className="flex items-center gap-1"><Icon name="calendar" size={14} />{a.date}</span>
                    <span className="flex items-center gap-1"><Icon name="clock" size={14} />{a.time}</span>
                  </div>
                </div>
                <span className="text-amber-800 font-bold">{formatEur(a.price)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-4">
          {MY_ORDERS.map(o => (
            <Card key={o.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Ordine #{o.id}</p>
                  <p className="text-xs text-gray-400">{o.date}</p>
                </div>
                <Badge variant={o.status === 'consegnato' ? 'success' : o.status === 'elaborazione' ? 'warning' : 'info'}>{o.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                {o.items.map((item: { productId: string; name: string; quantity: number; price: number }) => (
                  <div key={item.productId} className="flex justify-between">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-medium">{formatEur(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                <span>Totale</span>
                <span>{formatEur(o.total)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'profile' && (
        <Card className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">Nome</p>
              <p className="font-medium">{client.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Telefono</p>
              <p className="font-medium">{client.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Membro dal</p>
              <p className="font-medium">Gennaio 2024</p>
            </div>
          </div>
        </Card>
      )}

      {tab === 'loyalty' && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-amber-800 to-amber-900 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-amber-200 text-sm">Tuo livello</p>
                <h3 className="text-2xl font-bold">{client.level}</h3>
              </div>
              <Icon name="gift" size={40} className="text-amber-300" />
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-amber-200 mb-1">
                <span>Punti fedeltà</span>
                <span className="font-bold text-white">{client.points}</span>
              </div>
              <div className="h-2 bg-amber-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, (client.points / 1500) * 100)}%` }} />
              </div>
            </div>
            <p className="text-xs text-amber-300 mt-2">{client.points}/1500 punti per il livello Platino</p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{client.totalVisits}</p>
              <p className="text-sm text-gray-500">Visite totali</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{formatEur(client.totalSpent)}</p>
              <p className="text-sm text-gray-500">Speso totale</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{client.totalVisits}</p>
              <p className="text-sm text-gray-500">Prossimo premio</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
