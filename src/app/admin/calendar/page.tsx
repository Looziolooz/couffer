'use client'

import { TODAY_APPOINTMENTS, TEAM, formatEur } from '@/lib/data'
import { Icon, Avatar } from '@/components/ui'

const HOURS = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
const SLOT_H = 60
const fmt = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${(Math.round((h % 1) * 60)).toString().padStart(2, '0')}`

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between text-[13.5px]">
    <span className="text-ink-3">{k}</span>
    <span className="font-medium text-ink">{v}</span>
  </div>
)

export default function AdminCalendar() {
  return (
    <div>
      <div className="admin-header">
        <div>
          <div className="eyebrow mb-2">Mer 17 mag 2025 · vista giornaliera</div>
          <h1 className="admin-title">Agenda</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <button className="icon-btn"><Icon name="chevronLeft" size={14}/></button>
            <button className="btn btn-ghost btn-sm">Oggi</button>
            <button className="icon-btn"><Icon name="chevronRight" size={14}/></button>
          </div>
          <select className="input" style={{ width: 130, padding: '8px 12px', fontSize: 13 }}>
            <option>Giorno</option>
            <option>Settimana</option>
            <option>Mese</option>
          </select>
          <button className="btn btn-primary btn-sm"><Icon name="plus" size={12}/> Nuovo</button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4 items-start">
        <div className="agenda" style={{ gridTemplateColumns: `60px repeat(${TEAM.length}, 1fr)` }}>
          <div className="agenda-h" style={{ background: 'var(--color-bg-soft)' }}></div>
          {TEAM.map(t => (
            <div key={t.id} className="agenda-h staff">
              <Avatar src={t.image} name={t.name} size="sm"/>
              <div className="nm">{t.name.split(' ')[0]}</div>
            </div>
          ))}

          {HOURS.map((h, hi) => (
            <div key={hi} style={{ display: 'contents' }}>
              <div className="agenda-time">{h % 1 === 0 ? `${h}:00` : ''}</div>
              {TEAM.map(t => {
                const appts = TODAY_APPOINTMENTS.filter(a => {
                  const startH = parseInt(a.time.split(':')[0]) + parseInt(a.time.split(':')[1]) / 60
                  return a.operatorId === t.id && startH >= h && startH < h + 0.5
                })
                return (
                  <div key={t.id + hi} className="agenda-cell">
                    {appts.map(a => {
                      const startH = parseInt(a.time.split(':')[0]) + parseInt(a.time.split(':')[1]) / 60
                      const endH = startH + a.duration / 60
                      const top = (startH - h) * (SLOT_H * 2)
                      const height = (endH - startH) * (SLOT_H * 2) - 2
                      return (
                        <div key={a.id} className={`appt tone-${a.tone || 1}`}
                          style={{ top, height, minHeight: 32 }}>
                          <div className="text-[10px] text-ink-3 mb-0.5">{fmt(startH)}–{fmt(endH)}</div>
                          <div className="nm">{a.clientName}</div>
                          <div className="svc">{a.service}</div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <aside className="card-elev sticky top-6">
          <div className="eyebrow mb-4">Riepilogo giorno</div>
          <div className="flex flex-col gap-3.5">
            <Row k="Appuntamenti" v={String(TODAY_APPOINTMENTS.length)}/>
            <Row k="Ore prenotate" v="22.5h / 26h"/>
            <Row k="Tasso occupazione" v="87%"/>
            <Row k="Ricavo previsto" v={formatEur(TODAY_APPOINTMENTS.reduce((s, a) => s + a.price, 0))}/>
            <Row k="Walk-in" v="1"/>
            <Row k="Disdette" v="0"/>
          </div>
          <div className="divider"></div>
          <div className="eyebrow mb-3">Slot liberi</div>
          <div className="flex flex-wrap gap-1.5">
            {['11:00 · Sofia', '13:00 · Alessandro', '13:30 · Martina', '17:00 · Luca', '17:30 · Sofia', '18:00 · Chiara'].map(s => (
              <span key={s} className="tag text-[11px]">{s}</span>
            ))}
          </div>
          <button className="btn btn-primary btn-sm w-full mt-5">
            <Icon name="plus" size={12}/> Aggiungi appuntamento
          </button>
        </aside>
      </div>
    </div>
  )
}
