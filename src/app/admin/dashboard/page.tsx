'use client'

import { TODAY_APPOINTMENTS, CLIENTS, PRODUCTS, STAFF_PERFORMANCE, INVOICES, formatEur } from '@/lib/data'
import { Card, Badge, Icon, KpiCard, Avatar } from '@/components/ui'

export default function AdminDashboard() {
  const todayRevenue = TODAY_APPOINTMENTS.filter(a => a.status === 'confermato').reduce((s, a) => s + a.price, 0)
  const lowStock = PRODUCTS.filter(p => p.stock <= p.threshold)
  const pendingInvoices = INVOICES.filter(i => i.status === 'in sospeso' || i.status === 'scaduta')
  const topClient = [...CLIENTS].sort((a, b) => b.totalSpent - a.totalSpent)[0]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <KpiCard label="Appuntamenti oggi" value={String(TODAY_APPOINTMENTS.length)} subtitle="di cui 3 in corso" icon={<Icon name="calendar" size={24} />} />
        <KpiCard label="Ricavi oggi" value={formatEur(todayRevenue)} subtitle="+15% vs ieri" icon={<Icon name="trendingUp" size={24} />} />
        <KpiCard label="Clienti attivi" value={String(CLIENTS.filter(c => c.status === 'attivo').length)} subtitle="+2 questa settimana" icon={<Icon name="users" size={24} />} />
        <KpiCard label="Fatture in sospeso" value={String(pendingInvoices.length)} subtitle={formatEur(pendingInvoices.reduce((s, i) => s + i.total, 0))} icon={<Icon name="fileText" size={24} />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Agenda oggi</h2>
          <div className="space-y-3">
            {TODAY_APPOINTMENTS.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">{a.clientName.split(' ').map(w => w[0]).join('')}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{a.clientName}</p>
                  <p className="text-xs text-gray-500">{a.service} · {a.operatorName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{a.time}</p>
                  <p className="text-xs text-gray-400">{a.duration} min</p>
                </div>
                <Badge variant={a.status === 'confermato' ? 'success' : a.status === 'completato' ? 'info' : 'danger'}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Allerte magazzino</h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-gray-400">Nessuna alerta.</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.image}</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-500">Stock: {p.stock} · Soglia: {p.threshold}</p>
                    </div>
                  </div>
                  <Badge variant="danger">{p.stock === 0 ? 'Esaurito' : 'Critico'}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Performance team</h2>
          <div className="space-y-4">
            {STAFF_PERFORMANCE.sort((a, b) => b.revenue - a.revenue).map(m => (
              <div key={m.name} className="flex items-center gap-3">
                <Avatar src={m.image} name={m.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.clients} clienti · {m.rating}/5</p>
                </div>
                <span className="font-bold text-sm text-amber-800">{formatEur(m.revenue)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Fatture in sospeso</h2>
          <div className="space-y-3">
            {pendingInvoices.map(i => (
              <div key={i.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm text-gray-900">{i.clientName}</p>
                  <p className="text-xs text-gray-500">{i.number} · Scad. {i.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatEur(i.total)}</p>
                  <Badge variant={i.status === 'scaduta' ? 'danger' : 'warning'}>{i.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
