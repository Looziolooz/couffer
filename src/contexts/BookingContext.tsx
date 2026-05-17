'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface BookingFlowContextType {
  step: number
  setStep: (n: number) => void
  selectedService: string | null
  setSelectedService: (id: string | null) => void
  selectedOperator: string | null
  setSelectedOperator: (id: string | null) => void
  selectedDate: string | null
  setSelectedDate: (d: string | null) => void
  selectedTime: string | null
  setSelectedTime: (t: string | null) => void
  reset: () => void
}

const BookingFlowContext = createContext<BookingFlowContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const reset = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedOperator(null)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  return (
    <BookingFlowContext.Provider value={{ step, setStep, selectedService, setSelectedService, selectedOperator, setSelectedOperator, selectedDate, setSelectedDate, selectedTime, setSelectedTime, reset }}>
      {children}
    </BookingFlowContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingFlowContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}

export const STEPS = [
  { num: 1, label: 'Servizio' },
  { num: 2, label: 'Operatore' },
  { num: 3, label: 'Giorno' },
  { num: 4, label: 'Orario' },
  { num: 5, label: 'Conferma' },
]
