'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react'
import { useContract } from '@/hooks/useContract'
import { depositIDR } from '@/lib/contract'
import { AuthButton } from '@/components/auth/AuthButton'

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function DepositModal({ isOpen, onClose, onSuccess }: DepositModalProps) {
  const { client, account } = useContract()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeposit = async () => {
    if (!client || !account || !amount) return

    setLoading(true)
    setError(null)

    try {
      // Convert IDR amount to ETH (assuming 1 ETH = 1000 IDR)
      const ethAmount = (parseFloat(amount) / 1000).toString()

      await depositIDR(client, account, ethAmount)

      setSuccess(true)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Deposit failed')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setAmount('')
    setSuccess(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[398px] bg-white rounded-[13px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1899d6] px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col font-bold justify-center leading-[100%] text-lg text-white tracking-[-0.36px]">
            <p className="leading-normal">Masukan Koin</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-[#ddf4ff] transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {!success ? (
            <>
              {/* Exchange Rate Info */}
              <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
                <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center justify-between">
                  <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                    <p className="leading-normal">Exchange Rate</p>
                  </div>
                  <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
                    <p className="leading-normal">1 ETH = 1000 IDR</p>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="flex flex-col font-bold justify-center leading-[100%] text-base text-black tracking-[-0.32px]"
                >
                  Jumlah (IDR)
                </label>
                <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
                  <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center">
                    <input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="100.00"
                      className="w-full bg-transparent text-white font-bold text-base border-none focus:outline-none placeholder:text-white/50"
                    />
                  </div>
                </div>
              </div>

              {/* ETH Required & IDR Received */}
              <div className="space-y-2">
                <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
                  <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center justify-between">
                    <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                      <p className="leading-normal">ETH Required</p>
                    </div>
                    <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
                      <p className="leading-normal">
                        {amount ? (parseFloat(amount) / 1000).toFixed(4) : '0'} ETH
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
                  <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center justify-between">
                    <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                      <p className="leading-normal">IDR Received</p>
                    </div>
                    <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
                      <p className="leading-normal">{amount || '0'} IDR</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-[13px] p-3 flex gap-2 items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-bold flex-1">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <AuthButton
                  onClick={handleClose}
                  variant="secondary"
                  className="flex-1"
                  disabled={loading}
                >
                  Batal
                </AuthButton>
                <AuthButton
                  onClick={handleDeposit}
                  disabled={!amount || loading || !client}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Memproses...
                    </>
                  ) : (
                    'Deposit ETH'
                  )}
                </AuthButton>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <div className="space-y-2">
                <p className="font-bold text-lg text-black">Deposit Berhasil!</p>
                <p className="text-sm text-muted-foreground">
                  Berhasil deposit {amount ? (parseFloat(amount) / 1000).toFixed(4) : '0'} ETH
                  untuk {amount} IDR!
                </p>
              </div>
              <AuthButton onClick={handleClose} className="w-full mt-4">
                Tutup
              </AuthButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

