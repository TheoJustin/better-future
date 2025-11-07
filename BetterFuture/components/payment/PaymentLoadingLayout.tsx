'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { PaymentLoading } from '@/components/bf/PaymentLoading'
import type { PaymentLoadingProps } from '@/components/bf/PaymentLoading'

export interface PaymentLoadingLayoutProps extends PaymentLoadingProps {
  children?: ReactNode
  className?: string
}

export function PaymentLoadingLayout({
  children,
  className,
  ...loadingProps
}: PaymentLoadingLayoutProps) {
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

      {/* Payment Loading Component */}
      <PaymentLoading {...loadingProps} />

      {/* Additional children content */}
      {children}
    </div>
  )
}

