'use client'

interface HomeHeaderProps {
  appName?: string
  onMenuClick?: () => void
}

export function HomeHeader({ appName = 'BetterFuture', onMenuClick }: HomeHeaderProps) {

  return (
    <div className="absolute border-b-2 border-[#d9d9d9] box-border flex gap-6 items-center justify-center px-4 py-[11px] right-0 top-[59px] w-full max-w-[430px]">
      <button
        onClick={onMenuClick}
        className="box-border flex flex-col gap-2 items-start overflow-hidden px-1.5 py-[13px] relative rounded-full shrink-0 cursor-pointer hover:bg-muted/20 transition-colors"
        aria-label="Menu"
      >
        <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
        <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
        <div className="h-[3px] relative shrink-0 w-4 bg-[#4b4b4b]" />
      </button>

      <div className="flex flex-1 flex-col font-bold justify-center leading-[100%] min-h-px min-w-px relative shrink-0 text-[22px] text-[#4b4b4b] text-center tracking-[-0.44px]">
        <p className="leading-normal whitespace-pre-wrap">{appName}</p>
      </div>

      <div className="bg-[#1cb0f6] box-border flex flex-col gap-2 items-start overflow-hidden px-1.5 py-[13px] relative rounded-full shrink-0">
        <div className="h-[3px] relative shrink-0 w-4 bg-white" />
        <div className="h-[3px] relative shrink-0 w-4 bg-white" />
        <div className="h-[3px] relative shrink-0 w-4 bg-white" />
      </div>
    </div>
  )
}

