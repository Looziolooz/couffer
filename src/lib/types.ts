export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  image: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  specialties: string[]
  rating: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  stock: number
  threshold: number
}

export interface Appointment {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  serviceId: string
  operatorId: string
  operatorName: string
  date: string
  time: string
  status: 'confermato' | 'completato' | 'cancellato'
  duration: number
  price: number
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  totalVisits: number
  totalSpent: number
  lastVisit: string
  status: 'attivo' | 'inattivo'
  points: number
  level: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface Order {
  id: string
  date: string
  items: { productId: string; name: string; quantity: number; price: number }[]
  total: number
  status: string
}

export interface Invoice {
  id: string
  number: string
  clientName: string
  clientEmail: string
  date: string
  dueDate: string
  items: { description: string; quantity: number; price: number }[]
  subtotal: number
  tax: number
  total: number
  status: string
}
