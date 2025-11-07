'use client'

import { QRScannerFrame, QRISLogo } from './QRScannerFrame'

export function QRScannerArea() {
  return (
    <div className="absolute bg-[#4b4b4b] box-border cursor-pointer flex flex-col gap-3 h-[730px] items-center justify-center left-1/2 p-2.5 top-[calc(50%+12px)] translate-x-[-50%] translate-y-[-50%] w-full max-w-[430px]">
      <div className="flex flex-col font-black justify-center leading-normal relative shrink-0 text-[36px] text-white tracking-[-0.72px] whitespace-nowrap mb-2">
        <p className="mb-0">Arahkan ke Kode Qris</p>
      </div>

      <div className="relative shrink-0">
        <QRScannerFrame />
      </div>

      <div className="mt-2">
        <QRISLogo />
      </div>
    </div>
  )
}

