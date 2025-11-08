'use client'

export interface PaymentLoadingProps {
  onPay?: () => void
  amount?: string
  merchantName?: string
}

const imgLoadingCharacter = 'https://www.figma.com/api/mcp/asset/861f9faf-527a-4443-a0ff-2bba43adb0e8'

export function PaymentLoading({ onPay, amount, merchantName }: PaymentLoadingProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* Loading Content - Centered */}
      <div className="absolute box-border flex flex-col gap-[11px] items-center left-1/2 p-0 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full max-w-[430px] px-4">
        {/* Character Image */}
        <div className="h-[294px] relative shrink-0 w-full">
          <img
            alt="Loading"
            className="absolute inset-0 max-w-none object-cover object-center pointer-events-none size-full"
            src={imgLoadingCharacter}
          />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col font-black justify-center leading-[100%] relative shrink-0 text-[64px] text-black text-center tracking-[-1.28px] w-full">
          <p className="leading-normal whitespace-pre-wrap">Memuat...</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentLoading
