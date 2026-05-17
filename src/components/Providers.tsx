'use client'

import { ShopProvider } from '@/contexts/ShopContext'
import { BookingProvider } from '@/contexts/BookingContext'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      <BookingProvider>
        {children}
      </BookingProvider>
    </ShopProvider>
  )
}
