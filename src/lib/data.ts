import type { Service, TeamMember, Product, Appointment, Client, Invoice, Order } from './types'

export const COMPANY = {
  name: 'Couffer',
  tagline: 'Il tuo benessere, la nostra arte',
  phone: '+39 02 1234 5678',
  email: 'info@couffer.it',
  address: 'Via Roma 123, 20100 Milano',
  hours: 'Mar–Sab 9:00–20:00',
  heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
}

export const SERVICES: Service[] = [
  { id: 's1', name: 'Taglio Donna', description: 'Taglio personalizzato con consulenza dedicata', price: 55, duration: 60, category: 'taglio', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80' },
  { id: 's2', name: 'Taglio Uomo', description: 'Taglio classico o moderno con finitura', price: 30, duration: 30, category: 'taglio', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80' },
  { id: 's3', name: 'Colore', description: 'Tintura con prodotti professionali', price: 70, duration: 90, category: 'colore', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
  { id: 's4', name: 'Meches', description: 'Schiariture a ciocche per un effetto naturale', price: 90, duration: 120, category: 'colore', image: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&q=80' },
  { id: 's5', name: 'Piega', description: 'Piega e styling con phon e spazzola', price: 35, duration: 30, category: 'styling', image: 'https://picsum.photos/seed/piega/400/300' },
  { id: 's6', name: 'Permanente', description: 'Onde e ricci strutturati di lunga durata', price: 80, duration: 120, category: 'trattamento', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80' },
  { id: 's7', name: 'Trattamento Idratante', description: 'Trattamento profondo per capelli secchi', price: 45, duration: 45, category: 'trattamento', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
  { id: 's8', name: 'Manicure Classica', description: 'Cura e smalto per unghie perfette', price: 35, duration: 45, category: 'unghie', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&q=80' },
  { id: 's9', name: 'Pedicure', description: 'Trattamento completo piedi con relax', price: 45, duration: 60, category: 'unghie', image: 'https://picsum.photos/seed/pedicure/400/300' },
  { id: 's10', name: 'Taglio Bambino', description: 'Taglio rapido e divertente per i più piccoli', price: 20, duration: 20, category: 'taglio', image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80' },
  { id: 's11', name: 'Consulenza Immagine', description: 'Analisi del viso e consigli su taglio e colore', price: 40, duration: 45, category: 'consulenza', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80' },
  { id: 's12', name: 'Ceretta Viso', description: 'Depilazione sopracciglia e labbro', price: 15, duration: 15, category: 'estetica', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
  { id: 's13', name: 'Massaggio Relax', description: 'Massaggio decontratturante di 30 minuti', price: 50, duration: 30, category: 'benessere', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80' },
]

export const TEAM: TeamMember[] = [
  { id: 't1', name: 'Sofia Marchetti', role: 'Stylist Senior', bio: '15 anni di esperienza nel settore luxury', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80', specialties: ['taglio', 'colore'], rating: 4.9 },
  { id: 't2', name: 'Alessandro Rossi', role: 'Barbiere & Stylist', bio: 'Specializzato in tagli maschili e barbering', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', specialties: ['taglio', 'styling'], rating: 4.8 },
  { id: 't3', name: 'Chiara Bianchi', role: 'Colorista', bio: 'Esperta in colorazioni creative e decolorazioni', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', specialties: ['colore'], rating: 4.9 },
  { id: 't4', name: 'Martina Galli', role: 'Estetista', bio: 'Manicure, pedicure e trattamenti viso', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', specialties: ['unghie', 'estetica'], rating: 4.7 },
  { id: 't5', name: 'Luca Conti', role: 'Massaggiatore', bio: 'Massaggi rilassanti e decontratturanti', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', specialties: ['benessere'], rating: 4.6 },
]

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Shampoo Nutriente', description: 'Shampoo delicato per capelli secchi e danneggiati', price: 18, image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80', category: 'capelli', inStock: true, stock: 12, threshold: 5, size: '300ml', brand: 'Aura · linea casa' },
  { id: 'p2', name: 'Balsamo Morbidezza', description: 'Balsamo districante con cheratina', price: 20, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80', category: 'capelli', inStock: true, stock: 8, threshold: 5, size: '300ml', brand: 'Aura · linea casa' },
  { id: 'p3', name: 'Maschera Rivitalizzante', description: 'Maschera rigenerante con oli naturali', price: 28, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80', category: 'capelli', inStock: true, stock: 6, threshold: 3, size: '200ml', brand: 'Aura · linea casa' },
  { id: 'p4', name: 'Olio Capelli', description: 'Olio leggero per lucentezza e protezione termica', price: 22, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80', category: 'capelli', inStock: true, stock: 15, threshold: 5, size: '50ml', brand: 'Davines Naturaltech' },
  { id: 'p5', name: 'Spazzola Professionale', description: 'Spazzola termica in setole naturali', price: 25, image: 'https://picsum.photos/seed/spazzola/400/300', category: 'accessori', inStock: true, stock: 4, threshold: 3, brand: 'Aura · linea casa' },
  { id: 'p6', name: 'Fon Professionale', description: 'Asciugacapelli professionale con diffusore', price: 89, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80', category: 'accessori', inStock: false, stock: 0, threshold: 2, brand: 'Kérastase' },
  { id: 'p7', name: 'Set Pettini', description: 'Set 3 pettini professionali anti-stattica', price: 12, image: 'https://images.unsplash.com/photo-1596018191454-d2b10b77c3b0?w=400&q=80', category: 'accessori', inStock: true, stock: 20, threshold: 5, brand: 'Aura · linea casa' },
  { id: 'p8', name: 'Cera Modellante', description: 'Cera per capelli a tenuta forte', price: 15, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80', category: 'styling', inStock: true, stock: 9, threshold: 5, size: '100ml', brand: 'Aura · linea casa' },
  { id: 'p9', name: 'Lacca Capelli', description: 'Lacca a tenuta extra forte', price: 14, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80', category: 'styling', inStock: true, stock: 3, threshold: 5, size: '300ml', brand: 'Kérastase' },
  { id: 'p10', name: 'Crema Mani', description: 'Crema mani idratante alla calendula', price: 10, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80', category: 'corpo', inStock: true, stock: 25, threshold: 5, size: '75ml', brand: "L'Erbolario" },
  { id: 'p11', name: 'Smalto Semipermanente', description: 'Smalto gel effetto glossy', price: 16, image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&q=80', category: 'unghie', inStock: true, stock: 7, threshold: 5, size: '15ml', brand: 'OPI Infinite' },
  { id: 'p12', name: 'Buono Regalo', description: 'Buono regalo da 50€ utilizzabile su tutti i servizi', price: 50, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80', category: 'regali', inStock: true, stock: 50, threshold: 10, brand: 'Couffer' },
]

export const TEAM_BY_SPECIALTY = TEAM.reduce<Record<string, TeamMember[]>>((acc, m) => {
  m.specialties.forEach(s => { (acc[s] = acc[s] || []).push(m) })
  return acc
}, {} as Record<string, TeamMember[]>)

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Elena Verdi', email: 'elena@example.com', phone: '+39 333 111 1111', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', totalVisits: 24, totalSpent: 1840, lastVisit: '2025-05-10', status: 'attivo', points: 1240, level: 'Oro' },
  { id: 'c2', name: 'Marco Neri', email: 'marco@example.com', phone: '+39 333 222 2222', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', totalVisits: 12, totalSpent: 680, lastVisit: '2025-05-08', status: 'attivo', points: 480, level: 'Argento' },
  { id: 'c3', name: 'Giulia Ferrara', email: 'giulia@example.com', phone: '+39 333 333 3333', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', totalVisits: 8, totalSpent: 420, lastVisit: '2025-04-28', status: 'attivo', points: 220, level: 'Bronzo' },
  { id: 'c4', name: 'Francesco Romano', email: 'francesco@example.com', phone: '+39 333 444 4444', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', totalVisits: 3, totalSpent: 110, lastVisit: '2025-03-15', status: 'inattivo', points: 110, level: 'Bronzo' },
  { id: 'c5', name: 'Anna Moretti', email: 'anna@example.com', phone: '+39 333 555 5555', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', totalVisits: 18, totalSpent: 1350, lastVisit: '2025-05-12', status: 'attivo', points: 1150, level: 'Oro' },
  { id: 'c6', name: 'Paolo Conti', email: 'paolo@example.com', phone: '+39 333 666 6666', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', totalVisits: 6, totalSpent: 260, lastVisit: '2025-05-01', status: 'attivo', points: 60, level: 'Bronzo' },
]

export const TODAY_APPOINTMENTS: Appointment[] = [
  { id: 'a1', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Colore', serviceId: 's3', operatorId: 't1', operatorName: 'Sofia', date: '2025-05-17', time: '09:00', status: 'confermato', duration: 90, price: 70, tone: 1 },
  { id: 'a2', clientId: 'c2', clientName: 'Marco Neri', clientEmail: 'marco@example.com', clientPhone: '+39 333 222 2222', service: 'Taglio Uomo', serviceId: 's2', operatorId: 't2', operatorName: 'Alessandro', date: '2025-05-17', time: '10:00', status: 'confermato', duration: 30, price: 30, tone: 2 },
  { id: 'a3', clientId: 'c3', clientName: 'Giulia Ferrara', clientEmail: 'giulia@example.com', clientPhone: '+39 333 333 3333', service: 'Manicure Classica', serviceId: 's8', operatorId: 't4', operatorName: 'Martina', date: '2025-05-17', time: '11:00', status: 'confermato', duration: 45, price: 35, tone: 3 },
  { id: 'a4', clientId: 'c5', clientName: 'Anna Moretti', clientEmail: 'anna@example.com', clientPhone: '+39 333 555 5555', service: 'Meches', serviceId: 's4', operatorId: 't3', operatorName: 'Chiara', date: '2025-05-17', time: '11:30', status: 'confermato', duration: 120, price: 90, tone: 4 },
  { id: 'a5', clientId: 'c6', clientName: 'Paolo Conti', clientEmail: 'paolo@example.com', clientPhone: '+39 333 666 6666', service: 'Taglio Donna', serviceId: 's1', operatorId: 't1', operatorName: 'Sofia', date: '2025-05-17', time: '15:00', status: 'confermato', duration: 60, price: 55, tone: 1 },
  { id: 'a6', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Piega', serviceId: 's5', operatorId: 't2', operatorName: 'Alessandro', date: '2025-05-17', time: '16:30', status: 'confermato', duration: 30, price: 35, tone: 2 },
  { id: 'a7', clientId: 'c3', clientName: 'Giorgia Pesce', clientEmail: 'giorgia@example.com', clientPhone: '+39 333 777 7777', service: 'Manicure Classica', serviceId: 's8', operatorId: 't4', operatorName: 'Martina', date: '2025-05-17', time: '09:00', status: 'confermato', duration: 45, price: 35, tone: 4 },
  { id: 'a8', clientId: 'c5', clientName: 'Anna Moretti', clientEmail: 'anna@example.com', clientPhone: '+39 333 555 5555', service: 'Massaggio Relax', serviceId: 's13', operatorId: 't5', operatorName: 'Luca', date: '2025-05-17', time: '10:00', status: 'confermato', duration: 30, price: 50, tone: 5 },
  { id: 'a9', clientId: 'c2', clientName: 'Marco Neri', clientEmail: 'marco@example.com', clientPhone: '+39 333 222 2222', service: 'Trattamento Idratante', serviceId: 's7', operatorId: 't1', operatorName: 'Sofia', date: '2025-05-17', time: '14:00', status: 'confermato', duration: 45, price: 45, tone: 1 },
  { id: 'a10', clientId: 'c4', clientName: 'Beatrice Sala', clientEmail: 'bea@example.com', clientPhone: '+39 333 888 8888', service: 'Pedicure', serviceId: 's9', operatorId: 't4', operatorName: 'Martina', date: '2025-05-17', time: '14:30', status: 'confermato', duration: 60, price: 45, tone: 3 },
  { id: 'a11', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Piega', serviceId: 's5', operatorId: 't4', operatorName: 'Martina', date: '2025-05-17', time: '16:00', status: 'confermato', duration: 30, price: 35, tone: 4 },
  { id: 'a12', clientId: 'c6', clientName: 'Paolo Conti', clientEmail: 'paolo@example.com', clientPhone: '+39 333 666 6666', service: 'Taglio Uomo', serviceId: 's2', operatorId: 't2', operatorName: 'Alessandro', date: '2025-05-17', time: '15:30', status: 'confermato', duration: 30, price: 30, tone: 2 },
  { id: 'a13', clientId: 'c3', clientName: 'Giulia Ferrara', clientEmail: 'giulia@example.com', clientPhone: '+39 333 333 3333', service: 'Consulenza Immagine', serviceId: 's11', operatorId: 't1', operatorName: 'Sofia', date: '2025-05-17', time: '11:00', status: 'confermato', duration: 45, price: 40, tone: 1 },
  { id: 'a14', clientId: 'c5', clientName: 'Anna Moretti', clientEmail: 'anna@example.com', clientPhone: '+39 333 555 5555', service: 'Ceretta Viso', serviceId: 's12', operatorId: 't5', operatorName: 'Luca', date: '2025-05-17', time: '11:30', status: 'confermato', duration: 15, price: 15, tone: 5 },
  { id: 'a15', clientId: 'c2', clientName: 'Marco Neri', clientEmail: 'marco@example.com', clientPhone: '+39 333 222 2222', service: 'Taglio Donna', serviceId: 's1', operatorId: 't2', operatorName: 'Alessandro', date: '2025-05-17', time: '17:00', status: 'confermato', duration: 60, price: 55, tone: 2 },
  { id: 'a16', clientId: 'c7', clientName: 'Walk-in', clientEmail: 'walkin@couffer.it', clientPhone: '-', service: 'Trattamento Idratante', serviceId: 's7', operatorId: 't5', operatorName: 'Luca', date: '2025-05-17', time: '16:30', status: 'confermato', duration: 45, price: 45, tone: 5 },
]

export const MY_APPOINTMENTS: Appointment[] = [
  { id: 'a1', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Colore', serviceId: 's3', operatorId: 't1', operatorName: 'Sofia', date: '2025-05-17', time: '09:00', status: 'confermato', duration: 90, price: 70 },
  { id: 'a7', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Taglio Donna', serviceId: 's1', operatorId: 't2', operatorName: 'Alessandro', date: '2025-05-10', time: '14:00', status: 'completato', duration: 60, price: 55 },
  { id: 'a8', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Trattamento Idratante', serviceId: 's7', operatorId: 't1', operatorName: 'Sofia', date: '2025-04-28', time: '10:00', status: 'completato', duration: 45, price: 45 },
  { id: 'a9', clientId: 'c1', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', clientPhone: '+39 333 111 1111', service: 'Massaggio Relax', serviceId: 's13', operatorId: 't5', operatorName: 'Luca', date: '2025-04-15', time: '11:00', status: 'cancellato', duration: 30, price: 50 },
]

export const MY_ORDERS: Order[] = [
  { id: 'o1', date: '2025-05-10', items: [{ productId: 'p1', name: 'Shampoo Nutriente 300ml', quantity: 2, price: 18 }, { productId: 'p8', name: 'Cera Modellante 100ml', quantity: 1, price: 15 }], total: 51, status: 'consegnato' },
  { id: 'o2', date: '2025-04-22', items: [{ productId: 'p4', name: 'Olio Capelli 50ml', quantity: 1, price: 22 }], total: 22, status: 'consegnato' },
  { id: 'o3', date: '2025-05-15', items: [{ productId: 'p12', name: 'Buono Regalo', quantity: 2, price: 50 }], total: 100, status: 'elaborazione' },
]

export const INVOICES: Invoice[] = [
  { id: 'i1', number: 'FATT-2025-001', clientName: 'Elena Verdi', clientEmail: 'elena@example.com', date: '2025-05-10', dueDate: '2025-06-10', items: [{ description: 'Taglio Donna', quantity: 1, price: 55 }, { description: 'Piega', quantity: 1, price: 35 }], subtotal: 90, tax: 19.8, total: 109.8, status: 'pagata' },
  { id: 'i2', number: 'FATT-2025-002', clientName: 'Marco Neri', clientEmail: 'marco@example.com', date: '2025-05-08', dueDate: '2025-06-08', items: [{ description: 'Taglio Uomo', quantity: 1, price: 30 }], subtotal: 30, tax: 6.6, total: 36.6, status: 'pagata' },
  { id: 'i3', number: 'FATT-2025-003', clientName: 'Giulia Ferrara', clientEmail: 'giulia@example.com', date: '2025-04-28', dueDate: '2025-05-28', items: [{ description: 'Manicure Classica', quantity: 1, price: 35 }, { description: 'Pedicure', quantity: 1, price: 45 }], subtotal: 80, tax: 17.6, total: 97.6, status: 'in sospeso' },
  { id: 'i4', number: 'FATT-2025-004', clientName: 'Anna Moretti', clientEmail: 'anna@example.com', date: '2025-05-12', dueDate: '2025-06-12', items: [{ description: 'Colore', quantity: 1, price: 70 }, { description: 'Piega', quantity: 1, price: 35 }], subtotal: 105, tax: 23.1, total: 128.1, status: 'pagata' },
  { id: 'i5', number: 'FATT-2025-005', clientName: 'Francesco Romano', clientEmail: 'francesco@example.com', date: '2025-03-15', dueDate: '2025-04-15', items: [{ description: 'Taglio Uomo', quantity: 1, price: 30 }], subtotal: 30, tax: 6.6, total: 36.6, status: 'scaduta' },
  { id: 'i6', number: 'FATT-2025-006', clientName: 'Paolo Conti', clientEmail: 'paolo@example.com', date: '2025-05-05', dueDate: '2025-06-05', items: [{ description: 'Massaggio Relax', quantity: 1, price: 50 }], subtotal: 50, tax: 11, total: 61, status: 'in sospeso' },
]

export const STAFF_PERFORMANCE = [
  { name: 'Sofia Marchetti', role: 'Stylist Senior', revenue: 3850, clients: 42, rating: 4.9, image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&q=80' },
  { name: 'Alessandro Rossi', role: 'Barbiere & Stylist', revenue: 2240, clients: 38, rating: 4.8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { name: 'Chiara Bianchi', role: 'Colorista', revenue: 3100, clients: 28, rating: 4.9, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80' },
  { name: 'Martina Galli', role: 'Estetista', revenue: 1580, clients: 35, rating: 4.7, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { name: 'Luca Conti', role: 'Massaggiatore', revenue: 1200, clients: 22, rating: 4.6, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
]

export const CATEGORIES = [
  { id: 'all', label: 'Tutti' },
  { id: 'taglio', label: 'Taglio' },
  { id: 'colore', label: 'Colore' },
  { id: 'styling', label: 'Styling' },
  { id: 'trattamento', label: 'Trattamento' },
  { id: 'unghie', label: 'Unghie' },
  { id: 'estetica', label: 'Estetica' },
  { id: 'benessere', label: 'Benessere' },
  { id: 'consulenza', label: 'Consulenza' },
]

export const TESTIMONIALS = [
  { id: 'rev1', name: 'Laura F.', text: 'Miglior salone in città! Sofia è incredibile, ogni volta esco più bella.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 'rev2', name: 'Marco B.', text: 'Taglio perfetto, ambiente accogliente. Alessandro è un artista.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: 'rev3', name: 'Giulia R.', text: 'La maschera che ho comprato è fantastica. Consigliatissimo!', rating: 4, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: 'rev4', name: 'Francesca T.', text: 'Professionalità e cortesia. La mia manicure preferita.', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
]

export const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30']

export function formatEur(n: number) {
  return '€' + n.toFixed(2)
}
