'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

interface HomeHeaderProps {
  appName?: string
}

export function HomeHeader({ appName = 'BetterFuture' }: HomeHeaderProps) {
  const router = useRouter()

  function handleDisconnect() {
    if (typeof window === 'undefined') return

    // Clear all localStorage from current origin
    localStorage.clear()

    // Clear all sessionStorage from current origin
    sessionStorage.clear()

    // Try to clear localStorage from embedded wallet iframe (thirdweb)
    try {
      // Find all iframes that might be from thirdweb/embedded wallet
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        try {
          // Try to access iframe's localStorage if same-origin or accessible
          if (iframe.contentWindow) {
            const iframeOrigin = new URL(iframe.src).origin
            // If iframe is from thirdweb domain, try to clear
            if (
              iframeOrigin.includes('thirdweb.com') ||
              iframeOrigin.includes('embedded-wallet')
            ) {
              // Post message to iframe to clear storage
              iframe.contentWindow.postMessage(
                { type: 'clearStorage', action: 'clear' },
                iframeOrigin
              )
            }
          }
        } catch (e) {
          // Cross-origin iframe, cannot access directly
          // This is expected for thirdweb embedded wallet
        }
      })

      // Also try to clear by accessing thirdweb's storage directly via postMessage
      // This might work if thirdweb listens to these messages
      window.postMessage(
        {
          type: 'clearStorage',
          action: 'clear',
          source: 'better-future-logout'
        },
        '*'
      )
    } catch (error) {
      console.error('Error clearing embedded wallet storage:', error)
    }

    // Clear IndexedDB if possible (thirdweb might use it)
    try {
      if ('indexedDB' in window) {
        indexedDB.databases().then((databases) => {
          databases.forEach((db) => {
            if (db.name) {
              indexedDB.deleteDatabase(db.name)
            }
          })
        })
      }
    } catch (error) {
      console.error('Error clearing IndexedDB:', error)
    }

    // Force redirect to login page with full page reload
    // This ensures all state is cleared and user can only access login page
    window.location.replace('/login')
  }

  return (
    <div className="absolute border-b-2 border-[#d9d9d9] box-border flex gap-6 items-center justify-center px-4 py-[11px] right-0 top-[59px] w-full">
      {/* Empty space on left for balance */}
      <div className="w-[19.5px]" />

      <div className="flex flex-1 flex-col font-bold justify-center leading-[100%] min-h-px min-w-px relative shrink-0 text-[22px] text-[#4b4b4b] text-center tracking-[-0.44px]">
        <p className="leading-normal whitespace-pre-wrap">{appName}</p>
      </div>

      {/* Disconnect Wallet Button */}
      <button
        onClick={handleDisconnect}
        className="bg-[#1cb0f6] box-border flex items-center justify-center px-3 py-2 rounded-full shrink-0 cursor-pointer hover:bg-[#1899d6] transition-colors"
        aria-label="Disconnect Wallet"
      >
        <LogOut className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}

