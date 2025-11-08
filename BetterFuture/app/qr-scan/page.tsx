'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useActiveAccount } from 'panna-sdk'

import { QRScanLayout } from '@/components/qr/QRScanLayout'
import { PaymentConfirmationLayout } from '@/components/payment/PaymentConfirmationLayout'
import { PaymentLoadingLayout } from '@/components/payment/PaymentLoadingLayout'
import { PaymentSuccessLayout } from '@/components/payment/PaymentSuccessLayout'
import { useContract } from '@/hooks/useContract'
import {
  getIDRBalance,
  approveIDR,
  payMerchant,
  getPlatformFee,
  calculatePlatformFee,
  calculateMerchantAmount,
} from '@/lib/contract'
import { PAYMENT_PROCESSOR_CONTRACT_ADDRESS } from '@/types/contracts'
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
  const { client, account } = useContract()
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [showPaymentLoading, setShowPaymentLoading] = useState(false)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [platformFeeBps, setPlatformFeeBps] = useState<bigint>(BigInt(0))
  const [balance, setBalance] = useState<bigint>(BigInt(0))
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string>('')

  const hasRedirected = useRef(false)

  // Redirect to login if not connected
  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return

    if (!isConnected) {
      hasRedirected.current = true
      // Use window.location.replace to force redirect and prevent back navigation
      window.location.replace('/login')
    }
  }, [isConnected])

  // Load platform fee and balance when component mounts
  useEffect(() => {
    const loadData = async () => {
      if (!client || !account?.address) return

      try {
        const [userBalance, feeBps] = await Promise.all([
          getIDRBalance(client, account.address),
          getPlatformFee(client),
        ])
        setBalance(userBalance)
        setPlatformFeeBps(feeBps)
      } catch (err) {
        console.error('Error loading data:', err)
      }
    }

    loadData()
  }, [client, account])

  function handleBack() {
    if (showPaymentConfirmation) {
      setShowPaymentConfirmation(false)
      setError(null)
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

  async function handleConfirmPayment() {
    if (!client || !account || !extractedData?.address || !extractedData?.amount) {
      setError('Missing payment information')
      return
    }

    setShowPaymentConfirmation(false)
    setShowPaymentLoading(true)
    setPaymentProcessing(true)
    setError(null)

    try {
      const amountWei = parseUnits(extractedData.amount.toString(), 18)

      // Check balance
      if (balance < amountWei) {
        throw new Error('Insufficient IDR balance')
      }

      // Step 1: Approve payment processor to spend IDR
      await approveIDR(client, account, PAYMENT_PROCESSOR_CONTRACT_ADDRESS!, amountWei)

      // Step 2: Create receipt URI
      const receiptURI = JSON.stringify({
        merchant: extractedData.address,
        amount: extractedData.amount.toString(),
        timestamp: Date.now(),
        buyer: account.address,
      })

      // Step 3: Make payment
      const result = await payMerchant(
        client,
        account,
        extractedData.address,
        amountWei,
        receiptURI,
      )

      setTxHash(result.transactionHash || '')
      setShowPaymentLoading(false)
      setShowPaymentSuccess(true)
      setPaymentProcessing(false)

      // Refresh balance after successful payment
      if (client && account?.address) {
        const newBalance = await getIDRBalance(client, account.address)
        setBalance(newBalance)
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment failed')
      setShowPaymentLoading(false)
      setPaymentProcessing(false)
      // Show error and allow user to retry
      setShowPaymentConfirmation(true)
    }
  }

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
        <PaymentConfirmationLayout
          merchantAddress={extractedData.address}
          amount={extractedData.amount?.toString()}
          platformFee={formatUnits(platformFee, 18)}
          merchantAmount={formatUnits(merchantAmount, 18)}
          onBack={handleBack}
          onPay={handleConfirmPayment}
          loading={paymentProcessing}
        />
        {/* Error Display */}
        {error && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-2rem)] px-4 z-50">
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Show payment loading screen
  if (showPaymentLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <QRScanLayout
        onBack={handleBack}
        onScanSuccess={handleScanSuccess}
        onPaymentInitiate={handlePaymentInitiate}
      />
    </div>
  )
}

