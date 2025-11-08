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
        'relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Payment Loading Component */}
      <PaymentLoading {...loadingProps} />

      {/* Additional children content */}
      {children}
    </div>
  )
}

