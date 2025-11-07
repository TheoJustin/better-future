'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { QRScanHeader } from './QRScanHeader'
import { QRScannerArea } from './QRScannerArea'

interface QRScanLayoutProps {
  children?: ReactNode
  onBack?: () => void
  className?: string
}

export function QRScanLayout({ children, onBack, className }: QRScanLayoutProps) {
  return (
    <div
      className={cn(
        'relative w-[430px] h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Control Bar */}
      <div className="absolute bg-black h-[5px] left-[137px] rounded-[16px] top-[919px] w-[156px]" />

      {/* Floating Island */}
      <div className="absolute bg-black h-[37px] left-[152px] rounded-[23px] top-[11px] w-[126px]" />

      {/* Header */}
      <QRScanHeader onBack={onBack} />

      {/* Scanner Area */}
      <QRScannerArea />

      {/* Bottom Nav */}
      <div className="absolute bg-white border border-[#afafaf] border-solid bottom-0 h-[181px] left-1/2 translate-x-[-50%] w-full max-w-[430px]" />

      {/* Additional children content */}
      {children}
    </div>
  )
}

