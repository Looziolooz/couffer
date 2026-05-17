'use client'

import { useState } from 'react'
import { INVOICES, formatEur } from '@/lib/data'
import { Card, Badge, Icon, Modal } from '@/components/ui'

export default function AdminInvoices() {
  const [filter, setFilter] = useState<'all' | 'pagata' | 'in sospeso' | 'scaduta'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)

  const items = filter === 'all' ? INVOICES : INVOICES.filter(i => i.status === filter)
  const selected = INVOICES.find(i => i.id === selectedId)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fatture</h1>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-4 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900 transition-colors">
          <Icon name="plus" size={16} /> Nuova fattura
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'pagata', 'in sospeso', 'scaduta'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f === 'all' ? 'Tutte' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map(i => (
          <Card key={i.id} className="p-5 cursor-pointer hover:border-amber-200" onClick={() => setSelectedId(i.id)}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{i.number}</p>
                <p className="text-sm text-gray-500">{i.clientName} · {i.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatEur(i.total)}</p>
                <Badge variant={i.status === 'pagata' ? 'success' : i.status === 'in sospeso' ? 'warning' : 'danger'}>{i.status}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelectedId(null)} title={`Fattura ${selected?.number}`}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Cliente</p><p className="font-medium">{selected.clientName}</p></div>
              <div><p className="text-gray-500">Email</p><p className="font-medium">{selected.clientEmail}</p></div>
              <div><p className="text-gray-500">Data</p><p className="font-medium">{selected.date}</p></div>
              <div><p className="text-gray-500">Scadenza</p><p className="font-medium">{selected.dueDate}</p></div>
              <div><p className="text-gray-500">Stato</p><Badge variant={selected.status === 'pagata' ? 'success' : selected.status === 'in sospeso' ? 'warning' : 'danger'}>{selected.status}</Badge></div>
            </div>
            <div className="border-t pt-4">
              <table className="w-full text-sm">
                <thead className="text-gray-500">
                  <tr><th className="text-left pb-2 font-medium">Descrizione</th><th className="text-center pb-2 font-medium">Q.tà</th><th className="text-right pb-2 font-medium">Prezzo</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selected.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2">{item.description}</td>
                      <td className="py-2 text-center">{item.quantity}</td>
                      <td className="py-2 text-right">{formatEur(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t pt-4 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotale</span><span>{formatEur(selected.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">IVA (22%)</span><span>{formatEur(selected.tax)}</span></div>
              <div className="flex justify-between font-bold text-base"><span>Totale</span><span className="text-amber-800">{formatEur(selected.total)}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={showNew} onClose={() => setShowNew(false)} title="Nuova fattura">
        <div className="space-y-4">
          <input placeholder="Cliente" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          <input placeholder="Email cliente" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
            <input type="date" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <textarea placeholder="Descrizione servizio" rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Importo" className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
            <select className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none">
              <option>Pagata</option>
              <option>In sospeso</option>
            </select>
          </div>
          <button className="w-full px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">
            Crea fattura
          </button>
        </div>
      </Modal>
    </div>
  )
}
