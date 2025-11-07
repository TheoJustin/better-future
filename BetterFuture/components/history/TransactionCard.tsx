'use client'

interface TransactionCardProps {
  amount: string
  from: string
  to: string
  date: string
  nftId: string | number
  onClick?: () => void
}

const imgVector39 = 'https://www.figma.com/api/mcp/asset/317ba1fe-68ac-49d8-9eca-543e9f242ec5'

export function TransactionCard({
  amount,
  from,
  to,
  date,
  nftId,
  onClick,
}: TransactionCardProps) {
  return (
    <div
      className="bg-[#1899d6] h-[91px] overflow-hidden relative rounded-[13px] shrink-0 w-[398px] cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 pr-[60px]">
        {/* Amount */}
        <div className="absolute flex flex-col font-bold justify-center leading-[100%] left-[16px] text-base text-[#ddf4ff] top-[22.5px] tracking-[-0.32px] translate-y-[-50%] uppercase whitespace-nowrap">
          <p className="leading-normal">IDR {amount}</p>
        </div>

        {/* From and To */}
        <div className="absolute flex font-bold gap-6 h-[23px] items-start leading-[100%] left-[16px] text-base text-white top-[35.67px] tracking-[-0.32px] right-[70px] overflow-hidden">
          <div className="flex flex-col justify-center relative shrink-0 w-[140px] overflow-hidden">
            <p className="leading-normal whitespace-nowrap truncate">Dari : {from}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 flex-1 min-w-0 overflow-hidden">
            <p className="leading-normal whitespace-nowrap truncate">Untuk : {to}</p>
          </div>
        </div>

        {/* Date and NFT */}
        <div className="absolute flex font-bold gap-6 h-[23px] items-start leading-[100%] left-[16px] text-base text-white top-[59.33px] tracking-[-0.32px] right-[70px]">
          <div className="flex flex-col justify-center relative shrink-0 w-[140px]">
            <p className="leading-normal whitespace-nowrap">Tanggal : {date || ''}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
            <p className="leading-normal">NFT#{nftId}</p>
          </div>
        </div>

        {/* Icon */}
        <div className="absolute h-[87px] right-0 top-0 w-[60px] flex items-center justify-center">
          <div className="relative h-full w-full">
            <img
              alt=""
              className="block max-w-none size-full object-contain"
              src={imgVector39}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

