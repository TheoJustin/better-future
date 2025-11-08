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
        'relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Payment Confirmation Component */}
      <PaymentConfirmation {...paymentProps} />

      {/* Additional children content */}
      {children}
    </div>
  )
}

