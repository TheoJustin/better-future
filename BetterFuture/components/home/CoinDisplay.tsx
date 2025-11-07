'use client'

import { useActiveAccount } from 'panna-sdk'

interface CoinDisplayProps {
  coinAmount?: number
  coinImage?: string
}

const imgImage18 = 'https://www.figma.com/api/mcp/asset/354c36b0-9004-423c-9268-34a7a3977bd5'

export function CoinDisplay({ coinAmount = 20, coinImage = imgImage18 }: CoinDisplayProps) {
  const activeAccount = useActiveAccount()
  const userName = activeAccount?.address?.slice(0, 6) || 'User'

  return (
    <div className="absolute box-border flex flex-col gap-3 items-center justify-center left-1/2 p-2.5 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="flex flex-col font-black justify-center leading-[100%] relative shrink-0 text-[36px] text-black tracking-[-0.72px] whitespace-nowrap">
        <p className="leading-normal">Jumlah Koin {userName}</p>
      </div>
      <div className="h-[242px] relative shrink-0 w-[354px]">
        <img
          alt="Coin"
          className="absolute inset-0 max-w-none object-cover object-center pointer-events-none size-full"
          src={coinImage}
        />
      </div>
      <div className="flex flex-col font-black justify-center leading-[100%] relative shrink-0 text-[64px] text-black tracking-[-1.28px] whitespace-nowrap">
        <p className="leading-normal">{coinAmount} Koin</p>
      </div>
    </div>
  )
}

