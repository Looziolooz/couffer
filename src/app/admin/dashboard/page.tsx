'use client'

import { TODAY_APPOINTMENTS, PRODUCTS, CLIENTS, TEAM, INVOICES, formatEur } from '@/lib/data'
import { Icon, Avatar } from '@/components/ui'
import Link from 'next/link'

function Sparkline({ data, color = '#8B7355' }: { data: number[]; color?: string }) {
  const w = 100, h = 32
  const mn = Math.min(...data), mx = Math.max(...data)
  const sp = mx - mn || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - mn) / sp) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between text-[13.5px]">
    <span className="text-ink-3">{k}</span>
    <span className="font-medium text-ink">{v}</span>
  </div>
)

export default function AdminDashboard() {
  const todayCount = TODAY_APPOINTMENTS.length
  const lowStock = PRODUCTS.filter(p => p.stock <= p.threshold)
  const pendingInvoices = INVOICES.filter(i => i.status === 'in sospeso' || i.status === 'scaduta')
  const pendingTotal = pendingInvoices.reduce((s, i) => s + i.total, 0)

  const fmt = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${(Math.round((h % 1) * 60)).toString().padStart(2, '0')}`

  return (
    <div>
      <div className="admin-header">
        <div>
          <div className="eyebrow mb-2">Mercoledì 17 maggio 2025</div>
          <h1 className="admin-title">Buongiorno.</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm"><Icon name="download" size={12}/> Esporta report</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" size={12}/> Nuovo appuntamento</button>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi">
          <div className="lbl">Ricavi · settimana</div>
          <div className="val">€&thinsp;3.840</div>
          <div className="delta up"><Icon name="trendingUp" size={11}/> +18% vs scorsa sett.</div>
          <Sparkline data={[24, 28, 22, 30, 36, 38, 42]}/>
        </div>
        <div className="kpi">
          <div className="lbl">Ricavi · mese</div>
          <div className="val">€&thinsp;14.220</div>
          <div className="delta up"><Icon name="trendingUp" size={11}/> +9% vs ottobre</div>
          <Sparkline data={[28, 30, 36, 32, 40, 38, 44, 48]}/>
        </div>
        <div className="kpi">
          <div className="lbl">Appuntamenti oggi</div>
          <div className="val">{todayCount}</div>
          <div className="delta text-ink-3">5 operatori · {todayCount - 3} in sala</div>
          <Sparkline data={[8, 12, 10, 14, 11, 13, 16]} color="#C9B8A0"/>
        </div>
        <div className="kpi bg-[var(--color-pill-bg)] text-[#F5F1EA]" style={{ borderColor: 'var(--color-pill-bg)' }}>
          <div className="lbl text-white/60">Tasso occupazione</div>
          <div className="val text-white">87%</div>
          <div className="delta text-green-300">+4 punti vs target</div>
          <Sparkline data={[60, 72, 65, 78, 82, 85, 87]} color="#C9B8A0"/>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 mt-4">
        {/* TODAY */}
        <div className="card-elev p-0">
          <div className="flex justify-between items-center px-6 py-5 border-b border-line">
            <div>
              <div className="eyebrow mb-1">Oggi · agenda</div>
              <h3 className="font-display text-[22px] font-medium text-ink m-0">{todayCount} appuntamenti</h3>
            </div>
            <Link href="/admin/calendar" className="btn btn-ghost btn-sm">Apri agenda <Icon name="arrowRight" size={12}/></Link>
          </div>
          <div className="py-2">
            {TODAY_APPOINTMENTS.slice(0, 6).map(a => {
              const t = TEAM.find(tm => tm.id === a.operatorId)
              const startH = parseInt(a.time.split(':')[0]) + parseInt(a.time.split(':')[1]) / 60
              const endH = startH + a.duration / 60
              return (
                <div key={a.id} className="grid grid-cols-[auto_1fr_auto] gap-4 px-6 py-3 items-center border-b border-dashed border-line-2">
                  <div className="font-display text-lg text-ink min-w-[100px]">
                    {fmt(startH)} <span className="text-ink-3 text-[13px]">– {fmt(endH)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{a.clientName}</div>
                    <div className="text-xs text-ink-3">{a.service} · {t?.name}</div>
                  </div>
                  <Avatar src={t?.image} name={t?.name || ''} size="sm"/>
                </div>
              )
            })}
          </div>
        </div>

        {/* LOW STOCK */}
        <div className="card-elev p-0">
          <div className="flex justify-between items-center px-6 py-5 border-b border-line">
            <div>
              <div className="eyebrow mb-1">Magazzino</div>
              <h3 className="font-display text-[22px] font-medium text-ink m-0">
                <Icon name="alert" size={16}/> In esaurimento
              </h3>
            </div>
            <Link href="/admin/inventory" className="btn btn-ghost btn-sm">Apri <Icon name="arrowRight" size={12}/></Link>
          </div>
          <div className="py-2">
            {lowStock.slice(0, 6).map(p => (
              <div key={p.id} className="grid grid-cols-[auto_1fr_auto] gap-3 px-6 py-3 items-center border-b border-dashed border-line-2">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-bg-soft flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy"/>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-ink">{p.name}</div>
                  <div className="text-[11.5px] text-ink-3">{p.brand}</div>
                </div>
                <span className={`badge-pill ${p.stock === 0 ? 'danger' : 'warn'}`}>
                  {p.stock === 0 ? 'Esaurito' : `${p.stock} pezzi`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* TOP CLIENTS */}
        <div className="card-elev">
          <div className="eyebrow mb-1">Clienti top · ultimo trimestre</div>
          <h3 className="font-display text-[22px] font-medium text-ink mb-5">Più fedeli</h3>
          <div className="overflow-x-auto">
          <table className="tbl" style={{ background: 'transparent', border: 'none' }}>
            <thead>
              <tr><th style={{ background: 'transparent' }}>Cliente</th><th style={{ background: 'transparent' }}>Visite</th><th style={{ background: 'transparent' }}>Spesa</th><th style={{ background: 'transparent' }}>Status</th></tr>
            </thead>
            <tbody>
              {[...CLIENTS].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5).map(c => (
                <tr key={c.id}>
                  <td><div className="flex items-center gap-2.5"><Avatar src={c.avatar} name={c.name} size="sm"/><span className="strong">{c.name}</span></div></td>
                  <td>{c.totalVisits}</td>
                  <td className="strong">{formatEur(c.totalSpent)}</td>
                  <td>
                    <span className="badge-pill" style={{
                      background: c.level === 'Platino' ? 'rgba(31,27,23,0.08)' : c.level === 'Oro' ? 'rgba(184,137,63,0.16)' : c.level === 'Argento' ? 'rgba(138,128,119,0.16)' : 'rgba(166,83,60,0.12)',
                      color: c.level === 'Platino' ? 'var(--color-ink)' : c.level === 'Oro' ? 'var(--color-warn)' : c.level === 'Argento' ? 'var(--color-ink-2)' : 'var(--color-danger)',
                    }}>{c.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* STAFF PERFORMANCE */}
        <div className="card-elev">
          <div className="eyebrow mb-1">Performance · settimana</div>
          <h3 className="font-display text-[22px] font-medium text-ink mb-5">Per operatore</h3>
          <div className="flex flex-col gap-4">
            {TEAM.map((t, i) => {
              const rev = [1240, 980, 720, 680, 540][i]
              const max = 1300
              return (
                <div key={t.id}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={t.image} name={t.name} size="sm"/>
                      <span className="text-[13.5px] font-medium text-ink">{t.name}</span>
                    </div>
                    <span className="font-display text-lg">{formatEur(rev)}</span>
                  </div>
                  <div className="h-1 bg-line-2 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${(rev / max * 100)}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* INVOICES PENDING */}
      <div className="card-elev p-0 mt-4">
        <div className="flex justify-between items-center px-6 py-5 border-b border-line">
          <div>
            <div className="eyebrow mb-1">Fatturazione</div>
            <h3 className="font-display text-[22px] font-medium text-ink m-0">
              {pendingInvoices.length} fatture in sospeso · {formatEur(pendingTotal)}
            </h3>
          </div>
          <Link href="/admin/invoices" className="btn btn-ghost btn-sm">Apri fatturazione <Icon name="arrowRight" size={12}/></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl" style={{ border: 'none', borderRadius: 0 }}>
            <thead>
              <tr><th>Numero</th><th>Data</th><th>Cliente</th><th>Importo</th><th>IVA</th><th>Stato</th><th></th></tr>
            </thead>
            <tbody>
              {pendingInvoices.map(inv => (
                <tr key={inv.id}>
                  <td className="strong">{inv.number}</td>
                  <td>{inv.date}</td>
                  <td>{inv.clientName}</td>
                  <td className="strong">{formatEur(inv.total)}</td>
                  <td>22%</td>
                  <td><span className="badge-pill warn">{inv.status}</span></td>
                  <td><button className="btn btn-quiet btn-sm"><Icon name="mail" size={12}/> Sollecito</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
