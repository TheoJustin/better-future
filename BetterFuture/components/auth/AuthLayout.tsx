import { ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: ReactNode
  heroImage?: string
  onClose?: () => void
  className?: string
}

const imgImg03141 = 'https://www.figma.com/api/mcp/asset/c71e91af-2eb4-4950-8f7d-aece525b3b6c'

export function AuthLayout({
  children,
  heroImage = imgImg03141,
  onClose,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        'relative min-h-screen w-full max-w-[430px] mx-auto',
        'bg-white overflow-hidden rounded-[55px] shadow-2xl',
        className,
      )}
    >
      {/* Context Bar / Header */}
      {onClose && (
        <div className="absolute box-border flex gap-6 h-[54px] items-center left-0 px-4 py-[11px] top-[59px] w-full z-10">
          <button
            onClick={onClose}
            className="relative shrink-0 size-[19.5px] flex items-center justify-center text-[#AFAFAF] hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
      
      {/* Hero Image - Centered */}
      <div className="absolute h-[294px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[430px] z-0">
        <img
          alt="BetterFuture"
          className="absolute inset-0 max-w-none object-cover object-center pointer-events-none size-full"
          src={heroImage}
        />
      </div>
      
      {/* Bottom Navigation / Form Area */}
      <div className="absolute bottom-0 box-border flex flex-col gap-3 items-center justify-center left-1/2 pb-[50px] pt-2 px-4 -translate-x-1/2 w-full max-w-[430px] z-10">
        {children}
      </div>
    </div>
  )
}



{/* <LoginButton chain={liskSepolia} /> */}