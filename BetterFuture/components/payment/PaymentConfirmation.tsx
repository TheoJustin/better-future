'use client'

import { QRScanHeader } from '@/components/qr/QRScanHeader'
import { AuthButton } from '@/components/auth/AuthButton'

export interface PaymentConfirmationProps {
  merchantAddress?: string
  merchantName?: string
  amount?: string | number
  platformFee?: string | number
  merchantAmount?: string | number
  onBack?: () => void
  onPay?: () => void
  loading?: boolean
}

const imgCoinImage = 'https://www.figma.com/api/mcp/asset/354c36b0-9004-423c-9268-34a7a3977bd5'

export function PaymentConfirmation({
  merchantAddress,
  merchantName,
  amount,
  platformFee,
  merchantAmount,
  onBack,
  onPay,
  loading = false,
}: PaymentConfirmationProps) {
  // Convert amount to coin amount (assuming 1 IDR = 1 coin for now, adjust as needed)
  const coinAmount = amount ? Number(amount) : 0
  const displayMerchantName = merchantName || merchantAddress?.slice(0, 10) || '{NAMA MERCHANT}'

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <QRScanHeader title="Pembayaran QRIS" onBack={onBack} />

      {/* Content Area */}
      <div className="absolute top-[113px] bottom-[181px] left-0 right-0 overflow-y-auto px-4 pt-6 pb-4">
        <div className="flex flex-col gap-6 items-center justify-center min-h-full">
          {/* Merchant Name Button */}
          <div className="w-full max-w-[398px] mt-4">
            <div className="bg-[#1899d6] block cursor-pointer h-[66px] overflow-hidden relative rounded-[13px] shrink-0 w-full">
              <div className="absolute bg-[#1cb0f6] box-border flex gap-2 h-[57px] items-center justify-center left-[0.5px] overflow-hidden px-4 py-3 right-[0.5px] rounded-[13px] top-1/2 -translate-y-1/2 w-[calc(100%-1px)]">
                <div className="flex flex-col justify-center leading-[100%] relative shrink-0 text-base text-white text-center tracking-[-0.32px] uppercase whitespace-nowrap font-bold">
                  {displayMerchantName}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Amount Section */}
          <div className="flex flex-col gap-3 items-center justify-center w-full flex-1">
            {/* Title */}
            <div className="flex flex-col font-black justify-center leading-[100%] relative shrink-0 text-[36px] text-black tracking-[-0.72px] text-center">
              <p className="leading-normal">Jumlah yang harus dibayar</p>
            </div>

            {/* Coin Image */}
            <div className="h-[242px] relative shrink-0 w-[354px]">
              <img
                alt="Coin"
                className="absolute inset-0 max-w-none object-cover object-center pointer-events-none size-full"
                src={imgCoinImage}
              />
            </div>

            {/* Coin Amount */}
            <div className="flex flex-col font-black justify-center leading-[100%] relative shrink-0 text-[64px] text-black tracking-[-1.28px] whitespace-nowrap">
              <p className="leading-normal">{coinAmount} Koin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bg-white border border-[#afafaf] border-solid bottom-0 box-border flex items-center justify-between left-1/2 pb-[50px] pt-6 px-6 translate-x-[-50%] w-full">
        <AuthButton
          type="button"
          onClick={onPay}
          disabled={loading || !amount || !merchantAddress}
          className="w-full max-w-[398px]"
        >
          {loading ? 'Memproses...' : 'Bayar'}
        </AuthButton>
      </div>
    </div>
  )
}

