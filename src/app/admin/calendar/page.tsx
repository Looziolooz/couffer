'use client'

import { useState } from 'react'
import { TODAY_APPOINTMENTS, TEAM } from '@/lib/data'
import { Card, Badge, Icon } from '@/components/ui'

const HOURS = Array.from({ length: 12 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00`)

export default function AdminCalendar() {
  const [op, setOp] = useState('all')
  const apps = op === 'all' ? TODAY_APPOINTMENTS : TODAY_APPOINTMENTS.filter(a => a.operatorId === op)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">17 Maggio 2025</div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button onClick={() => setOp('all')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${op === 'all' ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Tutti</button>
        {TEAM.map(t => (
          <button key={t.id} onClick={() => setOp(t.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${op === t.id ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t.name.split(' ')[0]}</button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-100">
          {HOURS.map(hour => {
            const slotApps = apps.filter(a => a.time.startsWith(hour))
            return (
              <div key={hour} className="flex min-h-[60px]">
                <div className="w-16 flex-shrink-0 text-xs text-gray-400 py-3 px-3 border-r border-gray-100">{hour}</div>
                <div className="flex-1 p-1 flex gap-2 flex-wrap">
                  {slotApps.map(a => (
                    <div key={a.id} className={`px-3 py-2 rounded-lg text-xs min-w-[140px] ${
                      a.status === 'confermato' ? 'bg-amber-50 border border-amber-200' : a.status === 'completato' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-medium text-gray-900">{a.clientName}</span>
                        <Badge variant={a.status === 'confermato' ? 'success' : a.status === 'completato' ? 'info' : 'danger'}>{a.status === 'confermato' ? 'Conf.' : a.status === 'completato' ? 'Done' : 'Canc.'}</Badge>
                      </div>
                      <span className="text-gray-500">{a.service}</span>
                      <span className="text-gray-400 ml-2">· {a.operatorName}</span>
                      <span className="text-gray-400 ml-2">{a.time} ({a.duration}&apos;)</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
