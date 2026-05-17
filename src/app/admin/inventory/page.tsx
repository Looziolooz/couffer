'use client'

import { useState } from 'react'
import { PRODUCTS, formatEur } from '@/lib/data'
import { Icon, Badge } from '@/components/ui'

const PRODUCT_CATS = ['Tutti', 'capelli', 'accessori', 'styling', 'corpo', 'unghie', 'regali']

export default function AdminInventory() {
  const [filter, setFilter] = useState('Tutti')
  const list = filter === 'Tutti' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)
  const totalValue = PRODUCTS.reduce((a, b) => a + b.price * b.stock, 0)
  const lowCount = PRODUCTS.filter(p => p.stock <= p.threshold).length
  const outCount = PRODUCTS.filter(p => !p.inStock).length

  return (
    <div>
      <div className="admin-header">
        <div>
          <div className="eyebrow mb-2">Stock prodotti · 17 mag 2025</div>
          <h1 className="admin-title">Magazzino</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm"><Icon name="download" size={12}/> CSV</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" size={12}/> Nuovo prodotto</button>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-grid mb-6">
        <div className="kpi">
          <div className="lbl">Articoli totali</div>
          <div className="val">{PRODUCTS.length}</div>
          <div className="delta text-ink-3">{PRODUCT_CATS.length - 1} categorie</div>
        </div>
        <div className="kpi">
          <div className="lbl">Valore magazzino</div>
          <div className="val">{formatEur(totalValue)}</div>
          <div className="delta text-ink-3">Costo medio €{(totalValue / PRODUCTS.reduce((a, b) => a + b.stock, 0)).toFixed(0)}</div>
        </div>
        <div className="kpi">
          <div className="lbl">In esaurimento</div>
          <div className="val text-warn">{lowCount}</div>
          <div className="delta text-warn"><Icon name="alert" size={11}/> Riordinare presto</div>
        </div>
        <div className="kpi">
          <div className="lbl">Esauriti</div>
          <div className="val text-danger">{outCount}</div>
          <div className="delta text-danger">Da riordinare oggi</div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1.5">
          {PRODUCT_CATS.map(c => (
            <button key={c} className={`tag ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)} style={{ padding: '8px 14px' }}>
              {c === 'Tutti' ? 'Tutti' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm"><Icon name="filter" size={12}/> Filtri</button>
          <button className="btn btn-ghost btn-sm"><Icon name="search" size={12}/> Cerca</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
      <table className="tbl">
        <thead>
          <tr>
            <th>Prodotto</th>
            <th>Cat.</th>
            <th>Formato</th>
            <th style={{ textAlign: 'right' }}>Prezzo</th>
            <th style={{ textAlign: 'right' }}>Stock</th>
            <th>Soglia</th>
            <th>Stato</th>
            <th style={{ width: 100 }}></th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => {
            const status = !p.inStock ? 'out' : p.stock <= p.threshold ? 'low' : 'ok'
            return (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md overflow-hidden bg-bg-soft flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy"/>
                    </div>
                    <div>
                      <div className="strong">{p.name}</div>
                      <div className="text-[11.5px] text-ink-3">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td>{p.category}</td>
                <td>{p.size || '—'}</td>
                <td className="strong" style={{ textAlign: 'right' }}>{formatEur(p.price)}</td>
                <td style={{ textAlign: 'right' }}>
                  <span className="font-display text-[22px]" style={{
                    color: status === 'out' ? 'var(--color-danger)' : status === 'low' ? 'var(--color-warn)' : 'var(--color-ink)'
                  }}>{p.stock}</span>
                </td>
                <td>{p.threshold}</td>
                <td>
                  {status === 'ok' && <span className="badge-pill success"><span className="w-1.5 h-1.5 rounded-full bg-success inline-block"></span>Disponibile</span>}
                  {status === 'low' && <span className="badge-pill warn">In esaurimento</span>}
                  {status === 'out' && <span className="badge-pill danger">Esaurito</span>}
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="icon-btn" title="Modifica"><Icon name="edit" size={13}/></button>
                    <button className="icon-btn" title="Riordina"><Icon name="plus" size={13}/></button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}
