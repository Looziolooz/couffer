<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Goal
Demo Couffer completa con feature di parruchiere, ricostruita in Next.js 16 + Tailwind v4, con dati hardcoded e foto placeholder reali.

## Constraints & Preferences
- Progetto in `C:\Users\loren\Desktop\dev-projects\vault\20-progetti\couffer`
- Next.js 16 App Router + Tailwind v4
- Tutti i dati hardcoded, nessun backend
- Design AURA (palette sabbia calda, font Cormorant Garamond, stile Scandi minimal)
- Foto placeholder reali da Unsplash, picsum solo come fallback per ID rotti
- Repository: `https://github.com/Looziolooz/couffer.git`

## Progress

### Done
- Scaffoldato Next.js 16 + Tailwind v4 con `create-next-app`
- Tipi TypeScript in `src/lib/types.ts` (Service, TeamMember, Product, Appointment, Client, CartItem, Order, Invoice)
- Dati mock in `src/lib/data.ts`: 13 servizi, 5 operatori, 12 prodotti, 6 clienti, appuntamenti, fatture, testimonial, performance staff
- `ShopContext` (carrello) e `BookingContext` (5-step booking) in `src/contexts/`
- Componenti condivisi in `src/components/ui.tsx`: Icon (~55 SVG), Photo, Avatar, Modal, Stepper, Card, Badge, KpiCard, PageSection, SectionGrid
- `PublicHeader.tsx`: brand dot, nav attiva, sticky+blur, cart icon con badge, CTA Prenota + Admin ghost, **hamburger menu mobile** con drawer laterale e backdrop
- `PublicFooter.tsx`: grid 4 colonne responsiva (1→2→4 breakpoint)
- `AdminShell.tsx`: sidebar admin con link attivi, **off-canvas mobile** con hamburger toggle e backdrop
- Root layout `src/app/layout.tsx` con Cormorant Garamond + Inter via `next/font/google`
- `globals.css`: `@theme` Tailwind v4 palette AURA + `@layer components` admin (kpi, agenda, tbl, tag, card-elev, icon-btn, slot, cal-grid, appt, sparkline, etc.)
- Homepage: hero con foto, servizi, team, shop preview, testimonial, CTA
- Servizi: filtro per categoria, griglia card con foto
- Team: profili con rating, specialità
- Booking: 5 step (Servizio → Operatore → Giorno → Orario → Conferma), prefill da `?service=`
- Shop: catalogo con filtri categoria + sorting, card con foto
- Prodotto: dettaglio con qty selector, related products
- Carrello: lista con qty/edit/cancella, riepilogo con spedizione gratuita sopra 50€
- Checkout: 2 step (indirizzo + pagamento finto), conferma ordine
- Account: 4 tab (Appuntamenti, Ordini, Profilo, Fedeltà)
- Admin Dashboard: 4 KPI con sparkline, agenda oggi, stock alert, top clienti, staff performance, fatture pending, **pulsante "Torna al sito"**
- Admin Calendario: griglia oraria 9:00–18:30 con colonne per operatore, appuntamenti posizionati, sidebar riepilogo
- Admin Magazzino: 4 KPI, filtri categoria, tabella completa
- Admin Fatture: 4 KPI, filtri stato, modale dettaglio, form nuova fattura con righe dinamiche
- **Mobile-first responsive**: KPI grid 2 cols su mobile, tabelle con overflow-x-auto, dashboard/detail/form grid collassano, calendario scroll, footer collasso
- Git init su repo separato, pushato su `github.com/Looziolooz/couffer.git`

### In Progress
- *(none)*

### Blocked
- *(none)*

## Key Decisions
- Riscritto da zero in Next.js 16 + Tailwind v4 invece di vanilla React + Babel standalone
- Usato App Router con route group `(public)` per separare layout pubblico da admin
- Dati hardcoded in `data.ts` con tipi TypeScript
- Stato carrello gestito via React Context (`ShopContext`)
- Foto Unsplash ripristinate per coerenza visiva, picsum solo per ID 404
- Design AURA portato in Tailwind v4 via `@theme` + classi utility + palette esatta
- Repository separata per couffer con proprio `.git`
- Admin pages in componenti singoli (`'use client'`) con modali inline
- CSS admin integrato in globals.css come `@layer components`

## Next Steps
- *(nessuno — progetto completo)*

## Critical Context
- Next.js 16.2.6 con Turbopack (non Webpack). Build con `npm run build`
- `turbopack.root: __dirname` necessario per silenziare warning workspace multipli
- Tutte le pagine admin usano `'use client'` e layout dedicato (`admin/layout.tsx` → `AdminShell`)
- Foto Unsplash formato `{cifre}-{alphanumeric}`
- Design AURA: `--bg: #EDE8E0`, `--accent: #8B7355`, `--ink: #1F1B17`, font display Cormorant Garamond, font sans Inter
- Cart item salvano `image` URL per thumbnail

## Relevant Files
- `src/lib/types.ts`: tutte le interfacce TypeScript
- `src/lib/data.ts`: dati mock + helper `formatEur`, `COMPANY`, `TEAM_BY_SPECIALTY`
- `src/contexts/ShopContext.tsx`: stato carrello
- `src/contexts/BookingContext.tsx`: stato booking 5-step
- `src/components/ui.tsx`: icone, Avatar, Photo, Card, Badge, KpiCard, Modal, Stepper, PageSection, SectionGrid
- `src/components/PublicHeader.tsx`: header AURA con hamburger mobile drawer
- `src/components/PublicFooter.tsx`: footer AURA grid responsivo
- `src/components/AdminShell.tsx`: sidebar admin off-canvas mobile
- `src/app/globals.css`: `@theme` Tailwind v4 + `@layer components`
- `src/app/layout.tsx`: font + root Providers
- `src/app/admin/dashboard/page.tsx`: dashboard con KPI + pulsante Torna al sito
- `src/app/admin/calendar/page.tsx`: agenda timeline
- `src/app/admin/inventory/page.tsx`: magazzino
- `src/app/admin/invoices/page.tsx`: fatture
