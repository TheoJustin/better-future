'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { QRScanHeader } from './QRScanHeader'
import { QRScannerArea } from './QRScannerArea'

interface ExtractedData {
  address?: string
  amount?: string | number
  valid?: boolean
  error?: string
}

interface QRScanLayoutProps {
  children?: ReactNode
  onBack?: () => void
  onScanSuccess?: (data: ExtractedData) => void
  onPaymentInitiate?: (data: ExtractedData) => void
  className?: string
}

export function QRScanLayout({
  children,
  onBack,
  onScanSuccess,
  onPaymentInitiate,
  className,
}: QRScanLayoutProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Header */}
      <QRScanHeader onBack={onBack} />

      {/* Scanner Area */}
      <QRScannerArea
        onScanSuccess={onScanSuccess}
        onPaymentInitiate={onPaymentInitiate}
      />

      {/* Bottom Nav */}
      <div className="absolute bg-white border border-[#afafaf] border-solid bottom-0 h-[181px] left-1/2 translate-x-[-50%] w-full" />

      {/* Additional children content */}
      {children}
    </div>
  )
}

