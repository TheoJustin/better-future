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
        'relative w-[430px] h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Control Bar */}
      <div className="absolute bg-black h-[5px] left-[137px] rounded-[16px] top-[919px] w-[156px]" />

      {/* Floating Island */}
      <div className="absolute bg-black h-[37px] left-[152px] rounded-[23px] top-[11px] w-[126px]" />

      {/* Payment Success Component */}
      <PaymentSuccess {...successProps} />

      {/* Additional children content */}
      {children}
    </div>
  )
}

