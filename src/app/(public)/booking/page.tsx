'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SERVICES, TEAM, TEAM_BY_SPECIALTY, TIME_SLOTS, COMPANY } from '@/lib/data'
import { useBooking, STEPS } from '@/contexts/BookingContext'
import { Card, Stepper, Icon, Modal } from '@/components/ui'
import { formatEur } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'

function BookingContent() {
  const sp = useSearchParams()
  const { step, setStep, selectedService, setSelectedService, selectedOperator, setSelectedOperator, selectedDate, setSelectedDate, selectedTime, setSelectedTime, reset } = useBooking()
  const [confirmed, setConfirmed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const serviceId = sp.get('service')
    if (serviceId && SERVICES.some(s => s.id === serviceId)) {
      setSelectedService(serviceId)
      setStep(2)
    }
  }, [])

  const selectedServiceData = SERVICES.find(s => s.id === selectedService)
  const availableOperators = selectedServiceData ? TEAM_BY_SPECIALTY[selectedServiceData.category] || TEAM : TEAM
  const selectedOperatorData = TEAM.find(t => t.id === selectedOperator)

  const handleConfirm = () => {
    setConfirmed(true)
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Icon name="check" size={32} className="text-green-600" /></div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prenotazione confermata!</h1>
        <p className="text-gray-500 mb-6">
          {selectedServiceData?.name} con {selectedOperatorData?.name} il {selectedDate} alle {selectedTime}.
        </p>
        <p className="text-sm text-gray-400 mb-8">Riceverai un promemoria via email 24h prima.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/account" className="px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors">I tuoi appuntamenti</Link>
          <button onClick={() => { reset(); setShowSuccess(false) }} className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:border-amber-300 transition-colors">Nuova prenotazione</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Prenota un appuntamento</h1>
      <Stepper steps={STEPS} current={step} />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map(s => (
                <Card key={s.id} className={`overflow-hidden cursor-pointer border-2 transition-all ${selectedService === s.id ? 'border-amber-800 bg-amber-50' : 'border-transparent hover:border-amber-200'}`} onClick={() => { setSelectedService(s.id); setStep(2) }}>
                  <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm">{s.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{s.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800 font-bold">{formatEur(s.price)}</span>
                      <span className="text-xs text-gray-400">{s.duration} min</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {availableOperators.map(op => (
                <Card key={op.id} className={`p-4 cursor-pointer border-2 transition-all ${selectedOperator === op.id ? 'border-amber-800 bg-amber-50' : 'border-transparent hover:border-amber-200'}`} onClick={() => { setSelectedOperator(op.id); setStep(3) }}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img src={op.image} alt={op.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{op.name}</h3>
                      <p className="text-sm text-amber-700">{op.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name={i < Math.floor(op.rating) ? 'star' : 'star'} size={14} className={i < op.rating ? 'text-amber-500' : 'text-gray-200'} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{op.rating}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-gray-500 mb-4">Seleziona un giorno disponibile</p>
              <div className="grid grid-cols-7 gap-2">
                {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
                  <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">{day}</div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = String(i - 2).padStart(2, '0')
                  const dateStr = `2025-05-${day}`
                  const isAvailable = i >= 3 && i <= 25 && ![0, 6].includes(i % 7)
                  const isSelected = selectedDate === dateStr
                  return (
                    <button key={i} disabled={!isAvailable}
                      onClick={() => { setSelectedDate(dateStr); setStep(4) }}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                        isSelected ? 'bg-amber-800 text-white' : isAvailable ? 'hover:bg-amber-50 text-gray-700' : 'text-gray-300 cursor-not-allowed'
                      }`}>
                      {i - 2 > 0 ? i - 2 : ''}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-gray-500 mb-4">Seleziona un orario disponibile</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map(t => {
                  const isSelected = selectedTime === t
                  return (
                    <button key={t} onClick={() => { setSelectedTime(t); setStep(5) }}
                      className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                        isSelected ? 'bg-amber-800 text-white border-amber-800' : 'border-gray-200 text-gray-700 hover:border-amber-300'
                      }`}>
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 text-green-800 font-semibold mb-4">
                  <Icon name="check" size={20} /> Riepilogo prenotazione
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Servizio</span><span className="font-medium">{selectedServiceData?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Operatore</span><span className="font-medium">{selectedOperatorData?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Data</span><span className="font-medium">{selectedDate}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Orario</span><span className="font-medium">{selectedTime}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Durata</span><span className="font-medium">{selectedServiceData?.duration} min</span></div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg"><span>Totale</span><span className="text-amber-800">{formatEur(selectedServiceData?.price || 0)}</span></div>
                </div>
              </div>
              <button onClick={handleConfirm} className="w-full px-6 py-3 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-900 transition-colors text-lg">
                Conferma prenotazione
              </button>
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <Card className="p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">La tua prenotazione</h3>
            {selectedService ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Servizio</span><span>{selectedServiceData?.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Prezzo</span><span className="font-bold text-amber-800">{formatEur(selectedServiceData?.price || 0)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Durata</span><span>{selectedServiceData?.duration} min</span></div>
                {selectedOperator && <div className="flex justify-between"><span className="text-gray-500">Operatore</span><span>{selectedOperatorData?.name}</span></div>}
                {selectedDate && <div className="flex justify-between"><span className="text-gray-500">Giorno</span><span>{selectedDate}</span></div>}
                {selectedTime && <div className="flex justify-between"><span className="text-gray-500">Orario</span><span>{selectedTime}</span></div>}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Seleziona un servizio per iniziare.</p>
            )}
            <div className="border-t mt-4 pt-4 text-xs text-gray-400">
              <p>{COMPANY.address}</p>
              <p>{COMPANY.phone}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense>
      <BookingContent />
    </Suspense>
  )
}
