'use client'

import { useRouter } from 'next/navigation'

const imgImage17 = 'https://www.figma.com/api/mcp/asset/b4025f63-9942-4eec-a6f5-f22d4b051ad7'

interface HomeBottomNavProps {
  onButtonClick?: () => void
}

export function HomeBottomNav({ onButtonClick }: HomeBottomNavProps) {
  const router = useRouter()

  function handleClick() {
    onButtonClick?.()
    // Navigate to QR scan page
    router.push('/qr-scan')
  }

  return (
    <div className="absolute bg-white border border-[#afafaf] border-solid bottom-0 box-border flex items-center justify-between left-1/2 pb-[50px] pt-6 px-6 translate-x-[-50%] w-full max-w-[430px]">
      <button
        onClick={handleClick}
        className="bg-[#1899d6] block cursor-pointer h-[107px] overflow-hidden relative rounded-[13px] shrink-0 w-[96px] hover:bg-[#1cb0f6] transition-colors"
        aria-label="Scan QR Code"
      >
        <div className="absolute bg-[#1cb0f6] box-border flex gap-2 h-[93px] items-center justify-center left-0 overflow-hidden px-4 py-3 right-px rounded-[13px] top-1/2 translate-y-[-50%]">
          <div className="relative rounded-[13px] shrink-0 size-[82px]">
            <img
              alt="QR Scanner"
              className="absolute inset-0 max-w-none object-cover object-center pointer-events-none rounded-[13px] size-full"
              src={imgImage17}
            />
          </div>
        </div>
      </button>
    </div>
  )
}

