'use client'

import { useRouter } from 'next/navigation'
import { AuthButton } from './AuthButton'


interface LoginFormProps {
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

export function LoginForm({ onLoginClick, onRegisterClick }: LoginFormProps) {
  const router = useRouter()

  function handleLogin() {
    onLoginClick?.()
    // TODO: Implement login logic or navigation
  }

  function handleRegister() {
    onRegisterClick?.()
    router.push('/register')
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <AuthButton type="button" onClick={handleLogin}>
        Login
      </AuthButton>

      <AuthButton type="button" onClick={handleRegister}>
        Register
      </AuthButton>
    </div>
  )
}

