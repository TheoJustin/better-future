'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { PaymentConfirmation, PaymentConfirmationProps } from './PaymentConfirmation'

export interface PaymentConfirmationLayoutProps extends PaymentConfirmationProps {
  children?: ReactNode
  className?: string
}

export function PaymentConfirmationLayout({
  children,
  className,
  ...paymentProps
}: PaymentConfirmationLayoutProps) {
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

      {/* Payment Confirmation Component */}
      <PaymentConfirmation {...paymentProps} />

      {/* Additional children content */}
      {children}
    </div>
  )
}

