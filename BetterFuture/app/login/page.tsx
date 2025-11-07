'use client'

import { useRouter } from 'next/navigation'

import { AuthLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  const router = useRouter()

  function handleClose() {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AuthLayout onClose={handleClose}>
        <LoginForm />
      </AuthLayout>
    </div>
  )
}

