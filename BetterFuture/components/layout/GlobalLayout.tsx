'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

interface GlobalLayoutProps {
  children: ReactNode
  header?: {
    title?: string
    showBack?: boolean
    showMenu?: boolean
    onBack?: () => void
    onMenuClick?: () => void
  }
  bottomNav?: ReactNode
  className?: string
  contentClassName?: string
}

export function GlobalLayout({
  children,
  header,
  bottomNav,
  className,
  contentClassName,
}: GlobalLayoutProps) {
  const router = useRouter()

  function handleBack() {
    if (header?.onBack) {
      header.onBack()
    } else {
      router.back()
    }
  }

  function handleMenuClick() {
    if (header?.onMenuClick) {
      header.onMenuClick()
    } else {
      router.push('/?tab=menu')
    }
  }

  return (
    <div
      className={cn(
        'relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Header */}
      {header && (
        <div className="absolute border-b-2 border-[#d9d9d9] box-border flex gap-6 items-center justify-center px-4 py-[11px] right-0 top-[59px] w-full z-10">
          {/* Back Button */}
          {header.showBack !== false && (
            <button
              onClick={handleBack}
              className="relative shrink-0 size-[19.5px] flex items-center justify-center text-[#AFAFAF] hover:text-foreground transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="size-5" />
            </button>
          )}

          {/* Title */}
          {header.title && (
            <div className="flex flex-1 flex-col font-bold justify-center leading-[100%] min-h-px min-w-px relative shrink-0 text-[22px] text-[#4b4b4b] text-center tracking-[-0.44px]">
              <p className="leading-normal whitespace-pre-wrap">{header.title}</p>
            </div>
          )}

          {/* Menu Icon */}
          {header.showMenu !== false && (
            <button
              onClick={handleMenuClick}
              className="box-border flex flex-col gap-2 items-start overflow-hidden px-1.5 py-[13px] relative rounded-full shrink-0 cursor-pointer hover:bg-muted/20 transition-colors"
              aria-label="Menu"
            >
              <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
              <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
              <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
            </button>
          )}
        </div>
      )}

      {/* Content Area */}
      <div
        className={cn(
          'absolute',
          header ? 'top-[113px]' : 'top-0', // Below header if exists
          bottomNav ? 'bottom-[181px]' : 'bottom-0', // Above bottom nav if exists
          'left-0 right-0',
          'overflow-y-auto overflow-x-hidden',
          contentClassName,
        )}
      >
        {children}
      </div>

      {/* Bottom Navigation */}
      {bottomNav && (
        <div className="absolute bg-white border border-[#afafaf] border-solid bottom-0 h-[181px] left-1/2 translate-x-[-50%] w-full z-10">
          {bottomNav}
        </div>
      )}
    </div>
  )
}

