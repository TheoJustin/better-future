'use client'

import { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { HomeHeader } from './HomeHeader'
import { GreetingSection } from './GreetingSection'
import { CoinDisplay } from './CoinDisplay'
import { HomeBottomNav } from './HomeBottomNav'
import { DepositModal } from './DepositModal'

interface HomeLayoutProps {
  children?: ReactNode
  coinAmount?: number
  className?: string
}

export function HomeLayout({ children, coinAmount, className }: HomeLayoutProps) {
  const router = useRouter()
  const [showDepositModal, setShowDepositModal] = useState(false)

  function handleDepositClick() {
    setShowDepositModal(true)
  }

  function handleDepositSuccess() {
    // Refresh balance or do something after successful deposit
    // The CoinDisplay component will automatically refresh
  }

  return (
    <>
      <div
        className={cn(
          'relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto',
          'bg-white overflow-hidden rounded-[55px] shadow-2xl',
          className,
        )}
      >
        {/* Header */}
        <HomeHeader />

        {/* Greeting Section */}
        <GreetingSection />

        {/* Coin Display */}
        <CoinDisplay coinAmount={coinAmount} />

        {/* Bottom Navigation */}
        <HomeBottomNav onDepositClick={handleDepositClick} />

        {/* Additional children content */}
        {children}
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSuccess={handleDepositSuccess}
      />
    </>
  )
}

