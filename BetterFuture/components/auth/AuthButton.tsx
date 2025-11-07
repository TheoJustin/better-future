'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function AuthButton({
  children,
  variant = 'primary',
  className,
  ...props
}: AuthButtonProps) {
  return (
    <button
      className={cn(
        'bg-[#1899d6] block cursor-pointer h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full',
        'hover:bg-[#1cb0f6] transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <div className="absolute bg-[#1cb0f6] box-border flex gap-2 h-[57px] items-center justify-center left-[0.5px] overflow-hidden px-4 py-3 right-[0.5px] rounded-[13px] top-1/2 -translate-y-1/2 w-[calc(100%-1px)]">
        <div className="flex flex-col justify-center leading-[100%] relative shrink-0 text-base text-white text-center tracking-[-0.32px] uppercase whitespace-nowrap font-bold">
          {children}
        </div>
      </div>
    </button>
  )
}

