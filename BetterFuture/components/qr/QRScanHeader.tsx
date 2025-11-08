'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface QRScanHeaderProps {
  title?: string
  onBack?: () => void
}

export function QRScanHeader({ title = 'Pembayaran QRIS', onBack }: QRScanHeaderProps) {
  const router = useRouter()

  function handleBack() {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="absolute border-b-2 border-[#d9d9d9] box-border flex gap-6 items-center justify-center px-4 py-[11px] right-0 top-[59px] w-full">
      <button
        onClick={handleBack}
        className="relative shrink-0 size-[19.5px] flex items-center justify-center text-[#AFAFAF] hover:text-foreground transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="flex flex-1 flex-col font-bold justify-center leading-[100%] min-h-px min-w-px relative shrink-0 text-[22px] text-[#4b4b4b] text-center tracking-[-0.44px]">
        <p className="leading-normal whitespace-pre-wrap">{title}</p>
      </div>

      <div className="box-border flex flex-col gap-2 items-start overflow-hidden px-1.5 py-[13px] relative rounded-full shrink-0">
        <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
        <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
        <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
      </div>
    </div>
  )
}

