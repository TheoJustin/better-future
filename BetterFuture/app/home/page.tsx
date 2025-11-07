'use client'

import { useActiveAccount } from 'panna-sdk'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { HomeLayout } from '@/components/home/HomeLayout'

export default function HomePage() {
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const isConnected = !!activeAccount

  // Redirect to login if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/login')
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <HomeLayout coinAmount={20} />
    </div>
  )
}

