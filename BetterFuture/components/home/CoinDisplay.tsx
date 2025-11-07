'use client'

import { useState, useEffect } from 'react'
import { useActiveAccount } from 'panna-sdk'
import { useContract } from '@/hooks/useContract'
import { getIDRBalance } from '@/lib/contract'
import { formatUnits } from '@/lib/utils-web3'

interface CoinDisplayProps {
  coinAmount?: number
  coinImage?: string
}

const imgImage18 = 'https://www.figma.com/api/mcp/asset/354c36b0-9004-423c-9268-34a7a3977bd5'

export function CoinDisplay({ coinAmount, coinImage = imgImage18 }: CoinDisplayProps) {

  const activeAccount = useActiveAccount()
  const { client, account } = useContract()
  const [balance, setBalance] = useState<bigint>(BigInt(0))
  const [loading, setLoading] = useState(false)

  const userName = activeAccount?.address?.slice(0, 6) || 'User'

  // Load balance from wallet
  useEffect(() => {
    const loadBalance = async () => {
      if (!client || !account?.address) {
        setBalance(BigInt(0))
        return
      }

      setLoading(true)
      try {
        const userBalance = await getIDRBalance(client, account.address)
        setBalance(userBalance)
      } catch (error) {
        console.error('Error loading balance:', error)
        setBalance(BigInt(0))
      } finally {
        setLoading(false)
      }
    }

    loadBalance()
  }, [client, account])

  // Use balance from wallet if available, otherwise use prop or default
  const displayAmount = coinAmount !== undefined 
    ? coinAmount 
    : Number(formatUnits(balance, 18))

  // Format amount to show 1 decimal place (e.g., 4.9)
  const formatCoinAmount = (amount: number): string => {
    if (loading) return '...'
    // Show 1 decimal place, remove trailing zeros if whole number
    const formatted = amount.toFixed(1)
    return formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted
  }

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
        <p className="leading-normal">
          {formatCoinAmount(displayAmount)} Koin
        </p>
      </div>
    </div>
  )
}

