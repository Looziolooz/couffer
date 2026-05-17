'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem } from '@/lib/types'

interface ShopContextType {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
}

const ShopContext = createContext<ShopContextType | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId)
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i)
      }
      return [...prev, item]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(i => i.productId !== productId))
  }, [])

  const updateQty = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) { setCart(prev => prev.filter(i => i.productId !== productId)); return }
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  return (
    <ShopContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}
