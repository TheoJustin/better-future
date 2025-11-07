'use client'

import { ReactNode } from 'react'
import { useActiveAccount } from 'panna-sdk'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { GlobalLayout, GlobalLayoutProps } from './GlobalLayout'
import { PageWrapper } from './PageWrapper'

interface ProtectedPageProps extends Omit<GlobalLayoutProps, 'children'> {
  children: ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

/**
 * Protected page wrapper yang menambahkan autentikasi check
 * dan menggunakan GlobalLayout dengan dimensi iPhone 16 Plus
 */
export function ProtectedPage({
  children,
  requireAuth = true,
  redirectTo = '/login',
  ...layoutProps
}: ProtectedPageProps) {
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const isConnected = !!activeAccount

  useEffect(() => {
    if (requireAuth && !isConnected) {
      router.push(redirectTo)
    }
  }, [requireAuth, isConnected, router, redirectTo])

  if (requireAuth && !isConnected) {
    return null
  }

  return (
    <PageWrapper>
      <GlobalLayout {...layoutProps}>{children}</GlobalLayout>
    </PageWrapper>
  )
}

