'use client'

import { QRScanHeader } from '@/components/qr/QRScanHeader'
import { AuthButton } from '@/components/auth/AuthButton'

export interface PaymentSuccessProps {
  userName?: string
  merchantName?: string
  amount?: string | number
  onBackToHome?: () => void
}

const imgSuccessCharacter = 'https://www.figma.com/api/mcp/asset/8918c4d8-df1c-4422-adb7-565062f1e216'

export function PaymentSuccess({
  userName = 'User',
  merchantName = 'Merchant',
  amount = '10',
  onBackToHome,
}: PaymentSuccessProps) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <QRScanHeader title="Pembayaran Berhasil" />

      {/* Content Area */}
      <div className="absolute top-[113px] bottom-[181px] left-0 right-0 overflow-y-auto">
        <div className="flex flex-col gap-4 items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[430px] absolute">
          {/* Success Character Image */}
          <div className="h-[399px] relative shrink-0 w-[430px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt="Success"
                className="absolute h-[108.62%] left-0 max-w-none top-0 w-full"
                src={imgSuccessCharacter}
              />
            </div>
          </div>

          {/* Success Text */}
          <div className="flex flex-col font-black justify-center leading-[normal] min-w-full not-italic relative shrink-0 text-[32px] text-black text-center tracking-[-0.64px] w-[min-content] whitespace-pre-wrap">
            <p className="mb-0">{userName} </p>
            <p className="mb-0">Berhasil Bayar {amount} Koin ke</p>
            <p>{merchantName}</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bg-white border border-[#afafaf] border-solid bottom-0 box-border flex items-center justify-between left-1/2 pb-[50px] pt-6 px-6 translate-x-[-50%] w-full max-w-[430px]">
        <AuthButton
          type="button"
          onClick={onBackToHome}
          className="w-full max-w-[398px]"
        >
          Balik ke home
        </AuthButton>
      </div>
    </div>
  )
}

export default PaymentSuccess

