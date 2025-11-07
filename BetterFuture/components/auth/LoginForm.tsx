'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useActiveAccount } from 'panna-sdk'
import { LoginButton, liskSepolia } from 'panna-sdk'

import { AuthButton } from './AuthButton'
import { WalletLoginButton } from './WalletLoginButton'

interface LoginFormProps {
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

export function LoginForm({ onLoginClick, onRegisterClick }: LoginFormProps) {
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const isConnected = !!activeAccount

  // Redirect to home page when wallet is connected
  useEffect(() => {
    if (isConnected) {
      router.push('/home')
    }
  }, [isConnected, router])

  function handleRegister() {
    onRegisterClick?.()
    router.push('/register')
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <WalletLoginButton />

    
      {/* <AuthButton type="button" onClick={handleRegister}>
        <LoginButton chain={liskSepolia} />
      </AuthButton> */}
      <AuthButton type="button" onClick={handleRegister}>
        Register
      </AuthButton>
    </div>
  )
}

