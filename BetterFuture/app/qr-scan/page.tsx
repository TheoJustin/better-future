'use client'

import { useRouter } from 'next/navigation'
import { useActiveAccount } from 'panna-sdk'
import { useEffect } from 'react'

import { QRScanLayout } from '@/components/qr/QRScanLayout'

export default function QRScanPage() {
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

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <QRScanLayout onBack={handleBack} />
    </div>
  )
}

