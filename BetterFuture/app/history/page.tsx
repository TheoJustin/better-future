'use client'

import { useActiveAccount } from 'panna-sdk'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { GlobalLayout } from '@/components/layout/GlobalLayout'
import { HistoryContent } from '@/components/history/HistoryContent'
import { AuthButton } from '@/components/auth/AuthButton'

export default function HistoryPage() {
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const isConnected = !!activeAccount

  // Redirect to login if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/login')
    }
  }, [isConnected, router])

  function handleBack() {
    router.push('/home')
  }

  function handleDeposit() {
    // Navigate to deposit page or open deposit modal
    router.push('/deposit')
  }

  function handleBackToHome() {
    router.push('/home')
  }

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <GlobalLayout
        header={{
          title: 'Riwayat Transaksi',
          showBack: true,
          showMenu: true,
          onBack: handleBack,
        }}
        bottomNav={
          <div className="flex items-center justify-between gap-4 px-6 pb-[50px] pt-6 w-full">
            <AuthButton onClick={handleDeposit} className="flex-1">
              Masukan koin
            </AuthButton>
            <AuthButton onClick={handleBackToHome} className="flex-1">
              Balik ke home
            </AuthButton>
          </div>
        }
        contentClassName="px-4 py-4 overflow-y-auto flex items-center justify-center"
      >
        <HistoryContent />
      </GlobalLayout>
    </div>
  )
}

