'use client'

import { Copy, ExternalLink, X } from 'lucide-react'
import { AuthButton } from '@/components/auth/AuthButton'

interface Transaction {
  tokenId: number
  merchant: string
  amount: string
  timestamp: number
  buyer: string
}

interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  if (!isOpen || !transaction) return null

  const formatAddress = (address: string) => {
    if (!address) return 'xxxxx'
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return address
  }

  const formatFullAddress = (address: string) => {
    return address
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const openBlockExplorer = (address: string) => {
    window.open(`https://sepolia-blockscout.lisk.com/address/${address}`, '_blank')
  }

  const formatDate = (timestamp: number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount)
    if (isNaN(num)) return amount
    return num.toLocaleString('id-ID', { maximumFractionDigits: 0 })
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[398px] bg-white rounded-[13px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1899d6] px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col font-bold justify-center leading-[100%] text-lg text-white tracking-[-0.36px]">
            <p className="leading-normal">Detail Transaksi</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#ddf4ff] transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Receipt NFT ID */}
          <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
            <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center justify-between">
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                <p className="leading-normal">Receipt NFT ID</p>
              </div>
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
                <p className="leading-normal">#{transaction.tokenId}</p>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
            <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center justify-between">
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                <p className="leading-normal">Jumlah</p>
              </div>
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
                <p className="leading-normal">IDR {formatAmount(transaction.amount)}</p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="bg-[#1899d6] h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
            <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 flex items-center justify-between">
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                <p className="leading-normal">Tanggal</p>
              </div>
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
                <p className="leading-normal">{formatDate(transaction.timestamp)}</p>
              </div>
            </div>
          </div>

          {/* Merchant Address */}
          <div className="bg-[#1899d6] min-h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
            <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 py-3 flex flex-col gap-2">
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                <p className="leading-normal">Merchant Address</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col font-bold justify-center leading-[100%] text-sm text-white tracking-[-0.28px] flex-1 min-w-0">
                  <p className="leading-normal truncate font-mono">
                    {formatFullAddress(transaction.merchant)}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(transaction.merchant)}
                  className="text-white hover:text-[#ddf4ff] transition-colors shrink-0"
                  aria-label="Copy merchant address"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openBlockExplorer(transaction.merchant)}
                  className="text-white hover:text-[#ddf4ff] transition-colors shrink-0"
                  aria-label="Open in block explorer"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Buyer Address */}
          <div className="bg-[#1899d6] min-h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
            <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 px-4 py-3 flex flex-col gap-2">
              <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px]">
                <p className="leading-normal">Buyer Address</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col font-bold justify-center leading-[100%] text-sm text-white tracking-[-0.28px] flex-1 min-w-0">
                  <p className="leading-normal truncate font-mono">
                    {formatFullAddress(transaction.buyer)}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(transaction.buyer)}
                  className="text-white hover:text-[#ddf4ff] transition-colors shrink-0"
                  aria-label="Copy buyer address"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openBlockExplorer(transaction.buyer)}
                  className="text-white hover:text-[#ddf4ff] transition-colors shrink-0"
                  aria-label="Open in block explorer"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4">
          <AuthButton onClick={onClose} className="w-full">
            Tutup
          </AuthButton>
        </div>
      </div>
    </div>
  )
}

