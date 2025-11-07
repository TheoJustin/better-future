'use client'

const imgLayer4 = 'https://www.figma.com/api/mcp/asset/e8c033f4-a811-473d-9b23-406c30523e55'
const imgPath = 'https://www.figma.com/api/mcp/asset/95c5a929-ddf2-486d-9c85-ac3b7fd73a02'
const imgPathCopy = 'https://www.figma.com/api/mcp/asset/1501333e-d73e-4ff8-b7ad-2e13d9ce2bee'
const imgPathCopy2 = 'https://www.figma.com/api/mcp/asset/064693a0-ad02-4e5a-8b69-d5a33ddce5fd'

export function QRISLogo() {
  return (
    <div className="flex flex-col gap-2.5 items-start overflow-hidden relative shrink-0 w-[90.731px]">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid justify-items-start leading-[0] relative shrink-0">
        <div className="col-[1] h-[23.996px] ml-0 mt-0 relative row-[1] w-[90.73px]">
          <img alt="QRIS" className="block max-w-none size-full" src={imgLayer4} />
        </div>
      </div>
    </div>
  )
}

export function QRScannerFrame() {
  return (
    <div className="relative shrink-0 size-[328px]">
      {/* White background frame */}
      <div className="bg-white absolute inset-0 size-full" />

      {/* Corner indicators */}
      <div className="absolute inset-0 flex flex-col justify-between p-0">
        {/* Top corners */}
        <div className="flex items-center justify-between w-full">
          <div className="relative shrink-0 size-6">
            <div className="absolute inset-[-8.33%]">
              <img alt="Corner" className="block max-w-none size-full" src={imgPath} />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180 scale-y-[-100%]">
              <div className="relative size-6">
                <div className="absolute inset-[-8.33%]">
                  <img alt="Corner" className="block max-w-none size-full" src={imgPathCopy} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom corners */}
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none scale-y-[-100%]">
              <div className="relative size-6">
                <div className="absolute inset-[-8.33%]">
                  <img alt="Corner" className="block max-w-none size-full" src={imgPath} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-6">
                <div className="absolute inset-[-8.33%]">
                  <img alt="Corner" className="block max-w-none size-full" src={imgPathCopy2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanning lines overlay */}
      <div className="absolute top-[99.5px] left-0 grid-cols-[max-content] grid-rows-[max-content] inline-grid justify-items-start">
        <div className="col-[1] flex h-[113px] items-center justify-center ml-0 mt-0 relative row-[1] w-[328px]">
          <div className="flex-none rotate-180">
            <div className="bg-gradient-to-b from-[rgba(0,153,247,0)] h-[113px] opacity-[0.286] to-[#005feb] w-[328px]" />
          </div>
        </div>
        <div className="col-[1] flex h-[113px] items-center justify-center ml-0 mt-2 relative row-[1] w-[328px]">
          <div className="flex-none rotate-180">
            <div className="bg-gradient-to-b from-[rgba(0,153,247,0)] h-[113px] opacity-[0.286] to-[#005feb] w-[328px]" />
          </div>
        </div>
        <div className="col-[1] flex h-[113px] items-center justify-center ml-0 mt-4 relative row-[1] w-[328px]">
          <div className="flex-none rotate-180">
            <div className="bg-gradient-to-b from-[rgba(0,153,247,0)] h-[113px] opacity-[0.167] to-[#005feb] w-[328px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

