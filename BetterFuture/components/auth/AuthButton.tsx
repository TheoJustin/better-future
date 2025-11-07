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
        variant === 'primary'
          ? 'bg-[#1899d6] hover:bg-[#1cb0f6]'
          : 'bg-gray-200 hover:bg-gray-300',
        'block cursor-pointer h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full',
        'transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'absolute box-border flex gap-2 h-[57px] items-center justify-center left-[0.5px] overflow-hidden px-4 py-3 right-[0.5px] rounded-[13px] top-1/2 -translate-y-1/2 w-[calc(100%-1px)]',
          variant === 'primary' ? 'bg-[#1cb0f6]' : 'bg-gray-100',
        )}
      >
        <div
          className={cn(
            'flex flex-col justify-center leading-[100%] relative shrink-0 text-base text-center tracking-[-0.32px] uppercase whitespace-nowrap font-bold',
            variant === 'primary' ? 'text-white' : 'text-gray-700',
          )}
        >
          {children}
        </div>
      </div>
    </button>
  )
}



{/* <LoginButton chain={liskSepolia} /> */}