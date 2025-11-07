'use client'

import { useEffect, useRef } from 'react'
import { LoginButton, liskSepolia } from 'panna-sdk'

import { cn } from '@/lib/utils'

interface WalletLoginButtonProps {
  className?: string
}

function applyButtonStyles(button: HTMLButtonElement) {
  // Apply base styles
  button.className = cn(
    'bg-[#1899d6] block cursor-pointer h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full',
    'hover:bg-[#1cb0f6] transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  )

  // Check if inner div already exists
  if (button.querySelector('.auth-button-inner')) {
    return
  }

  // Get original text content
  const originalText = button.textContent?.trim() || 'Login'

  // Create inner div structure
  const innerDiv = document.createElement('div')
  innerDiv.className = cn(
    'auth-button-inner absolute bg-[#1cb0f6] box-border flex gap-2 h-[57px] items-center justify-center',
    'left-[0.5px] overflow-hidden px-4 py-3 right-[0.5px] rounded-[13px]',
    'top-1/2 -translate-y-1/2 w-[calc(100%-1px)]',
  )

  const textDiv = document.createElement('div')
  textDiv.className = cn(
    'flex flex-col justify-center leading-[100%] relative shrink-0',
    'text-base text-white text-center tracking-[-0.32px] uppercase whitespace-nowrap font-bold',
  )
  textDiv.textContent = originalText

  // Clear button content and add structure
  button.innerHTML = ''
  innerDiv.appendChild(textDiv)
  button.appendChild(innerDiv)
}

export function WalletLoginButton({ className }: WalletLoginButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    // Try to find button immediately
    const button = wrapperRef.current.querySelector('button')
    if (button) {
      applyButtonStyles(button)
    }

    // Use MutationObserver to watch for button being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const button = element.tagName === 'BUTTON' 
              ? element as HTMLButtonElement 
              : element.querySelector('button')
            
            if (button) {
              applyButtonStyles(button)
            }
          }
        })
      })

      // Also check for button in the wrapper
      const button = wrapperRef.current?.querySelector('button')
      if (button && !button.querySelector('.auth-button-inner')) {
        applyButtonStyles(button)
      }
    })

    observer.observe(wrapperRef.current, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={wrapperRef} className={cn('w-full', className)}>
      <LoginButton chain={liskSepolia} />
    </div>
  )
}

