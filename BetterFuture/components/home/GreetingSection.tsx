'use client'

import { useActiveAccount } from 'panna-sdk'
import { Bell } from 'lucide-react'

export function GreetingSection() {
  const activeAccount = useActiveAccount()
  const userName = activeAccount?.address?.slice(0, 6) || 'User'

  return (
    <div className="absolute bg-[#1899d6] h-[79px] left-4 overflow-hidden rounded-[13px] top-[135px] w-[calc(100%-32px)] max-w-[398px]">
      <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 flex items-center px-4">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px] uppercase">
            <p className="leading-normal">Hai {userName}</p>
          </div>
          <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
            <p className="leading-normal">Tekan tombol disamping sebelum membeli</p>
          </div>
        </div>
        <div className="size-[22px] shrink-0">
          <Bell className="size-[22px] text-white" />
        </div>
      </div>
    </div>
  )
}

