'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useActiveAccount } from 'panna-sdk'

import { QRScanLayout } from '@/components/qr/QRScanLayout'
import { PaymentConfirmationLayout } from '@/components/payment/PaymentConfirmationLayout'
import { PaymentLoadingLayout } from '@/components/payment/PaymentLoadingLayout'
import { PaymentSuccessLayout } from '@/components/payment/PaymentSuccessLayout'
import { useContract } from '@/hooks/useContract'
import { getPlatformFee, calculatePlatformFee, calculateMerchantAmount } from '@/lib/contract'
import { parseUnits, formatUnits } from '@/lib/utils-web3'

interface ExtractedData {
  address?: string
  amount?: string | number
  valid?: boolean
  error?: string
}

export default function QRScanPage() {
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const isConnected = !!activeAccount
  const { client } = useContract()
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [showPaymentLoading, setShowPaymentLoading] = useState(false)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [platformFeeBps, setPlatformFeeBps] = useState<bigint>(BigInt(0))

  // Redirect to login if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/login')
    }
  }, [isConnected, router])

  // Load platform fee when component mounts
  useEffect(() => {
    if (client) {
      getPlatformFee(client)
        .then(setPlatformFeeBps)
        .catch(console.error)
    }
  }, [client])

  function handleBack() {
    if (showPaymentConfirmation) {
      setShowPaymentConfirmation(false)
    } else {
      router.push('/home')
    }
  }

  function handleScanSuccess(data: ExtractedData) {
    setExtractedData(data)
  }

  function handlePaymentInitiate(data: ExtractedData) {
    setExtractedData(data)
    setShowPaymentConfirmation(true)
  }

  function handleConfirmPayment() {
    setShowPaymentConfirmation(false)
    setShowPaymentLoading(true)
    setPaymentProcessing(true)
  }

  // Auto-process payment when loading screen is shown
  useEffect(() => {
    if (showPaymentLoading && paymentProcessing) {
      // Here you would call the actual payment function
      // For now, we'll simulate a payment process
      const timer = setTimeout(() => {
        setShowPaymentLoading(false)
        setShowPaymentSuccess(true)
        setPaymentProcessing(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showPaymentLoading, paymentProcessing])

  function handleBackToHome() {
    setShowPaymentSuccess(false)
    router.push('/home')
  }

  const displayName = activeAccount?.address
    ? `${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(-4)}`
    : 'User'

  // Calculate fees
  const amountWei = extractedData?.amount
    ? parseUnits(extractedData.amount.toString(), 18)
    : BigInt(0)
  const platformFee = calculatePlatformFee(amountWei, platformFeeBps)
  const merchantAmount = calculateMerchantAmount(amountWei, platformFeeBps)

  if (!isConnected) {
    return null
  }

  // Show payment confirmation screen
  if (showPaymentConfirmation && extractedData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <PaymentConfirmationLayout
          merchantAddress={extractedData.address}
          amount={extractedData.amount?.toString()}
          platformFee={formatUnits(platformFee, 18)}
          merchantAmount={formatUnits(merchantAmount, 18)}
          onBack={handleBack}
          onPay={handleConfirmPayment}
          loading={paymentProcessing}
        />
      </div>
    )
  }

  // Show payment loading screen
  if (showPaymentLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <PaymentLoadingLayout
          amount={extractedData?.amount?.toString()}
          merchantName={extractedData?.address ? `${extractedData.address.slice(0, 6)}...` : undefined}
        />
      </div>
    )
  }

  // Show payment success screen
  if (showPaymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <PaymentSuccessLayout
          onBackToHome={handleBackToHome}
          userName={displayName}
          merchantName={extractedData?.address ? `${extractedData.address.slice(0, 6)}...` : 'Merchant'}
          amount={extractedData?.amount?.toString()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <QRScanLayout
        onBack={handleBack}
        onScanSuccess={handleScanSuccess}
        onPaymentInitiate={handlePaymentInitiate}
      />
    </div>
  )
}

