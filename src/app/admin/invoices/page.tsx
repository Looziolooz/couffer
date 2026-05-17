'use client'

import { useState } from 'react'
import { INVOICES, CLIENTS, formatEur } from '@/lib/data'
import { Icon, Modal } from '@/components/ui'

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between text-[13.5px]">
    <span className="text-ink-3">{k}</span>
    <span className="font-medium text-ink">{v}</span>
  </div>
)

const INVOICE_FILTERS = ['Tutte', 'pagata', 'in sospeso', 'scaduta', 'Bozza']

export default function AdminInvoices() {
  const [filter, setFilter] = useState('Tutte')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)

  const list = filter === 'Tutte' ? INVOICES : INVOICES.filter(i => i.status === filter)
  const selected = INVOICES.find(i => i.id === selectedId)
  const totalAll = INVOICES.reduce((a, b) => a + b.total, 0)
  const totalPaid = INVOICES.filter(i => i.status === 'pagata').reduce((a, b) => a + b.total, 0)
  const totalPending = INVOICES.filter(i => i.status === 'in sospeso' || i.status === 'scaduta').reduce((a, b) => a + b.total, 0)

  return (
    <div>
      <div className="admin-header">
        <div>
          <div className="eyebrow mb-2">Novembre 2025</div>
          <h1 className="admin-title">Fatturazione</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm"><Icon name="download" size={12}/> Esporta XML</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowNew(true)}><Icon name="plus" size={12}/> Nuova fattura</button>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-grid mb-6">
        <div className="kpi">
          <div className="lbl">Fatturato mese</div>
          <div className="val">{formatEur(totalAll)}</div>
          <div className="delta up">+9% vs ottobre</div>
        </div>
        <div className="kpi">
          <div className="lbl">Incassato</div>
          <div className="val" style={{ color: 'var(--color-success)' }}>{formatEur(totalPaid)}</div>
          <div className="delta text-ink-3">{INVOICES.filter(i => i.status === 'pagata').length} fatture</div>
        </div>
        <div className="kpi">
          <div className="lbl">In sospeso</div>
          <div className="val" style={{ color: 'var(--color-warn)' }}>{formatEur(totalPending)}</div>
          <div className="delta" style={{ color: 'var(--color-warn)' }}>{INVOICES.filter(i => i.status === 'in sospeso' || i.status === 'scaduta').length} fatture · max 14 gg</div>
        </div>
        <div className="kpi">
          <div className="lbl">Prossimo invio SdI</div>
          <div className="val">3</div>
          <div className="delta text-ink-3">Auto-invio ven 21 nov</div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1.5">
          {INVOICE_FILTERS.map(c => (
            <button key={c} className={`tag ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)} style={{ padding: '8px 14px' }}>
              {c} <span className="opacity-55 ml-1">
                {c === 'Tutte' ? INVOICES.length : INVOICES.filter(i => i.status === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
      <table className="tbl">
        <thead>
          <tr>
            <th>Numero</th><th>Data</th><th>Cliente</th>
            <th style={{ textAlign: 'right' }}>Imponibile</th><th>IVA</th>
            <th style={{ textAlign: 'right' }}>Totale</th><th>Stato</th><th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(inv => (
            <tr key={inv.id} onClick={() => setSelectedId(inv.id)} style={{ cursor: 'default' }}>
              <td className="strong">{inv.number}</td>
              <td>{inv.date}</td>
              <td>{inv.clientName}</td>
              <td style={{ textAlign: 'right' }}>{formatEur(inv.subtotal)}</td>
              <td>22%</td>
              <td className="strong" style={{ textAlign: 'right' }}>{formatEur(inv.total)}</td>
              <td>
                {inv.status === 'pagata' && <span className="badge-pill success">Pagata</span>}
                {inv.status === 'in sospeso' && <span className="badge-pill warn">In sospeso</span>}
                {inv.status === 'scaduta' && <span className="badge-pill danger">Scaduta</span>}
              </td>
              <td>
                <div className="flex gap-1">
                  <button className="icon-btn" title="Visualizza" onClick={(e) => { e.stopPropagation(); setSelectedId(inv.id); }}>
                    <Icon name="eye" size={13}/>
                  </button>
                  <button className="icon-btn" title="Scarica PDF"><Icon name="download" size={13}/></button>
                  <button className="icon-btn" title="Altro"><Icon name="more" size={13}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* DETAIL MODAL */}
      <Modal open={!!selected} onClose={() => setSelectedId(null)}>
        {selected && <InvoiceDetail inv={selected} onClose={() => setSelectedId(null)}/>}
      </Modal>

      {/* NEW INVOICE MODAL */}
      <Modal open={showNew} onClose={() => setShowNew(false)}>
        <NewInvoiceForm onClose={() => setShowNew(false)}/>
      </Modal>
    </div>
  )
}

function InvoiceDetail({ inv, onClose }: { inv: typeof INVOICES[0]; onClose: () => void }) {
  const items = inv.items.length > 0 ? inv.items : [
    { description: 'Mèches & balayage', quantity: 1, price: 145 },
    { description: 'Trattamento ristrutturante', quantity: 1, price: 38 },
  ]
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0)
  const vat = subtotal * 0.22
  const total = subtotal + vat

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="eyebrow mb-2">Fattura · {inv.status}</div>
          <h2 className="font-display text-[36px] font-medium text-ink m-0">{inv.number}</h2>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" size={14}/></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="eyebrow mb-2">Da</div>
          <div className="font-display text-lg mb-1">Couffer</div>
          <div className="text-[13px] text-ink-2 leading-relaxed">
            Via Roma 123<br/>20100 Milano (MI)<br/>P.IVA 01234567890
          </div>
        </div>
        <div>
          <div className="eyebrow mb-2">Cliente</div>
          <div className="font-display text-lg mb-1">{inv.clientName}</div>
          <div className="text-[13px] text-ink-2 leading-relaxed">
            Cliente privato<br/>{inv.clientEmail}<br/>Data emissione: {inv.date}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
      <table className="tbl mb-4">
        <thead>
          <tr><th>Descrizione</th><th style={{ textAlign: 'right' }}>Qtà</th><th style={{ textAlign: 'right' }}>Prezzo</th><th>IVA</th><th style={{ textAlign: 'right' }}>Totale</th></tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td className="strong">{it.description}</td>
              <td style={{ textAlign: 'right' }}>{it.quantity}</td>
              <td style={{ textAlign: 'right' }}>{formatEur(it.price)}</td>
              <td>22%</td>
              <td className="strong" style={{ textAlign: 'right' }}>{formatEur(it.price * it.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex justify-end mb-6">
        <div className="min-w-[260px] flex flex-col gap-2">
          <Row k="Subtotale" v={formatEur(subtotal)}/>
          <Row k="IVA 22%" v={formatEur(vat)}/>
          <div className="flex justify-between pt-3 border-t border-line">
            <span className="eyebrow">Totale</span>
            <span className="font-display text-[28px] text-ink">{formatEur(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button className="btn btn-ghost btn-sm"><Icon name="mail" size={12}/> Invia al cliente</button>
        <button className="btn btn-ghost btn-sm"><Icon name="download" size={12}/> Scarica PDF</button>
        <button className="btn btn-primary btn-sm">Invia a SdI <Icon name="arrowRight" size={12}/></button>
      </div>
    </div>
  )
}

function NewInvoiceForm({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState([{ description: 'Taglio & piega donna', quantity: 1, price: 45 }])
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0)
  const vat = subtotal * 0.22
  const total = subtotal + vat

  const addRow = () => setItems([...items, { description: '', quantity: 1, price: 0 }])
  const remove = (i: number) => setItems(items.filter((_, ix) => ix !== i))
  const update = (i: number, k: string, v: string | number) => setItems(items.map((row, ix) => ix === i ? { ...row, [k]: v } : row))

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="eyebrow mb-2">Nuova fattura</div>
          <h2 className="font-display text-[32px] font-medium text-ink m-0">FT-2025-0156</h2>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" size={14}/></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="field">
          <span className="label">Cliente</span>
          <select className="select">
            {CLIENTS.map(c => <option key={c.id}>{c.name}</option>)}
            <option>+ Nuovo cliente</option>
          </select>
        </div>
        <div className="field">
          <span className="label">Data emissione</span>
          <input className="input" defaultValue="17/05/2025"/>
        </div>
        <div className="field">
          <span className="label">Metodo pagamento</span>
          <select className="select"><option>Carta</option><option>Contanti</option><option>Bonifico</option></select>
        </div>
        <div className="field">
          <span className="label">Scadenza</span>
          <input className="input" defaultValue="17/05/2025"/>
        </div>
      </div>

      <div className="eyebrow mb-2">Voci</div>
      <div className="flex flex-col gap-2 mb-4">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-[1fr_60px_80px_80px_36px] sm:grid-cols-[1fr_70px_100px_100px_40px] gap-2 items-center">
            <input className="input" placeholder="Descrizione" value={it.description}
              onChange={e => update(i, 'description', e.target.value)}/>
            <input className="input" type="number" value={it.quantity}
              onChange={e => update(i, 'quantity', +e.target.value || 1)} style={{ textAlign: 'center' }}/>
            <input className="input" type="number" value={it.price}
              onChange={e => update(i, 'price', +e.target.value || 0)} style={{ textAlign: 'right' }}/>
            <div className="text-right font-medium text-sm">{formatEur(it.price * it.quantity)}</div>
            <button className="icon-btn" onClick={() => remove(i)}
              disabled={items.length === 1} style={{ opacity: items.length === 1 ? 0.4 : 1 }}>
              <Icon name="trash" size={12}/>
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-ghost btn-sm" onClick={addRow}><Icon name="plus" size={12}/> Aggiungi voce</button>

      <div className="flex justify-end mt-6 mb-6">
        <div className="min-w-[260px] flex flex-col gap-2">
          <Row k="Subtotale" v={formatEur(subtotal)}/>
          <Row k="IVA 22%" v={formatEur(vat)}/>
          <div className="flex justify-between pt-3 border-t border-line">
            <span className="eyebrow">Totale</span>
            <span className="font-display text-[28px] text-ink">{formatEur(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Annulla</button>
        <button className="btn btn-ghost btn-sm">Salva bozza</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>Emetti e invia <Icon name="arrowRight" size={12}/></button>
      </div>
    </div>
  )
}
