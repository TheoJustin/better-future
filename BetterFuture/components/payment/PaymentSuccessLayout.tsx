'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { PaymentSuccess, PaymentSuccessProps } from './PaymentSuccess'

export interface PaymentSuccessLayoutProps extends PaymentSuccessProps {
  children?: ReactNode
  className?: string
}

export function PaymentSuccessLayout({
  children,
  className,
  ...successProps
}: PaymentSuccessLayoutProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Payment Success Component */}
      <PaymentSuccess {...successProps} />

      {/* Additional children content */}
      {children}
    </div>
  )
}

