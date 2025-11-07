'use client'

import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper untuk halaman yang menggunakan GlobalLayout
 * Menyediakan background dan centering untuk layout iPhone 16 Plus
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center p-4 ${className || ''}`}>
      {children}
    </div>
  )
}

